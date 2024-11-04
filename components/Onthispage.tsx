"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface LinkType {
  id: string;
  tag: string;
  text: string;
}

const Onthispage = ({
  htmlContent,
  className,
}: {
  htmlContent: string;
  className: string;
}) => {
  const [links, setLinks] = useState<null | LinkType[]>(null);

  useEffect(() => {
    const temp = document.createElement("div");
    temp.innerHTML = htmlContent;

    // Check this syntax
    const headings = temp.querySelectorAll("h1,h2,h3");

    const generatedLinks: LinkType[] = [];

    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id;

      // console.log(heading);
      generatedLinks.push({
        id: id,
        tag: heading.tagName,
        text: (heading as HTMLElement).innerText,
      });
    });

    setLinks(generatedLinks);
    console.log(generatedLinks);
  }, [htmlContent]);

  return (
    <div className={cn("hidden md:block ", className)}>
      <div className="sticky top-20">
        <h2>On This Page </h2>
        <ul className="not-prose text-sm font-semibold">
          {links &&
            links.map((link) => {
              return (
                <li key={link.id} className={`pt-1 ${link.tag=="H2" && "pl-4"} ${link.tag=="H3" && "pl-8"}` }>
                  <a href={`#${link.id}`}> 
                    {link.text.slice(0, 50)}{link.text.length > 50 ? "..." : ""}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Onthispage;
