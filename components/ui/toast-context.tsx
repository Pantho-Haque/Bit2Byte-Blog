"use client";

import React, { useEffect, useState } from "react";
import { Toaster } from "./toaster";
import { MdOutlineWarning } from "react-icons/md";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";

type Toast = {
  id: number;
  content: React.ReactNode;
  type: "info" | "success" | "error";
  duration?: number; // Optional timeout duration in milliseconds
};

const ToastContext = React.createContext({
  addToast: (toast: Omit<Toast, "id">) => {},
  removeToast: (id: number) => {},
  setSuccessMsg: (msg: string) => {},
  setErrorMsg: (msg: string) => {},
  setInfoMsg: (msg: string) => {},
});

export const useToast = () => React.useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);


  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [infoMsg, setInfoMsg] = useState<string>("");

  useEffect(() => {
    if (successMsg != "") {
      addToast({
        content: (
          <div className="flex items-center justify-start mr-5">
            <IoCheckmarkCircleSharp />
            <h4 className="font-bold ml-2">{successMsg}</h4>
          </div>
        ),
        type: "success",
        duration: 5000,
      });
    }
  }, [successMsg]);

  useEffect(() => {
    if (errorMsg != "") {
      addToast({
        content: (
          <div className="flex items-center justify-start mr-5">
            <MdOutlineWarning />
            <h4 className="font-bold ml-2">{errorMsg}</h4>
          </div>
        ),
        type: "error",
        duration: 5000,
      });
    }
  }, [errorMsg]);

  useEffect(() => {
    if (infoMsg != "") {
      addToast({
        content: (
          <div className="flex items-center justify-start mr-5">
            <IoIosInformationCircle />
            <h4 className="font-bold ml-2">{infoMsg}</h4>
          </div>
        ),
        type: "info",
        duration: 5000,
      });
    }
  }, [infoMsg]);


  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);

    if (toast.duration) {
      setTimeout(() => removeToast(id), toast.duration);
    }
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, setSuccessMsg,setErrorMsg,setInfoMsg }}>
      {children}
      <Toaster toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}
