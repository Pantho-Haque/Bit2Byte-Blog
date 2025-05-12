'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs';
import { toast } from 'sonner';

export interface EyeTrackingMetrics {
  isLookingAway: boolean;
  lookAwayCount: number;
  lookAwayDuration: number; // in seconds
  lastWarningTime: number;
  currentLookAwayDuration: number; // Current continuous duration in seconds
}

interface EyeTrackingProctorProps {
  isActive: boolean;
  onCheatingDetected: () => void;
  warningThreshold?: number; // number of warnings before disqualification
  lookAwayThreshold?: number; // duration in seconds before considered cheating
  disqualificationThreshold?: number; // continuous duration in seconds before immediate disqualification
  showVideo?: boolean; // whether to show the webcam video
}

const EyeTrackingProctor: React.FC<EyeTrackingProctorProps> = ({
  isActive,
  onCheatingDetected,
  warningThreshold = 3,
  lookAwayThreshold = 2,
  disqualificationThreshold = 5, // Default to 5 seconds for immediate disqualification
  showVideo = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [streamActive, setStreamActive] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [metrics, setMetrics] = useState<EyeTrackingMetrics>({
    isLookingAway: false,
    lookAwayCount: 0,
    lookAwayDuration: 0,
    lastWarningTime: 0,
    currentLookAwayDuration: 0,
  });

  // Store the time when user started looking away
  const lookAwayStartTime = useRef<number | null>(null);
  const framesWithFace = useRef<number>(0);
  const totalFrames = useRef<number>(0);
  const checkingRef = useRef<boolean>(false);
  const disqualifiedRef = useRef<boolean>(false);
  const lastFrameTime = useRef<number>(Date.now());

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        
        setModelsLoaded(true);
        console.log('Face API models loaded for eye tracking');
      } catch (error) {
        console.error('Error loading face-api models:', error);
        toast.error('Failed to load face detection models. Please refresh and try again.');
      }
    };
    
    loadModels();
  }, []);

  // Set up webcam stream
  useEffect(() => {
    if (!isActive || !modelsLoaded) return;
    
    let stream: MediaStream | null = null;
    
    const setupCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 640,
            height: 480,
            facingMode: 'user',
          },
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
          toast.success('Webcam activated for assessment proctoring');
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast.error('Failed to access your webcam. Please check permissions and try again.');
      }
    };
    
    setupCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStreamActive(false);
      }
    };
  }, [isActive, modelsLoaded]);

  // Analyze video for eye tracking
  useEffect(() => {
    if (!streamActive || !isActive) return;
    
    const video = videoRef.current;
    if (!video || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    
    let animationFrameId: number;
    
    const analyzeEyes = async () => {
      if (checkingRef.current || disqualifiedRef.current) return;
      
      if (!video.paused && !video.ended && video.readyState >= 2) {
        checkingRef.current = true;
        totalFrames.current += 1;
        
        try {
          // Face detection with landmarks
          const detections = await faceapi.detectAllFaces(
            video, 
            new faceapi.TinyFaceDetectorOptions()
          ).withFaceLandmarks();
          
          // Update time tracking
          const now = Date.now();
          const frameDeltaTime = (now - lastFrameTime.current) / 1000; // seconds
          lastFrameTime.current = now;
          
          // Process analysis results
          if (detections.length > 0) {
            framesWithFace.current += 1;
            const detection = detections[0]; // Focus on the first face found
            
            // Get eye landmarks
            const landmarks = detection.landmarks;
            const leftEye = landmarks.getLeftEye();
            const rightEye = landmarks.getRightEye();
            
            // Eye direction calculation (simplified)
            const leftEyeWidth = Math.abs(leftEye[3].x - leftEye[0].x);
            const leftEyeHeight = Math.abs(leftEye[4].y - leftEye[1].y);
            const leftEyeRatio = leftEyeHeight / leftEyeWidth;
            
            const rightEyeWidth = Math.abs(rightEye[3].x - rightEye[0].x);
            const rightEyeHeight = Math.abs(rightEye[4].y - rightEye[1].y);
            const rightEyeRatio = rightEyeHeight / rightEyeWidth;
            
            // Average eye ratio
            const avgEyeRatio = (leftEyeRatio + rightEyeRatio) / 2;
            
            // If eyes are too closed or person is looking sideways, consider them looking away
            const isLookingAway = avgEyeRatio < 0.24 || avgEyeRatio > 0.45;
            
            // Handle looking away metrics
            if (isLookingAway && !metrics.isLookingAway) {
              // Just started looking away
              lookAwayStartTime.current = now;
              
              setMetrics(prev => ({
                ...prev,
                isLookingAway: true,
                lookAwayCount: prev.lookAwayCount + 1,
                currentLookAwayDuration: 0,
              }));
            } else if (!isLookingAway && metrics.isLookingAway) {
              // Just stopped looking away
              if (lookAwayStartTime.current) {
                const duration = (now - lookAwayStartTime.current) / 1000; // in seconds
                lookAwayStartTime.current = null;
                
                setMetrics(prev => ({
                  ...prev,
                  isLookingAway: false,
                  lookAwayDuration: prev.lookAwayDuration + duration,
                  currentLookAwayDuration: 0,
                }));
              }
            } else if (isLookingAway && metrics.isLookingAway) {
              // Still looking away, update duration
              const currentDuration = metrics.currentLookAwayDuration + frameDeltaTime;
              
              // Update the current duration
              setMetrics(prev => ({
                ...prev,
                currentLookAwayDuration: currentDuration,
              }));
              
              // Check if duration exceeds disqualification threshold
              if (currentDuration >= disqualificationThreshold) {
                disqualifiedRef.current = true;
                onCheatingDetected();
                toast.error(`Disqualified: Looking away for more than ${disqualificationThreshold} seconds`, {
                  duration: 5000,
                });
              }
              // Issue warning after warning threshold but before disqualification
              else if (currentDuration >= lookAwayThreshold && now - metrics.lastWarningTime > 3000) {
                toast.warning(`Warning: You've been looking away for ${currentDuration.toFixed(1)} seconds. Disqualification at ${disqualificationThreshold} seconds.`, {
                  duration: 3000,
                });
                
                setMetrics(prev => ({
                  ...prev,
                  lastWarningTime: now,
                }));
              }
            }
            
            // Debug visualization (if needed)
            if (showVideo) {
              const resizedDetections = faceapi.resizeResults(detections, displaySize);
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                faceapi.draw.drawDetections(canvas, resizedDetections);
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                
                // Draw eye status text
                ctx.font = '16px Arial';
                ctx.fillStyle = isLookingAway ? 'red' : 'green';
                ctx.fillText(
                  isLookingAway ? `Looking Away! (${metrics.currentLookAwayDuration.toFixed(1)}s / ${disqualificationThreshold}s)` : 'Eyes on Screen', 
                  10, 
                  30
                );
              }
            }
          } else {
            // No face detected
            if (!metrics.isLookingAway) {
              // Just started looking away (no face)
              lookAwayStartTime.current = now;
              
              setMetrics(prev => ({
                ...prev,
                isLookingAway: true,
                lookAwayCount: prev.lookAwayCount + 1,
                currentLookAwayDuration: 0,
              }));
            } else {
              // Still looking away (no face), update duration
              const currentDuration = metrics.currentLookAwayDuration + frameDeltaTime;
              
              // Update the current duration
              setMetrics(prev => ({
                ...prev,
                currentLookAwayDuration: currentDuration,
              }));
              
              // Check if duration exceeds disqualification threshold
              if (currentDuration >= disqualificationThreshold) {
                disqualifiedRef.current = true;
                onCheatingDetected();
                toast.error(`Disqualified: Face not detected for more than ${disqualificationThreshold} seconds`, {
                  duration: 5000,
                });
              }
              // Issue warning after warning threshold but before disqualification
              else if (currentDuration >= lookAwayThreshold && now - metrics.lastWarningTime > 3000) {
                toast.warning(`Warning: Face not detected for ${currentDuration.toFixed(1)} seconds. Disqualification at ${disqualificationThreshold} seconds.`, {
                  duration: 3000,
                });
                
                setMetrics(prev => ({
                  ...prev,
                  lastWarningTime: now,
                }));
              }
            }
            
            // Visual feedback if showing video
            if (showVideo) {
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = '16px Arial';
                ctx.fillStyle = 'red';
                ctx.fillText(`Face not detected! (${metrics.currentLookAwayDuration.toFixed(1)}s / ${disqualificationThreshold}s)`, 10, 30);
              }
            }
          }
        } catch (error) {
          console.error('Error in eye tracking analysis:', error);
        }
        
        checkingRef.current = false;
      }
      
      // Continue analysis loop
      if (!disqualifiedRef.current) {
        animationFrameId = requestAnimationFrame(analyzeEyes);
      }
    };
    
    analyzeEyes();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [streamActive, isActive, metrics, onCheatingDetected, warningThreshold, lookAwayThreshold, showVideo, disqualificationThreshold]);

  return (
    <div className={`relative ${showVideo ? 'block' : 'hidden'}`}>
      <div className="relative overflow-hidden rounded-xl border border-gray-700 shadow-xl">
        <video
          ref={videoRef}
          width="320"
          height="240"
          autoPlay
          muted
          playsInline
          className="rounded-xl"
        />
        <canvas 
          ref={canvasRef} 
          width="320" 
          height="240" 
          className="absolute top-0 left-0 rounded-xl"
        />
        
        {/* Status indicators and overlays */}
        {!streamActive && isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm text-white rounded-xl">
            <div className="flex flex-col items-center">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mb-3"></div>
              <span className="text-sm font-medium">Initializing webcam...</span>
            </div>
          </div>
        )}
        
        {showVideo && (
          <>
            {/* Visual metrics display */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg p-2 text-xs text-white">
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${metrics.isLookingAway ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                  {metrics.isLookingAway ? 'Looking Away' : 'Focused'}
                </span>
              </div>
              
              {metrics.isLookingAway && (
                <div className="mt-1.5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-400 text-[10px]">Time:</span>
                    <span className="text-gray-300">{metrics.currentLookAwayDuration.toFixed(1)}s / {disqualificationThreshold}s</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-red-500 h-1 rounded-full transition-all duration-100"
                      style={{ width: `${Math.min(100, (metrics.currentLookAwayDuration / disqualificationThreshold) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Status indicator in top-right */}
            <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
              <div className={`w-2 h-2 rounded-full ${metrics.isLookingAway ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-[10px] font-medium text-white">
                {metrics.isLookingAway ? 'AWAY' : 'ACTIVE'}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EyeTrackingProctor;