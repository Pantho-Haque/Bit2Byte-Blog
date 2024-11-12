// import SampleBlogs from "@/config/sampleblogs";
import { SearchBlogBar } from "@/components/index";
import { Button } from "@/components/ui/button";
import { getSyllabus } from "@/lib/api";

import { Separator } from "@/components/ui/separator";

import Link from "next/link";
type Props = {};

export default async function BlogControl({}: Props) {
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
        {topicData.map((e: [string, string], i: number) => (
          <Link key={i} href={`/blog/filteredby?topic=${e[1]}`}>
            <Button variant="outline">{e[0]}</Button>
          </Link>
        ))}
      </div>

      <Separator className="mb-3" />
    </div>
  );
}
