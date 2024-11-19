import React from "react";

interface TabButtonGroupProps {
  isSignUp: boolean;
  handleToggle: (signUp: boolean) => void;
}

const TabButtonGroup: React.FC<TabButtonGroupProps> = ({
  isSignUp,
  handleToggle,
}) => {
  return (
    <div className="flex space-x-4 mb-8">
      <button
        onClick={() => handleToggle(false)}
        className={`px-6 py-2 rounded-t-md font-semibold ${
          !isSignUp
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        } transition`}
      >
        Sign In
      </button>
      <button
        onClick={() => handleToggle(true)}
        className={`px-6 py-2 rounded-t-md font-semibold ${
          isSignUp
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        } transition`}
      >
        Sign Up
      </button>
    </div>
  );
};

export default TabButtonGroup;
