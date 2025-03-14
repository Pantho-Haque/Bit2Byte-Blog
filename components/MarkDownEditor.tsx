"use client";
import { Textarea } from "@/components/ui/textarea";
import { marked } from "marked";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { SaveImageHandler } from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import Showdown from "showdown";
// import "./styles.css";
    // "react-mde": "11.5.0",

    
const converter = new Showdown.Converter({
  tables: true, // Enables table support
  simplifiedAutoLink: true, // Automatically creates links
  strikethrough: true, // Enables strikethrough syntax
  tasklists: true, // Enables GitHub-style task lists
  openLinksInNewWindow: true, // Opens links in new tab
  emoji: true, // Enables emoji support
  parseImgDimensions: true, // Allows specifying image dimensions (e.g., ![image](url =100x200))
  ghCodeBlocks: true, // Enables GitHub-flavored code blocks
  underline: true, // Enables underline syntax
  backslashEscapesHTMLTags: true, // Escapes HTML tags with backslashes
  ghMentions: true, // Enables GitHub @mentions
  smartIndentationFix: true, // Fixes indentation for lists
  smoothLivePreview: true, // Enables smooth live previewing of changes
  requireSpaceBeforeHeadingText: true, // Requires a space before heading text
  disableForced4SpacesIndentedSublists: true, // Prevents sublists from needing 4 spaces
  completeHTMLDocument: false, // Determines if the output is a complete HTML document
  simpleLineBreaks: true,
});

const MarkdownEditor = () => {
  const [value, setValue] = useState("**Hello world!!!**");
  const [htmlString, setHtmlString] = useState("");
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );

  useEffect(() => {
    const makeHtml = async () => {
      const htmlContent = await marked(value);
      setHtmlString(htmlContent);
    };

    makeHtml();
  }, [value]);

  const save: SaveImageHandler = async function* (data: ArrayBuffer) {
    // Promise that waits for "time" milliseconds
    const wait = function (time: number) {
      return new Promise((a: any, r) => {
        setTimeout(() => a(), time);
      });
    };

    // Upload "data" to your server
    // Use XMLHttpRequest.send to send a FormData object containing
    // "data"
    // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

    await wait(2000);
    // yields the URL that should be inserted in the markdown
    yield "https://picsum.photos/300";
    await wait(2000);

    // returns true meaning that the save was successful
    return true;
  };

  // Function to handle the Tab key press inside the editor
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Tab") {
      event.preventDefault(); // Prevent the default tab behavior
      const textarea = event.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + "\t" + value.substring(end);
      setValue(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  return (
    <div className="w-full mx-auto text-zinc-900 dark:text-zinc-200  ">
      <div className="flex flex-col md:flex-row  mx-auto my-10 md:space-x-5 space-y-5 md:space-y-0  md:justify-even px-20 h-[50vh]">
        <div className="w-full md:w-1/2 h-full overflow-y-auto border ">
          <div className="text-xl font-semibold px-5 py-3">
                
          </div>
          <hr />
          <Textarea
            className="w-full  h-full overflow-auto break-words resize-none"
            id="markdown"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={6}
          />
        </div>

        <div className="w-full md:w-1/2 h-full overflow-y-auto border ">
          <p className="text-xl font-semibold px-5 py-3">Preview</p>
          <hr />
          <ReactMarkdown className="prose dark:prose-invert max-w-none mx-auto md:w-full p-5  overflow-auto break-words">
            {value}
          </ReactMarkdown>
        </div>
      </div>

      {/* <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        // loadSuggestions={loadSuggestions}
        childProps={{
          writeButton: {
            tabIndex: -1,
            className: "", // Custom class for write button
          },
          previewButton: {},
          commandButtons: {
            className: "commandColor", // Custom class for toolbar buttons
          },
          textArea: {
            onKeyDown: handleKeyDown, // Bind the Tab handling function
          },
        }}
        paste={{
          saveImage: save,
        }}
      /> */}
    </div>
  );
};

export default MarkdownEditor;
