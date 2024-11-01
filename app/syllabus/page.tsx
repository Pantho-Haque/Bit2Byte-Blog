'use client'
import React from 'react'
import Image from 'next/image'
import { Timeline } from '@/components/ui/timeline'
import { HoverEffect } from '@/components/ui/card-hover-effect';
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())

const BASE_URL = 'http://130.51.120.58:8080/api/v1' ;

const dataJson = {
    "data": [
      {
        "topicInfo": {
          "id": 1,
          "topicName": "C",
          "noOfSubTopics": 9,
          "serial": 1
        },
        "subtopicInfos": [
          {
            "id": 1,
            "topicInfo": {
              "id": 1,
              "topicName": "C",
              "noOfSubTopics": 9,
              "serial": 1
            },
            "subTopicName": "Introduction to C",
            "serial": 1
          },
          {
            "id": 2,
            "topicInfo": {
              "id": 1,
              "topicName": "C",
              "noOfSubTopics": 9,
              "serial": 1
            },
            "subTopicName": "Data types",
            "serial": 10
          }
        ]
      },
      {
        "topicInfo": {
          "id": 2,
          "topicName": "Java",
          "noOfSubTopics": 17,
          "serial": 10
        },
        "subtopicInfos": [
          {
            "id": 3,
            "topicInfo": {
              "id": 2,
              "topicName": "Java",
              "noOfSubTopics": 17,
              "serial": 10
            },
            "subTopicName": "Introduction",
            "serial": 1
          }
        ]
      },
      {
        "topicInfo": {
          "id": 3,
          "topicName": "JavaScript",
          "noOfSubTopics": 9,
          "serial": 20
        },
        "subtopicInfos": []
      }
    ],
    "message": "Operation successful"
  }

const syllabus = () => {
    // // http://130.51.120.58:8080/api/v1/read_syllabus
    const { data, error, isLoading } = useSWR(
        `${BASE_URL}/read_syllabus`,
        fetcher
      )
  console.log(data)

const dataEntry = dataJson.data.map(item => ({
    title: item.topicInfo.topicName,
    content: (
        <div>
            <ul>
                <HoverEffect items={item.subtopicInfos.map(subItem => ({
                    title: subItem.subTopicName,
                    description: '',
                    link: ''
                }))} />
            </ul>
        </div>
    )
}));



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
  )
}

export default syllabus