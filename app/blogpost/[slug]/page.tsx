import Comments from "@/components/Comments";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Onthispage from "@/components/Onthispage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSingleBlog } from "@/lib/api";
import { marked } from "marked";
import hljs from "highlight.js";
import "./index.css"
import { Metadata, ResolvingMetadata } from "next";
import { Titillium_Web } from "next/font/google";




type Props = {
  params: { slug: string; title: string; description: string };
  searchParams: { [key: string]: string | string[] | undefined };
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
  // const processor = unified()
  //   .use(remarkParse)
  //   .use(remarkGfm)
  //   .use(remarkRehype)
  //   .use(rehypeStringify)
  //   .use(rehypeSlug)
  //   .use(rehypePrettyCode, {
  //     theme: "github-dark",
  //     transformers: [
  //       transformerCopyButton({
  //         visibility: "always",
  //         feedbackDuration: 3_000,
  //       }),
  //     ],
  //   })
  //   .use(rehypeAutolinkHeadings);

  // const filePath = `content/${params.slug}.md`;
  // const fileContent = fs.readFileSync(filePath, "utf-8");

  marked.setOptions({
    highlight: function (code: string, language?: string): string {
      if (language && hljs.getLanguage(language)) {
        // Use the specified language if it is supported
        return hljs.highlight(code, { language }).value;
      } else {
        // Use auto-detection otherwise
        return hljs.highlightAuto(code).value;
      }
    },
  });
  const resData = await getSingleBlog(params.slug);
  const data = resData.data;

  // const htmlContent = (await processor.process(data.content)).toString();
  const htmlContent = marked(data.content);

  return (
    <MaxWidthWrapper className="prose dark:prose-invert">
      <div className="flex justify-around mx-auto">
        <div className="px-16  md:w-3/5">
          <h1 className={`${titillum_web.className} text-base `}>
            {"> "}
            {data.title}
            {"    >   "}
            {data.short_desc}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {data.written_by} |{" "}
            {DateTimeDisplay({ creationTime: data.creation_time })}
          </p>

          <div
            className=""
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </div>
        <Onthispage className="text-sm " htmlContent={htmlContent} />
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
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  // const filePath = `content/${params.slug}.md`;
  // const fileContent = fs.readFileSync(filePath, "utf-8");
  // const { data } = matter(fileContent);
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

