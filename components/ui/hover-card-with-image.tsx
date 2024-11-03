"use client";
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export const HoverImageCard = ({
  items,
  className,
}: {
  items: {
    id: string;
    topicID: string;
    subTopicId: string;
    title: string;
    shortDesc: string;
    image?: string;
    writtenBy: string;
    approvedBy: string;
    creationTime: string;
  }[];
  className?: string;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full  mx-auto">
      {items.map((item , idx) => (
        <CardContainer key={idx} className="inter-var w-full">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 bg-gradient-to-bl from-slate-100 to-cyan-100 dark:from-slate-950 dark:to-cyan-950">
          
          {/* Title Section */}
          <CardItem
            translateZ="20"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {item.title}
          </CardItem>
    
          
          {/* Description */}
          <CardItem
            as="p"
            translateZ="20"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {item.shortDesc}
          </CardItem>
          
          {/* Image */}
          <CardItem translateZ="10" className="w-full mt-4">
            <Image
              src={item.image || "/images/blogimg.jpg"}
              width={500}
              height={500}
              quality={70}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsaquqBwAE9wH7ovCCVwAAAABJRU5ErkJggg=="
              className="h-60 w-full object-cover rounded-xl"
              alt={item.title}
            />
          </CardItem>
          
          {/* Additional Details */}
          <div className="mt-4">
            <CardItem
              as="p"
              translateZ="20"
              className="text-neutral-500 text-sm max-w-sm dark:text-neutral-300"
            >
              <span className="text-black dark:text-white">Author:</span> {item.writtenBy}
            </CardItem>
            
            <CardItem
              as="p"
              translateZ="20"
              className="text-neutral-500 text-sm max-w-sm dark:text-neutral-300"
            >
              <span className="text-black dark:text-white">Approved By:</span> {item.approvedBy}
            </CardItem>
      
            <CardItem
              as="p"
              translateZ="20"
              className="text-neutral-500 text-sm max-w-sm dark:text-neutral-300"
            >
              <span className="text-black dark:text-white">Created At:</span> {DateTimeDisplay({ creationTime: item.creationTime })}
            </CardItem>
          </div>
      
          {/* Action Button */}
          <div className="flex justify-between items-center mt-5">
            <CardItem
              translateZ={10}
              as={Link}
              href={`/blogpost/${item.id}`}
              // target="__blank"
              className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ml-auto text-center"
            >
              Read →
            </CardItem>
          </div>
          
        </CardBody>
      </CardContainer>
      
      ))}
    </div>
  );
};

export default function DateTimeDisplay({
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
