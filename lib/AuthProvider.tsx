"use client";

import React, { useContext, useState, ReactNode, createContext } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  
  const value = {};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

