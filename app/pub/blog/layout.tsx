// import SampleBlogs from "@/config/sampleblogs";
import { SearchBlogBar } from "@/components/index";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
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
