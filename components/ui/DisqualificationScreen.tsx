'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Shield, Info } from 'lucide-react';

const DisqualificationScreen: React.FC<{ examId?: string }> = ({ examId }) => {
  const router = useRouter();
  const [disqualificationReason, setDisqualificationReason] = useState<string>("Academic integrity violation");

  useEffect(() => {
    // Get the reason for disqualification from localStorage if available
    if (examId) {
      const storedReason = localStorage.getItem(`exam_disqualification_reason_${examId}`);
      if (storedReason) {
        setDisqualificationReason(storedReason);
      }
    } else {
      // Try to get the reason from any assessmentId
      const keys = Object.keys(localStorage);
      const reasonKey = keys.find(key => key.startsWith('exam_disqualification_reason_'));
      if (reasonKey) {
        const storedReason = localStorage.getItem(reasonKey);
        if (storedReason) {
          setDisqualificationReason(storedReason);
        }
      }
    }
  }, [examId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md"></div>
          <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mt-4 text-center">Exam Terminated</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full mt-3"></div>
      </div>
      
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="flex items-center mb-3">
          <Shield className="text-red-400 mr-2" />
          <h3 className="text-md font-semibold text-white">Security Violation Detected</h3>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          {disqualificationReason === "Tab switching detected" ? (
            "You switched to another browser tab during the exam. Tab switching is not allowed during exams as it violates the integrity policy."
          ) : disqualificationReason === "Screenshot attempt detected" ? (
            "You attempted to take a screenshot during the exam. Screenshots are not allowed as they can be used to share exam content."
          ) : disqualificationReason.includes("Looking away") || disqualificationReason.includes("Face not detected") ? (
            "Our proctoring system detected that you were looking away from the screen or your face was not visible for more than 5 seconds, which violates the exam integrity policy."
          ) : (
            "Our proctoring system detected a potential violation of the exam integrity policy. This could include looking away from the screen, having your face not visible, or using external resources."
          )}
        </p>
      </div>
      
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="flex items-center mb-3">
          <Info className="text-blue-400 mr-2" />
          <h3 className="text-md font-semibold text-white">Policy Information</h3>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          To ensure fairness and academic integrity, our system monitors for the following:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
          <li className="flex items-center bg-gray-700/50 rounded-lg p-2.5">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            Tab switching
          </li>
          <li className="flex items-center bg-gray-700/50 rounded-lg p-2.5">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            Screenshot attempts
          </li>
          <li className="flex items-center bg-gray-700/50 rounded-lg p-2.5">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            Looking away from screen
          </li>
          <li className="flex items-center bg-gray-700/50 rounded-lg p-2.5">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            Face not visible
          </li>
          <li className="flex items-center bg-gray-700/50 rounded-lg p-2.5">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            Multiple people detected
          </li>
          <li className="flex items-center bg-gray-700/50 rounded-lg p-2.5">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            External resources used
          </li>
        </ul>
      </div>
      
      <button
        onClick={() => router.push('/dashboard/exams')}
        className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/20"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Return to Exams</span>
      </button>
    </motion.div>
  );
};

export default DisqualificationScreen;