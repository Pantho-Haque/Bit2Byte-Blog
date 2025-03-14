import { getAllBlogs } from '@/lib/api';
import { BlogCard } from '@/components/index';
import { BlogType } from '@/app/pub/blog/page';

const BlogsThumb = ({ blogs }: { blogs: BlogType[] }) => {
  // if (!blogs || !blogs.length) return null;

  console.log(blogs);

  return (
    <div className="w-full min-h-[350px] py-20 px-4 md:px-20 bg-[url('/blog-bg.jpg')] bg-center bg-cover relative">
      <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40'></div>

      <div className='max-w-7xl mx-auto w-full flex flex-row items-center justify-center flex-wrap gap-8'>
        {blogs.slice(0, 2).map((blog: BlogType, key: number) => (
          <div key={key} className='p-3 bg-background rounded-lg'>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsThumb;
