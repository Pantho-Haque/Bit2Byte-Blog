import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface BlogType {
  id: string;
  topicID: string;
  subTopicId: string;
  title: string;
  shortDesc: string;
  image?: string;
  writtenBy: string;
  approvedBy: string;
  creationTime: string;
}

export default function BlogCard({ blog }: { blog: BlogType }) {
  return (
    <Link href={`/blogpost/${blog.id}`} passHref>
      <div className="max-w-sm  w-full  group/card mx-auto dark:text-gray-50 text-gray-900">
        <div
          className={cn(
            " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-2xl shadow-gray-400 dark:shadow-gray-800  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4  "
          )}
          // style={{
          //     backgroundImage: `url(${blog.image}?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)`,
          //     backgroundSize: 'cover',
          //     backgroundPosition: 'center',
          //   }}
        >
          <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-gray-900/60 group-hover/card:text-gray-100 opacity-60"></div>
          <div className="flex flex-row items-center space-x-4 ">
            <Image
              height="100"
              width="100"
              alt="Avatar"
              src="https://img.icons8.com/?size=100&id=23264&format=png&color=000000"
              className="h-10 w-10 rounded-full border-2 object-cover"
            />
            <div className="flex flex-col">
              <p className="text-base relative font-semibold ">
                {blog.writtenBy}
              </p>
              <p className="text-sm font-normal ">{DateTimeDisplay({ creationTime: blog.creationTime })}</p>
            </div>
          </div>
          <Image
            src={"/images/blogimg.jpg"}
            // src={blog.image || "/images/blogimg.jpg"}
            width={500}
            height={100}
            quality={70}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsaquqBwAE9wH7ovCCVwAAAABJRU5ErkJggg=="
            className="h-40 w-full object-cover rounded-xl"
            alt={blog.title}
          />
          <div className="text content">
            <h1 className="font-bold text-lg md:text-xl  relative ">
              {blog.title}
            </h1>
            <p className="font-normal text-sm relative  my-4">
              {blog.shortDesc}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}


export  function DateTimeDisplay({
    creationTime,
  }: {
    creationTime: string;
  }) {
    const date = new Date(creationTime);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  
    return formattedDate;
  }
  
