import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface BlogType {
  id: string;
  topic_id: string;
  sub_topic_id: string;
  title: string;
  short_desc: string;
  image?: string;
  written_by: string;
  approved_by: string;
  creation_time: string;
  last_updated: string;
  author_image: string;
}

const data = {
  id: 313,
  topic_id: 3,
  sub_topic_id: 313,
  title: "JavaScript - Regular Expressions",
  image: "https://88.222.244.211/public/photos/blog_info_image_313.jpeg",
  author_image: "https://88.222.244.211/public/photos/rahman2007007.jpg",
  last_updated: 1740838809172,
  creation_time: 1740838809172,
  written_by: "Md. Sakibur Rahman",
  short_desc: "Find you patters",
  approved_by: "Pantho Haque",
};

export default function BlogCard({ blog }: { blog: BlogType }) {
  return (
    <Link href={`/pub/blogpost/${blog.id}`} passHref>
      <div className={cn(
        "shadow-lg dark:shadow-zinc-700 rounded-lg flex cursor-pointer my-3 border-gray-200",
        "transition-all duration-300 ease-in-out",
        "hover:scale-[1.02] hover:shadow-xl"
      )}>
        {/* Fixed-width image container */}
        <div className="flex-shrink-0 flex justify-center items-center pl-5">
          <Image
            src={blog.image || "/images/blogimg.jpg"}
            width={200} // Adjust as needed
            height={200} // Adjust to maintain aspect ratio
            quality={70}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsaquqBwAE9wH7ovCCVwAAAABJRU5ErkJggg=="
            className="object-cover rounded-l-lg"
            alt={blog.title}
          />
        </div>

        {/* Content container fills the rest */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h1 className="text-xl font-semibold">{blog.title}</h1>
            <p className="text-gray-600 ml-3">{blog.short_desc}</p>
          </div>
            <div className="flex items-center space-x-2 mt-4">
            <Image
              src={blog.author_image}
              width={30}
              height={30}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsaquqBwAE9wH7ovCCVwAAAABJRU5ErkJggg=="
              className="object-cover rounded"
              alt={blog.written_by}
            />
            <p className="text-gray-600">{blog.written_by}</p>
            <p className="text-gray-600">|</p>
            <DateTimeDisplay creationTime={blog.creation_time} />
            </div>
        </div>
      </div>
    </Link>
  );
}

export function DateTimeDisplay({ creationTime }: { creationTime: string }) {
  const date = new Date(creationTime);

  if (isNaN(date.getTime())) {
    console.error("Invalid date provided:", date);
    return "Invalid Date"; // or any fallback handling
  }
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate;
}
