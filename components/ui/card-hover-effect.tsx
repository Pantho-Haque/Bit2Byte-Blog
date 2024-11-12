"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  topicId,
  className,
}: {
  items: {
    title: string;
    description: string;
    id: string;
    link: string;
  }[];
  topicId:string;
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  console.log(items);
  return (
    <div className={cn("flex flex-col md:flex-row flex-wrap gap-2", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full md:w-[45%]"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Link href={`/blog/filteredby?topic=${topicId}&subtopic=${item.id}`}>
            <Card>
              <CardTitle>{item.title}</CardTitle>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-1  bg-transparent border-2   cursor-pointer  relative z-20",
        className
      )}
    >
      {/* <div className="relative z-50 "> */}
      <div className="flex justify-center ">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("dark:text-zinc-100 font-bold tracking-wide", className)}>
      {children}
    </h4>
  );
};
