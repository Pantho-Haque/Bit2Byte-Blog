import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Onthispage from "@/components/Onthispage";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import fs from "fs";
import matter from "gray-matter";
import { Metadata, ResolvingMetadata } from "next";
import { Titillium_Web } from "next/font/google";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypePrettyCode } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type Props = {
  params: { slug: string; title: string; description: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const BASE_URL = "http://130.51.120.58:8080/api/v1";

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
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3_000,
        }),
      ],
    })
    .use(rehypeAutolinkHeadings);

  const res = await fetch(`${BASE_URL}/read_blog_details/${params.slug}`);
  const resData = await res.json();
  // const filePath = `content/${params.slug}.md`;
  // const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(resData.data.content);

  const htmlContent = (await processor.process(content)).toString();

  return (
    <MaxWidthWrapper className="prose dark:prose-invert">
      <div className="flex justify-around mx-auto ">
        <div className="px-16  w-3/5">
          <h1 className={`${titillum_web.className} text-base `}>
            {"> "}
            {data.title}
          </h1>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
        <Onthispage className="text-sm " htmlContent={htmlContent} />
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
  return {
    // title: `${data.title} - Bit2Byte`,
    // description: data.description,
    title: ` Bit2Byte`,
    description: `data.description`,
  };
}
