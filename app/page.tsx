"use client";
import { Footer, LampHeader, Mission,NavBar } from "@/components/index";

export default function Home() {
  return (
    <div className="">
      {/* <GlobeComp /> */}
      <NavBar/>
      <LampHeader />
      <Mission />
    </div>
  );
}
