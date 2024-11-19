"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Banner from "@/components/login/banner";
import TabButtonGroup from "@/components/login/tab-button-group";

import LoginForm from "@/components/login/login-form";
import RegisterForm from "@/components/login/signup-form";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = (signUp: boolean) => {
    setIsSignUp(signUp);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Banner */}
      <div className="lg:w-1/2 bg-white dark:bg-slate-700 hidden lg:flex items-center justify-center">
        <Banner />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-8 bg-white dark:bg-slate-700 shadow-lg">
        {/* Tab Button Group */}
        <TabButtonGroup isSignUp={isSignUp} handleToggle={handleToggle} />

        {/* Animated Form Container */}
        <motion.div
          className="w-full max-w-md p-6 lg:p-8 rounded-lg border-t-4 border-indigo-600 shadow-lg flex flex-col items-start"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white w-full">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>

          {/* Animate Presence for Form Switching */}
          <AnimatePresence mode="wait">
            {isSignUp ? (
              <RegisterForm key="signUp" />
            ) : (
              <LoginForm key="signIn" />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
