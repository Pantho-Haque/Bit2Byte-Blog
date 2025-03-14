import { BlogView } from "@/components/index";
import { getFilteredBlog } from "@/lib/api";
import { useEffect } from "react";

type Props = {
  searchParams: { topic: string; subtopic?: string };
};

interface BlogType {
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

export default async function FilteredBy({ searchParams }: Props) {
  const topic = searchParams.topic;
  const subtopic = searchParams.subtopic || null;


  const { data }:{data:BlogType[]} = await getFilteredBlog(topic, subtopic);


  return (
    <div className="container mx-auto p-4">
      {/* <BlogControl topic={topic} />
       blog list */}
      <BlogView blogs={data} />
    </div>
  );
}
