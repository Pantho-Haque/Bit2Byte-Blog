"use client";

import React, { useState,useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signUpUser } from "@/lib/api/index";
import { useToast } from "@/components/ui/toast-context";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);


  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { addToast } = useToast();

  useEffect(() => {
    if (successMsg != "") {
      addToast({
        content: (
          <div>
            <h4 className="font-bold">{successMsg}</h4>
          </div>
        ),
        type: "success",
        duration: 3000,
      });
    }
  }, [successMsg]);

  useEffect(() => {
    if (errorMsg != "") {
      addToast({
        content: (
          <div>
            <h4 className="font-bold">{errorMsg}</h4>
          </div>
        ),
        type: "error",
        duration: 3000,
      });
    }
  }, [errorMsg]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent ) => {
    event.preventDefault();

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (!selectedImage) {
        setErrorMsg("Please upload a profile picture.");
      }else if (formData.email =="") {
        setErrorMsg("Give us your email address");
      }else if (formData.name =="") {
        setErrorMsg("Give us your name");
      }else if (formData.password =="") {
        setErrorMsg("Aet a password for your email");
      }else if (formData.password.length < 6) {
        setErrorMsg("Password must be at least 6 characters.");
      
      }else{
        const response = await signUpUser({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          photo: selectedImage,
        });
  
        setSuccessMsg(response.message);
      }
      
    } catch (error:any) {
      console.log(error);
      setErrorMsg( error.message  );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full" >
      {/* {errorMsg && (
        <p className="text-red-600 mb-4 text-sm">{errorMsg}</p>
      )}
      {successMsg && (
        <p className="text-green-600 mb-4 text-sm">{successMsg}</p>
      )} */}

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block dark:text-white text-gray-700 mb-2"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block dark:text-white text-gray-700 mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Enter your full name"
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
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Enter your password"
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
      <div className="mb-6">
        <label
          htmlFor="uploadImage"
          className="block dark:text-white text-gray-700 mb-2"
        >
          Upload Profile Picture
        </label>
        <input
          type="file"
          id="uploadImage"
          accept="image/*"
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={(event)=>{
            if (event.target.files && event.target.files[0]) {
              setSelectedImage(event.target.files[0]);
            }
          }}
        />
        {selectedImage && (
          <div className="mt-3">
            <p className="text-sm text-gray-500 dark:text-white">
              Selected Image:
            </p>
            <p className="text-sm font-medium text-gray-700 dark:text-white">
              {selectedImage.name}
            </p>
          </div>
        )}
      </div>
      <button
        className="w-full py-3 bg-indigo-600 text-white dark:text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </div>
  );
};

export default RegisterForm;
