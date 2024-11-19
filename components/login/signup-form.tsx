import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signUpUser } from "@/lib/api/postMethods";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedImage) {
      setErrorMessage("Please upload a profile picture.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await signUpUser({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        photo: selectedImage,
      });

      setSuccessMessage(response.message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Sign up failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {errorMessage && (
        <p className="text-red-600 mb-4 text-sm">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-600 mb-4 text-sm">{successMessage}</p>
      )}
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
          onClick={togglePasswordVisibility}
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
          onChange={handleImageChange}
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
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;
