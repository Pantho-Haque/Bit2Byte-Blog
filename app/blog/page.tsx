// import SampleBlogs from "@/config/sampleblogs";
import { SearchBlogBar } from "@/components/SearchBlogBar";
import { HoverImageCard } from "@/components/ui/hover-card-with-image";

import { getAllBlogs } from "@/lib/api";

import { Metadata } from "next";

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
}

// const dirContent = fs.readdirSync("content", "utf-8");
// console.log(dirContent);

// let blogs: BlogType[] = dirContent.map((file) => {
//   const fileContent = readFileSync(`content/${file}`, "utf-8");
//   const { data } = matter(fileContent);
//   const value: BlogType = {
//     slug: data.slug,
//     title: data.title,
//     description: data.description,
//     imageUrl: data?.imageUrl,
//   };
//   return value;
// });

// console.log(blogs);
// blogs = [];

const BlogList = async () => {
  const data = await getAllBlogs();

  const blogs: BlogType[] = data.data?.items.map((blog: BlogType) => {
    return {
      id: blog.id,
      title: blog.title,
      shortDesc: blog.shortDesc,
      image: blog.image,
      topicID: blog.topicID,
      subTopicId: blog.subTopicId,
      writtenBy: blog.writtenBy,
      approvedBy: blog.approvedBy,
      creationTime: blog.creationTime,
    };
  });

  // const MultipliedBlog4Testing = [...blogs, ...blogs, ...blogs, ...blogs];

  return (
    <div className="container mx-auto p-4">
      <SearchBlogBar />
      {blogs.length == 0 && (
        <p className="text-7xl font-semibold mt-10 w-full text-center text-gray-600">
          No Blogs found
        </p>
      )}
      <HoverImageCard items={blogs} />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Blogs - Bit2Byte",
  description:
    "A comprehensive blog for coders of all levels, from beginners to advanced. Explore tutorials, tips, and insights on a wide range of programming languages and technologies. Stay up-to-date with the latest trends in software development, learn best practices, and enhance your coding skills with in-depth articles and guides.",
};

export default BlogList;
