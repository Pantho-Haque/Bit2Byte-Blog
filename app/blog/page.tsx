// import SampleBlogs from "@/config/sampleblogs";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import fs, { readFileSync } from "fs";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

interface BlogType {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
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
const BASE_URL = 'http://130.51.120.58:8080/api/v1' ;

// blogs = [];

const BlogList = async () => {

  const res = await fetch(`${BASE_URL}/read_blogs`); 
  const data = await res.json();

  // console.log(data.data);

  const blogs : BlogType[] = data.data.items.map((blog: BlogType) => {
    return {
      slug: blog.slug,
      title: blog.title,
      description: blog.description,
      imageUrl: blog.imageUrl
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center my-2">Bit2Byte Blogs</h1>
      {blogs.length == 0 && (
        <p className="text-7xl font-semibold mt-10 w-full text-center text-gray-600">
          No Blogs found
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-4/5 mx-auto">
        {blogs.map((blog: BlogType, index: number) => (
          <div
            key={index}
            className="shadow-lg shadow-znc-200 rounded-lg overflow-hidden  pb-3 flex flex-col justify-between"
          >
            <div className="p-4 ">
              <img
                className="w-full h-64 object-cover object-top"
                src={blog.imageUrl ? blog.imageUrl : "/blogimg.jpg"}
                alt={blog.title}
              />
              <h2 className="text-xl font-semibold my-2">{blog.title}</h2>
              <p className="mb-4">{blog.description}</p>
            </div>
            <Link
              href={`/blogpost/${blog.slug}`}
              className={`${buttonVariants({ variant: "default" })} w-1/3 ml-4`}
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Blogs - Bit2Byte",
  description:
    "A comprehensive blog for coders of all levels, from beginners to advanced. Explore tutorials, tips, and insights on a wide range of programming languages and technologies. Stay up-to-date with the latest trends in software development, learn best practices, and enhance your coding skills with in-depth articles and guides.",
};

export default BlogList;
