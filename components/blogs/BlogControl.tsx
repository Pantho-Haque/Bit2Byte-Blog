// import SampleBlogs from "@/config/sampleblogs";
import { SearchBlogBar } from "@/components/index";
import { Button } from "@/components/ui/button";
import { getSyllabus } from "@/lib/api";

import { Separator } from "@/components/ui/separator";

import Link from "next/link";
type Props = {
  topic?: string | null;
};

export default async function BlogControl({ topic }: Props) {
  const syllabus = await getSyllabus();
  const topicData = syllabus?.data.map(
    (item: { id: number; topic_name: string }) => [
      item.topic_name,
      item.id.toString(),
    ]
  );

  return (
    <div>
      <SearchBlogBar />

      {/* badges */}
      <div className="flex flex-row space-x-3 my-5 justify-center">
        <Link href={`/blog`}>
          <Button variant={topic == null ? "default" : "outline"}>All</Button>
        </Link>
        {topicData.map((e: [string, string], i: number) => (
          <Link key={i} href={`/blog/filteredby?topic=${e[1]}`}>
            <Button variant={topic == e[1] ? "default" : "outline"}>
              {e[0]}
            </Button>
          </Link>
        ))}
      </div>

      <Separator className="mb-5 shadow-sm shadow-slate-300 " />
    </div>
  );
}
