"use client";
import Footer from "@/components/Footer";
import GlobeComp from "@/components/GlobeComp";
import Mission from "@/components/Mission";

export default function Home() {
  return (
    <div className="min-h-[100vh]">
      <GlobeComp />
      <Mission />
      <Footer />
    </div>
  );
}
