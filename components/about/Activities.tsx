"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

type Props = {
  testimonials:{title:string,desc:string,icon:string}[]
};

export default function Activiteis({testimonials}: Props) {
 

  return (
    <div className="w-full h-full lg:h-[50rem] rounded-md flex flex-col antialiased  items-center justify-center relative lg:overflow-hidden">
      <p className="text-5xl font-extrabold mb-10 text-center">
        Our Activities
      </p>
      <InfiniteMovingCards
        items={testimonials}
        direction="left"
        speed="normal"
      />
    </div>
  );
}
