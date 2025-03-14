// 'use client';
import BlogsThumb from '@/components/home/BlogsThumb';
import TechIcons from '@/components/home/TechIcons';
import { Footer, LampHeader, Mission, NavBar } from '@/components/index';
import { getAllBlogs } from '@/lib/api';
import { BlogType } from './pub/blog/page';

export default async function Home() {
  const { data } = await getAllBlogs();

  const blogs: BlogType[] = data?.items;
  return (
    <div className='w-'>
      {/* <GlobeComp /> */}
      <NavBar />
      <LampHeader />
      <BlogsThumb blogs={blogs} />
      {/* <Mission /> */}
      <TechIcons />
    </div>
  );
}
