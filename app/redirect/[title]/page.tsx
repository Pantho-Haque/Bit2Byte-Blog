"use client";

import { getRedirectName } from "@/lib/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function WelcomePage({
  params,
}: {
  params: { title: string };
}) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchDataAndRedirect = async () => {
      try {
        // Fetch data
        const response = await getRedirectName(params.title);

        // Progress animation
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 3.33; // Increase to reach 100 in 3 seconds
          });
        }, 100);

        // Delay and redirect
        setTimeout(() => {
          window.location.replace(response.data.url);
          setLoading(false);
        }, 3000); // 3 seconds delay
      } catch (error: any) {
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchDataAndRedirect();
  }, [params.title]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white/20"
      >
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          Welcome!
        </h1>
        <p className="text-lg font-medium mb-6">
          {loading
            ? "Please wait while we prepare everything for you..."
            : "You are now being redirected. Thank you for your patience!"}
        </p>
        {loading && (
          <div className="mt-6 mx-auto space-y-4">
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-center">
              <div className="w-10 h-10 border-3 border-t-transparent border-white rounded-full animate-spin" />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
