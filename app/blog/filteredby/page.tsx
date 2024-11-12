import { BlogControl, BlogView } from "@/components/index";
import { getFilteredBlog } from "@/lib/api";

type Props = {
  searchParams: { topic: string; subtopic?: string };
};

interface BlogType {
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
  authorImage:string;
}

export default async function FilteredBy({ searchParams }: Props) {
  const topic = searchParams.topic;
  const subtopic = searchParams.subtopic || null;

  const { data }:{data:BlogType[]} = await getFilteredBlog(topic, subtopic);

  return (
    <div className="container mx-auto p-4">
      <BlogControl topic={topic} />
      {/* blog list */}
      <BlogView blogs={data} />
    </div>
  );
}
