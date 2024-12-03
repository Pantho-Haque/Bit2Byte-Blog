"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    desc: string;
    title: string;
    icon: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      {/* large screen */}
      <ul
        ref={scrollerRef}
        className={cn(
          "hidden lg:flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <EachCard item={item} key={idx} />
        ))}
      </ul>

      {/* small screen */}
      <ul
        className={cn(
          "flex flex-col lg:hidden w-full shrink-0 gap-4 py-4  flex-nowrap"
        )}
      >
        {items.map((item, idx) => (
          <EachCard item={item} key={idx} />
        ))}
      </ul>
    </div>
  );
};

const EachCard = ({
  item,
}: {
  item: {
    desc: string;
    title: string;
    icon: string;
  };
}) => (
  <li
    className="w-full lg:w-[350px] max-w-full rounded-2xl border  flex-shrink-0 border-slate-700 px-8 py-6"
    style={{
      background: "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
    }}
  >
    <blockquote className="flex flex-col justify-between  h-full">
      <div
        aria-hidden="true"
        className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
      ></div>
      <div className="flex flex-row justify-center gap-5">
        <div className="text-xl lg:text-xl text-center font-semibold leading-[1.6]">
          {item.title}
        </div>
        <Image
          src={item.icon}
          alt="Custom Icon"
          width={36} // Adjust width as desired
          height={36} // Adjust height as desired
        />
      </div>
      <div className=" mt-6 flex flex-row items-center">
        <span className="w-[70%]  lg:w-[100%] mx-auto text-sm leading-[1.6] text-center lg:text-justify font-normal">
          {item.desc}
        </span>
      </div>
    </blockquote>
  </li>
);
