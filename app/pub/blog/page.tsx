import { BlogCard } from "@/components/index";
import { Button } from "@/components/ui/button";

import { getFilteredBlog, getSyllabus } from "@/lib/api";

import Link from "next/link";


import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,

} from "@/components/ui/pagination";

import { getAllBlogs } from "@/lib/api";

import { Metadata } from "next";


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

const BlogList = async ({
  searchParams,
}: {
  searchParams: { topic: string; subtopic?: string };
}) => {
  const topic = searchParams.topic;
  const subtopic = searchParams.subtopic || null;


  const syllabus = await getSyllabus();
  const topicData = syllabus?.data.map(
    (item: { id: number; topic_name: string }) => [
      item.topic_name,
      item.id.toString(),
    ]
  );

  const result = topic
    ? await getFilteredBlog(topic, subtopic)
    : await getAllBlogs();

  const data = result.data.items ? result.data.items : result.data;


  return (
    <div className="flex justify-center w-full">
      <div className="w-[10%]  flex flex-col space-y-3 mt-16">
        <Link href={`/pub/blog`} className="w-full">
          <Button
            variant={topic == null ? "default" : "outline"}
            className="w-full"
          >
            All
          </Button>
        </Link>
        {topicData.map((e: [string, string], i: number) => {
          return (
            <Link key={i} href={`/pub/blog?topic=${e[1]}`} className="w-full">
              <Button
                variant={topic == e[1] ? "default" : "outline"}
                className="w-full"
              >
                {e[0]}
              </Button>
            </Link>
          );
        })}

      </div>
      <div className="w-[85%] ">
        <div className="w-full mx-auto p-4">
          {data.length == 0 && (
            <p className="text-5xl font-semibold mt-10 w-full text-center text-gray-600">
              No Blogs found
            </p>
          )}

          {/* <HoverImageCard items={blogs} /> */}
          <div className="max-w-full mx-auto pl-10 h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden" 
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#f1f1f1 transparent' }}>
              {data?.map((blog: BlogType, index: number) => (
               <BlogCard key={index} blog={blog} />
              ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

    </div>
  );
};

export const metadata: Metadata = {
  title: 'Blogs - Bit2Byte',
  description:
    'A comprehensive blog for coders of all levels, from beginners to advanced. Explore tutorials, tips, and insights on a wide range of programming languages and technologies. Stay up-to-date with the latest trends in software development, learn best practices, and enhance your coding skills with in-depth articles and guides.',
};

export default BlogList;
