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
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-[50vw] mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="">
        {imageList?.map((e, index) => (
          <CarouselItem key={index}>
            <Card className="relative w-full h-[500px]">
              {/* Set a fixed height */}
              <CardContent className="flex items-center justify-center p-6 relative h-full">
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
