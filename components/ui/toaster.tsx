"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Toast = {
  id: number;
  content: React.ReactNode;
  type: "info" | "success" | "error";
};

export const Toaster = ({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: number) => void;
}) => {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`relative px-4 py-2 rounded-lg shadow-md flex items-center gap-4 ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            <div
            className="pr-3"
            >{toast.content}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute top-2 right-2 text-white/80 hover:text-white"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
