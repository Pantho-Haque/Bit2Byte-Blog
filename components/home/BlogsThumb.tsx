'use client';

import { BlogCard } from '@/components/index';
import { BlogType } from '@/app/pub/blog/page';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../ui/carousel';
import { useRef } from 'react';

const BlogsThumb = ({ blogs }: { blogs: BlogType[] }) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="w-full min-h-[350px] py-20 px-4 md:px-20 bg-[url('/blog-bg.jpg')] bg-center bg-cover relative">
      <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40'></div>

      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => plugin.current.play()}
        className='max-w-7xl mx-auto w-full relative flex items-center'
      >
        <CarouselPrevious className='absolute left-4 md:-left-12 lg:-left-14 z-10' />

        <CarouselContent className='flex ml-2 gap-x-6'>
          {blogs.map((blog: BlogType, key: number) => (
            <CarouselItem
              key={key}
              className='p-0 bg-background rounded-lg md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]'
            >
              <BlogCard blog={blog} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselNext className='absolute right-4 md:-right-12 lg:-right-14 z-10' />
      </Carousel>
    </div>
  );
};

export default BlogsThumb;
