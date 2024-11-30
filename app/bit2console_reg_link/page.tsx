"use client";

import { useState, useEffect } from "react";

export default function WelcomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        window.location.replace("https://docs.google.com/forms/d/e/1FAIpQLSduWO4eI9r96Gr2j-d8-cuR0ZmMzdP5NPL4FGPWH_N7LWshpA/viewform?usp=sf_link");
      setLoading(false);
    }, 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
        <p className="text-lg">
          {loading
            ? "Please wait while we prepare everything for you..."
            : "You Will now redirecting to the form.Thank you"}
        </p>
        {loading && (
          <div className="mt-6 mx-auto">
            <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
