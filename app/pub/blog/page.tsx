// import SampleBlogs from "@/config/sampleblogs";
import {
  BlogCard,
  BlogControl,
  BlogView,
  SearchBlogBar,
} from '@/components/index';
import { Button } from '@/components/ui/button';
import { HoverImageCard } from '@/components/ui/hover-card-with-image';

import { getAllBlogs, getSyllabus } from '@/lib/api';
import { Separator } from '@/components/ui/separator';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { Metadata } from 'next';
import Link from 'next/link';

export interface BlogType {
  id: string;
  topicID: string;
  subTopicId: string;
  title: string;
  shortDesc: string;
  image?: string;
  writtenBy: string;
  approvedBy: string;
  creationTime: string;
  basePhotoUrl: string;
  authorImage: string;
}

const BlogList = async () => {
  const { data } = await getAllBlogs();

  const blogs: BlogType[] = data?.items;

  const { pageNo, totalPages } = data;

  return (
    <div className='w-full mx-auto p-4'>
      <BlogControl />
      {/* blog list */}
      <BlogView blogs={blogs} />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export const metadata: Metadata = {
  title: 'Blogs - Bit2Byte',
  description:
    'A comprehensive blog for coders of all levels, from beginners to advanced. Explore tutorials, tips, and insights on a wide range of programming languages and technologies. Stay up-to-date with the latest trends in software development, learn best practices, and enhance your coding skills with in-depth articles and guides.',
};

export default BlogList;
