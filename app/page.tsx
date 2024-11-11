"use client";
import { Footer, LampHeader, Mission } from "@/components/index";

export default function Home() {
  return (
    <div className="min-h-[100vh]">
      {/* <GlobeComp /> */}
      <LampHeader />
      <Mission />
      <Footer />
    </div>
  );
}
