"use client";

import {
  Banner,
  LoginForm,
  RegisterForm,
  TabButtonGroup,
} from "@/components/index"; 
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = (signUp: boolean) => {
    setIsSignUp(signUp);
  };

  return (
    <div className="relative w-[98%] h-[82vh]  mx-auto flex flex-col justify-center items-center p-6 lg:p-8 shadow-lg bg-cover md:bg-contain bg-center"
    style={{
      backgroundImage: `url('/images/loginpage.svg')`
    }}
    
    >
      {/* Background Image */}

      {/* <div className="w-full h-full absolute">
        <Image
          src="/images/loginpage.svg"
          alt="login background"
          fill
          className="object-cover   -z-30 "
          priority
        />
      </div> */}

      {/* Tab Button Group */}
      <TabButtonGroup isSignUp={isSignUp} handleToggle={handleToggle} />

      {/* Form Container */}
      <motion.div
        className="w-full max-w-md p-6 lg:p-8 rounded-lg border-t-4 border-slate-600 shadow-xl flex flex-col items-start bg-white/80 dark:bg-gray-800/80 backdrop-blur-md"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white w-full">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {/* Forms */}
        <AnimatePresence mode="popLayout">
          {isSignUp ? (
            <RegisterForm key="signUp" />
          ) : (
            <LoginForm key="signIn" />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;
