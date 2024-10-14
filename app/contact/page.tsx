"use client"
import React, { useEffect, useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "react-mde/lib/styles/css/react-mde-all.css";
import { markdownProcessor } from "@/lib/markdownProcessor";

const MarkdownEditorWithImages = () => {
  const [markdown, setMarkdown] = useState<string>(""); // For markdown content
  const [htmlContent, setHtmlContent] = useState<string>(""); // For markdown content
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const [images, setImages] = useState<string[]>([]); // Array to store image URLs

  const converter = new Showdown.Converter({ tables: true, simplifiedAutoLink: true });

  useEffect(() => {
    const processMarkdown = async () => {
      const html = await markdownProcessor(markdown);
      setHtmlContent(html);
    };
  
    processMarkdown(); // Call the async function
  }, [markdown]);
  
  // Handle inserting image markdown into the content
  const insertImageMarkdown = (imageUrl: string) => {
    const imageMarkdown = `![alt text](${imageUrl})`;
    setMarkdown((prevMarkdown) => `${prevMarkdown}\n${imageMarkdown}`);
  };

  // Handle image uploads and store the image locally (in-memory for now)
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imageUrls = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...imageUrls]);

      // Insert the image URL markdown at the current cursor position
      imageUrls.forEach((url) => insertImageMarkdown(url));
    }
  };


  return (
    <div className="container mx-auto p-4 flex space-x-6">
      {/* Markdown Editor */}
      <div className="editor-container w-full h-full border p-4 rounded-md shadow-sm">
        <ReactMde
          value={markdown}
          onChange={setMarkdown}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
        />
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Upload Images:</h2>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditorWithImages;

