'use client';
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface LinkType {
  id: string;
  tag: string;
  text: string;
}

const ClientOnThisPage = ({
  links,
  className,
}: {
  links: LinkType[];
  className: string;
}) => {
  useEffect(() => {
    // Add IDs to headings in the client
    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element && !element.id) {
        element.id = link.id;
      }
    });
  }, [links]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL without scroll
      window.history.pushState({}, '', `#${id}`);
    }
  };

  return (
    <div className={cn("hidden md:block", className)}>
      <div className="sticky top-20">
        <h2>On This Page</h2>
        <ul className="not-prose text-xs">
          {links.map((link) => (
            <li
              key={link.id}
              className={cn(
                "pt-1",
                link.tag === "H2" && "pl-4",
                link.tag === "H3" && "pl-8"
              )}
            >
              <a
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                className="hover:text-primary transition-colors"
              >
                {link.text.slice(0, 50)}
                {link.text.length > 50 ? "..." : ""}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientOnThisPage;