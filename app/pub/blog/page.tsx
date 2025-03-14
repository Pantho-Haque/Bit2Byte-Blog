// import SampleBlogs from "@/config/sampleblogs";
import { BlogCard, BlogView, SearchBlogBar } from '@/components/index';
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
  topic_id: string;
  sub_topic_id: string;
  title: string;
  short_desc: string;
  image?: string;
  written_by: string;
  approved_by: string;
  creation_time: string;
  last_updated: string;
  author_image: string;
}

type Props = {
  topic?: string | null;
};
const sl = {
  data: [
    {
      id: 1,
      topic_name: 'C',
      no_of_sub_topics: 9,
      sub_topics: [Array],
    },
    {
      id: 2,
      topic_name: 'Java',
      no_of_sub_topics: 17,
      sub_topics: [Array],
    },
    {
      id: 3,
      topic_name: 'JavaScript',
      no_of_sub_topics: 9,
      sub_topics: [Array],
    },
    { id: 4, topic_name: 'DSA', no_of_sub_topics: 6, sub_topics: [] },
    {
      id: 5,
      topic_name: 'OOP',
      no_of_sub_topics: 8,
      sub_topics: [Array],
    },
    {
      id: 10,
      topic_name: 'Android',
      no_of_sub_topics: 10,
      sub_topics: [Array],
    },
  ],
  message: 'Operation successful',
  success: true,
};

const BlogList = async ({ topic }: Props) => {
  const { data } = await getAllBlogs();
  const syllabus = await getSyllabus();
  const topicData = syllabus?.data.map(
    (item: { id: number; topic_name: string }) => [
      item.topic_name,
      item.id.toString(),
    ]
  );

  console.log(syllabus);

  const blogs: BlogType[] = data?.items;

  const { pageNo, totalPages } = data;

  return (
    <div className='w-full mx-auto p-4'>
      <div>
        <SearchBlogBar />

        {/* badges */}
        <div className='w-full flex flex-row space-x-3 my-5 justify-center flex-wrap'>
          <Link href={`/pub/blog`}>
            <Button variant={topic == null ? 'default' : 'outline'}>All</Button>
          </Link>
          {topicData.map((e: [string, string], i: number) => (
            <Link key={i} href={`/pub/blog/filteredby?topic=${e[1]}`}>
              <Button variant={topic == e[1] ? 'default' : 'outline'}>
                {e[0]}
              </Button>
            </Link>
          ))}
        </div>

        <Separator className='mb-5 shadow-sm shadow-slate-300 ' />
      </div>
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
