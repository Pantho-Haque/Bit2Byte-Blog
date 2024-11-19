"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import Banner from "@/components/login/banner";
import TabButtonGroup from "@/components/login/tab-button-group";

import LoginForm from "@/components/login/login-form";
import RegisterForm from "@/components/login/signup-form";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggle = (signUp: boolean) => {
    setIsSignUp(signUp);
  };

  return (
    <div className="flex min-h-screen">
      <Banner />
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white dark:bg-slate-700 shadow-lg">
        <TabButtonGroup isSignUp={isSignUp} handleToggle={handleToggle} />
        <motion.div
          className="max-w-md w-full p-8 rounded-lg border-t-4 border-indigo-600 shadow-lg flex flex-col items-start"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white w-full">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
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
