'use server'
import { cn } from "@/lib/utils";
import { JSDOM } from "jsdom";
import ClientOnThisPage from "./ClientOnThisPage";

interface LinkType {
  id: string;
  tag: string;
  text: string;
}

const extractHeadings = (htmlContent: string): LinkType[] => {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const headings = document.querySelectorAll("h1,h2,h3");

  const generatedLinks: LinkType[] = [];

  headings.forEach((heading, index) => {
    const id = heading.id || `heading-${index}`;
    heading.id = id;

    generatedLinks.push({
      id: id,
      tag: heading.tagName,
      text: heading.textContent || "",
    });
  });
  return generatedLinks;
};

const OnThisPage = ({
  htmlContent,
  className,
}: {
  htmlContent: string;
  className: string;
}) => {
  // Extract headings on the server
  const links = extractHeadings(htmlContent);

  return <ClientOnThisPage links={links} className={className} />;
};

export default OnThisPage;
