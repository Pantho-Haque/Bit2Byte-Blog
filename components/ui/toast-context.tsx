"use client";

import * as React from "react";
import { Toaster } from "./toaster";

type Toast = {
  id: number;
  content: React.ReactNode;
  type: "info" | "success" | "error";
  duration?: number; // Optional timeout duration in milliseconds
};

const ToastContext = React.createContext({
  addToast: (toast: Omit<Toast, "id">) => {},
  removeToast: (id: number) => {},
});

export const useToast = () => React.useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

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
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <Toaster toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}
