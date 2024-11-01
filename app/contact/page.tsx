npm i"use client";
import React, { useEffect, useState } from "react";
import ReactMde, { Suggestion, SaveImageHandler } from "react-mde";
import Showdown from "showdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./styles.css";
import { markdownProcessor } from "@/lib/markdownProcessor";

const loadSuggestions = async (text: string) => {
  return new Promise<Suggestion[]>((accept, reject) => {
    setTimeout(() => {
      const suggestions: Suggestion[] = [
        {
          preview: "Andre",
          value: "@andre",
        },
        {
          preview: "Angela",
          value: "@angela",
        },
        {
          preview: "David",
          value: "@david",
        },
        {
          preview: "Louise",
          value: "@louise",
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  });
};
const converter = new Showdown.Converter({
  tables: true,                // Enables table support
  simplifiedAutoLink: true,     // Automatically creates links
  strikethrough: true,          // Enables strikethrough syntax
  tasklists: true,              // Enables GitHub-style task lists
  openLinksInNewWindow: true,   // Opens links in new tab
  emoji: true,                  // Enables emoji support
  parseImgDimensions: true,     // Allows specifying image dimensions (e.g., ![image](url =100x200))
  ghCodeBlocks: true,           // Enables GitHub-flavored code blocks
  underline: true,              // Enables underline syntax
  backslashEscapesHTMLTags: true, // Escapes HTML tags with backslashes
  ghMentions: true,             // Enables GitHub @mentions
  smartIndentationFix: true,    // Fixes indentation for lists
  smoothLivePreview: true,      // Enables smooth live previewing of changes
  requireSpaceBeforeHeadingText: true, // Requires a space before heading text
  disableForced4SpacesIndentedSublists: true, // Prevents sublists from needing 4 spaces
  completeHTMLDocument: false,   // Determines if the output is a complete HTML document
  simpleLineBreaks:true,
});

const MarkdownEditorWithImages = () => {
  const [value, setValue] = useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );

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

      // Get the textarea element
      const textarea = event.currentTarget;

      // Get the current position of the cursor
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Set the value with the tab character inserted at the current position
      const newValue = value.substring(0, start) + "\t" + value.substring(end);
      setValue(newValue);

      // Move the cursor after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };


  return (
    <div className="w-1/2 mx-auto text-zinc-900 dark:text-zinc-200  ">
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        loadSuggestions={loadSuggestions}
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
      />
    </div>
  );
};

export default MarkdownEditorWithImages;
