"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Home() {
  const el = useRef(null);

  // useEffect(() => {
  //   const typed = new Typed(el.current, {
  //     strings: ["<i>Tailwind</i> CSS.", "&amp; React", "Typescript"],
  //     typeSpeed: 50,
  //   });

  //   return () => {
  //     // Destroy Typed instance during cleanup to stop animation
  //     typed.destroy();
  //   };
  // }, []);

  return (
    <main>
      Home
    </main>
  );
}
