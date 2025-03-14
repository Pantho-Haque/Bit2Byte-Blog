"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem, 
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function CarouselImage({ imageList }: { imageList: string[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full lg:w-[70%] mx-auto lg:mt-6"
      onMouseEnter={() => plugin.current.stop()} // Wrap with arrow function
      onMouseLeave={() => plugin.current.play()} 
    >
      <CarouselContent className=" rounded-none">
        {imageList?.map((e, index) => (
          <CarouselItem key={index}>
            <Card className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-none">
              {/* Set a fixed height */}
              <CardContent className="flex items-center justify-center  relative h-full rounded-none">
                <Image
                  src={e}
                  className="object-cover"
                  alt={`Carousel image ${index + 1}`}
                  fill // Allow Image to fill the CardContent
                  sizes="(max-width: 768px) 100vw, 50vw" // Set responsive sizes for better loading
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
}
