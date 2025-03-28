"use client";

import { useToast } from "@/components/ui/toast-context";
import { loginUser } from "@/lib/api/postMethods";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/lib/AuthProvider";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setSuccessMsg, setErrorMsg, setInfoMsg } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    setInfoMsg("");

    try {
      if (email == "") {
        setErrorMsg("Give us Your email address.");
      } else if (password == "") {
        setErrorMsg("Put you password");
      } else {
        const response = await loginUser({ email, password });

        if (response.status == "success") {
          setSuccessMsg(response.message);
          await login({
            username: response.data.username,
            token: response.data.token
          });
        }
        if (response.status === "info") {
          setInfoMsg(response.message);
        }
        if (response.status === "error") {
          throw response;
        }
      }
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-gray-700 dark:text-white mb-2"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-6 relative">
        <label
          htmlFor="password"
          className="block text-gray-700 dark:text-white mb-2"
        >
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Enter your password"
          required
        />
        <span
          className="absolute right-3 top-10 flex items-center text-gray-500 dark:text-white cursor-pointer hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FaEyeSlash className="w-5 h-5 mt-2" />
          ) : (
            <FaEye className="w-5 h-5 mt-2" />
          )}
        </span>
      </div>
      {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}

      <div className="text-right mb-6">
        <a
          href="#"
          className="text-sm text-indigo-500 dark:text-white hover:underline transition"
        >
          Forgot your password ?
        </a>
      </div>
      <button
        className="w-full py-3 bg-indigo-600 text-white dark:text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </div>
  );
};

export default LoginForm;
