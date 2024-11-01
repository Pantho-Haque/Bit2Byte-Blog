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
  }[];
  className?: string;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-4/5 mx-auto">
      {items.map((item) => (
        <CardContainer className="inter-var w-full">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 bg-gradient-to-bl from-slate-950 to-cyan-950 ">
            <CardItem
              translateZ="20"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              {item.title}
            </CardItem>
            <CardItem
              as="p"
              translateZ="20"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              {item.shortDesc}
            </CardItem>
            <CardItem translateZ="10" className="w-full mt-4">
              <Image
                src={item.image || "/images/hero-image.jpg"}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <CardItem
              as="p"
              translateZ="20"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              <span className="text-black dark:text-white"> Author : </span> {item.writtenBy}
            </CardItem>
            <CardItem
              as="p"
              translateZ="20"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              <span className="text-black dark:text-white"> Approved By : </span> {item.approvedBy}
            </CardItem>
            <div className="flex justify-between items-center mt-5">
              <CardItem
                translateZ={10}
                as={Link}
                href={`/blogpost/${item.id}`}
                target="__blank"
                className="py-2 rounded-xl text-xs font-normal dark:text-white"
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
