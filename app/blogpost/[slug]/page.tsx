import { Comments, MaxWidthWrapper, OnThisPage } from "@/components/index";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSingleBlog } from "@/lib/api";
import parse, { DOMNode, domToReact, Element } from "html-react-parser";
import { marked } from "marked";
import { Metadata, ResolvingMetadata } from "next";
import { Titillium_Web } from "next/font/google";
import Image from "next/image";
import { createElement } from "react";

type Props = {
  params: { slug: string; title: string; description: string };
};

const commentsData = [
  {
    username: "User1",
    date: "2024-11-02",
    content: "This is a comment 1.",
    upvotes: 10,
    downvotes: 2,
    replies: [
      {
        username: "User2",
        date: "2024-11-03",
        content: "This is a reply 1.1",
        upvotes: 5,
        downvotes: 1,
        replies: [
          {
            username: "User2",
            date: "2024-11-03",
            content: "This is a reply 1.1.1",
            upvotes: 5,
            downvotes: 1,
            replies: [],
          },
        ],
      },
      {
        username: "User2",
        date: "2024-11-03",
        content: "This is a reply 1.2",
        upvotes: 5,
        downvotes: 1,
        replies: [
          {
            username: "User2",
            date: "2024-11-03",
            content: "This is a reply 1.2.1",
            upvotes: 5,
            downvotes: 1,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    username: "User1",
    date: "2024-11-02",
    content: "This is a comment 2.",
    upvotes: 10,
    downvotes: 2,
    replies: [
      {
        username: "User2",
        date: "2024-11-03",
        content: "This is a reply 2.1.",
        upvotes: 5,
        downvotes: 1,
        replies: [
          {
            username: "User2",
            date: "2024-11-03",
            content: "This is a reply 2.1.1",
            upvotes: 5,
            downvotes: 1,
            replies: [],
          },
        ],
      },
    ],
  },
];

const convertHtmlToNextImage = (htmlContent: string) => {
  let idx = -1;
  const options = {
    replace: (node: any) => {
      if (node instanceof Element && node.name === "img") {
        // console.log(node.attribs);
        const { src, alt, width, height, ...rest } = node.attribs;
        if (!src) return null;

        const imgWidth = width ? parseInt(width, 10) : undefined;
        const imgHeight = height ? parseInt(height, 10) : undefined;

        const imageProps = {
          src,
          alt: "next image",
          width: imgWidth || 800,
          height: imgHeight || 600,
          ...rest,
        };

        return createElement(Image, {
          ...imageProps,
          loading: "lazy",
          className: rest.className || "w-full h-auto",
        });
      } else if (
        node instanceof Element &&
        (node.name === "h1" || node.name === "h2" || node.name === "h3")
      ) {
        idx++;
        return createElement(
          node.name,
          { id: `heading-${idx}` },
          domToReact(node.children as DOMNode[], options)
        );
      }
    },
  };

  return parse(htmlContent, options);
};

// https://ondrejsevcik.com/blog/building-perfect-markdown-processor-for-my-blog

const titillum_web = Titillium_Web({
  style: ["normal"],
  weight: ["400"],
  subsets: ["latin"],
});

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const resData = await getSingleBlog(params.slug);
  const data = resData.data;

  const htmlContent = await marked(data.content);
  const htmlContentWithNextImage = convertHtmlToNextImage(htmlContent);

  return (
    <MaxWidthWrapper className="prose dark:prose-invert max-w-none ">
      <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-xl shadow-lg">
        {/* Background Image */}
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-contain object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent"></div>

        <div className="absolute bottom-10 left-8 text-white space-y-3">
          <h1 className="text-lg md:text-4xl lg:text-5xl font-extrabold text-white">
            {data.title}
          </h1>
          <p className="text-xs lg:text-base font-medium text-gray-300">
            {data.short_desc}
          </p>
          <div className="text-sm flex gap-3">
            <span>
              Written by:{" "}
              <span className="font-semibold">{data.written_by}</span>
            </span>
            {/* <span>
              Approved by:{" "}
              <span className="font-semibold">{data.approved_by}</span>
            </span> */}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {DateTimeDisplay({ creationTime: data.creation_time })}
          </p>
        </div>
      </div>


      {/* content */}
      <div className="flex justify-center mx-auto">
        <div className="px-3 md:px-16 xs:bg-red-900  md:w-3/5 break-words">
          {htmlContentWithNextImage}
        </div>

        <OnThisPage className="text-sm px-10" htmlContent={htmlContent} />
      </div>
      <div className="mt-10 flex flex-col justify-center items-center w-full">
        <div className="flex w-[70vw] max-w-[800px] items-center space-x-2">
          <Input type="text" placeholder="Write a comment" />
          <Button type="submit">Comment</Button>
        </div>
        <div className="mt-3 border w-[70vw] max-w-[800px] px-5 rounded-lg">
          <Comments comments={commentsData} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resData = await getSingleBlog(params.slug);
  const data = resData.data;

  return {
    title: `${data.title} - Bit2Byte`,
    description: data.short_desc,
  };
}

function DateTimeDisplay({ creationTime }: { creationTime: string }) {
  const date = new Date(creationTime);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate;
}
