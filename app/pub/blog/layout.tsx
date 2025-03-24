// import SampleBlogs from "@/config/sampleblogs";
import { SearchBlogBar } from "@/components/index";
import { Button } from "@/components/ui/button";

import { getSyllabus } from "@/lib/api";

import Link from "next/link";

type Props = { topic: string; subtopic?: string };

export default async function Layout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: Props;
}) {
  

  return (
    <div className="w-[90%] mx-auto">
      <SearchBlogBar />
      <div className="mx-auto flex justify-betweenitems-start"> 
        {/* filter options */}
        {children}
      </div>
    </div>
  );
}
