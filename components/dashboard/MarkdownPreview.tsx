"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  if (!content) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground italic p-8">
        Preview will appear here as you write
      </div>
    );
  }
  
  return (
    <ReactMarkdown
      className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:my-3 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-md"
      remarkPlugins={[remarkGfm as any]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={atomDark}
              language={match[1]}
              PreTag="div"
              {...props}
              className="rounded-md"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={`${className} bg-muted px-1 py-0.5 rounded-sm text-sm`} {...props}>
              {children}
            </code>
          );
        },
        img({ src, alt, ...props }) {
          return (
            <div className="my-4 overflow-hidden rounded-md border bg-muted">
              {src && (
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={src}
                    alt={alt || "Image"}
                    className="object-cover w-full h-full"
                    {...props}
                  />
                </div>
              )}
              {alt && <p className="py-2 text-center text-xs text-muted-foreground">{alt}</p>}
            </div>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownPreview;