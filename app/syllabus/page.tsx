"use client";
import React from "react";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import useSWR from "swr";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

const BASE_URL = "http://130.51.120.58:8080/api/v1";


const syllabus = () => {
  // // http://130.51.120.58:8080/api/v1/read_syllabus
  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/read_syllabus`,
    fetcher
  );
  console.log(data);

  const dataEntry = data?.data.map((item:any) => ({
    title: item.topic_name,
    content: (
      <div>
        <ul>
          <HoverEffect
          className={"bg-white dark:bg-neutral-950"}
            items={item.sub_topics.map((subItem:any) => ({
              title: subItem.sub_topic_name,
              description: "",
              link: "",
            }))}
          />
        </ul>
      </div>
    ),
  }));

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <div className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10 pb-[80vh]">
        {/* <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
            <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
                Syllabus
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
                Here&apos;s the syllabus for the Bit2Byte Mission.
            </p>
            </div> */}

        <div className="relative max-w-7xl mx-auto pb-20">
          <Timeline data={dataEntry} />
        </div>
      </div>
    </div>
  );
};

export default syllabus;
