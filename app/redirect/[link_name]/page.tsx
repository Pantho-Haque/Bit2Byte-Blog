"use client";

import { getRedirectName } from "@/lib/api";
import { useEffect, useState } from "react";

export default function WelcomePage({
  params,
}: {
  params: { link_name: string };
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndRedirect = async () => {
      try {
        // Fetch data
        const response = await getRedirectName(params.link_name);
        console.log(response);
        // Delay and redirect
        setTimeout(() => {
          window.location.replace(response.data);
          setLoading(false);
        }, 3000); // 3 seconds delay
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchDataAndRedirect();
  }, [params.link_name]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
        <p className="text-lg">
          {loading
            ? "Please wait while we prepare everything for you..."
            : "You will now redirecting to the form.Thank you"}
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
