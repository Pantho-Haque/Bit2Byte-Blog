import React from "react";
import Image from "next/image";
import { Activities, CarouselImage, TopicwiseCover } from "@/components/index";

export default function About() {
  const imageList = [
    "/images/about_page_image.jpg",
    "/images/bit2byte_with_hashem_sir.jpg",
    "/images/oldest_android_workshop_2019.jpg",
  ];
  const topics = [
    {
      title: "Coding Foundation",
      topicList: [
        {
          title: "C Programming",
          description:
            "Foundation of modern programming, known for efficiency and control over hardware.",
          icon: "https://img.icons8.com/?size=100&id=40670&format=png&color=6b7280",
        },
        {
          title: "Java",
          description:
            "A versatile language widely used in web, mobile, and enterprise applications.",
          icon: "https://img.icons8.com/?size=100&id=FRRACRKRsw2s&format=png&color=6b7280",
        },
        {
          title: "JavaScript",
          description:
            "The language of the web, enabling interactive and dynamic user experiences.",
          icon: "https://img.icons8.com/?size=100&id=PXTY4q2Sq2lG&format=png&color=6b7280",
        },
        {
          title: "Object-Oriented Programming (OOP)",
          description:
            "A programming paradigm that organizes code using objects and classes for better structure.",
          icon: "https://img.icons8.com/?size=100&id=D8fI0PGNpq8i&format=png&color=6b7280",
        },
        {
          title: "Data Structures & Algorithms (DSA)",
          description:
            "The core of problem-solving in programming, essential for efficient data handling.",
          icon: "https://img.icons8.com/?size=100&id=AJ0yU3DEYW2j&format=png&color=6b7280",
        },
      ],
    },
    {
      title: "Core Development Skills",
      topicList: [
        {
          title: "Git & GitHub",
          description:
            "Essential version control tools for collaboration and code management.",
          icon: "https://img.icons8.com/?size=100&id=20906&format=png&color=6b7280",
        },
        {
          title: "Design Patterns",
          description:
            "Reusable solutions to common problems in software design, improving code maintainability.",
          icon: "https://img.icons8.com/?size=100&id=6S1Y1c6uojWA&format=png&color=6b7280",
        },
        {
          title: "Debugging",
          description:
            "The art and science of identifying and resolving errors in code.",
          icon: "https://img.icons8.com/?size=100&id=TG3wNqGOHaIJ&format=png&color=6b7280",
        },
        {
          title: "Databases",
          description:
            "Systems for storing, managing, and retrieving data efficiently.",
          icon: "https://img.icons8.com/?size=100&id=11400&format=png&color=6b7280",
        },
      ],
    },
    {
      title: "Frontend Development",
      topicList: [
        {
          title: "React Js",
          description:
            "A powerful JavaScript library for building dynamic user interfaces.",
          icon: "https://img.icons8.com/?size=100&id=35989&format=png&color=6b7280",
        },
        {
          title: "Next.js",
          description:
            "A React framework for building server-rendered, optimized web applications.",
          icon: "https://img.icons8.com/?size=100&id=66746&format=png&color=6b7280",
        },
      ],
    },
    {
      title: "Mobile App Development",
      topicList: [
        {
          title: "Android Development",
          description:
            "Building mobile applications for the Android platform using Java and Kotlin.",
          icon: "https://img.icons8.com/?size=100&id=17836&format=png&color=6b7280",
        },
        {
          title: "Flutter",
          description:
            "A cross-platform toolkit for creating natively compiled applications for mobile, web, and desktop.",
          icon: "https://img.icons8.com/?size=100&id=7I3BjCqe9rjG&format=png&color=6b7280",
        },
      ],
    },
    {
      title: "Backend Development",
      topicList: [
        {
          title: "Laravel",
          description:
            "A PHP framework for building modern web applications with clean, elegant syntax.",
          icon: "https://img.icons8.com/?size=100&id=UG5EO81XNkPs&format=png&color=6b7280",
        },
        {
          title: "Spring Boot",
          description:
            "A Java framework for building robust and scalable backend applications.",
          icon: "https://img.icons8.com/?size=100&id=90519&format=png&color=6b7280",
        },
      ],
    },
  ];

  const testimonials = [
    {
      desc: "Engage in immersive, hands-on workshops designed to deepen core development skills across various technical topics.",
      title: "Development Workshops",
      icon:"https://img.icons8.com/?size=100&id=BdVRyWiLRC1L&format=png&color=6b7280"
    },
    {
      desc: "Build real-world projects that translate knowledge into practical experience, enhancing both skillsets and portfolios.",
      title: "Project-Based Learning",
      icon:"https://img.icons8.com/?size=100&id=104233&format=png&color=6b7280"
    },
    {
      desc: "Gain valuable insights from seasoned industry leaders, exploring the latest in tech advancements and career development.",
      title: "Guest Lectures",
      icon:"https://img.icons8.com/?size=100&id=lKbtBpeAl6AU&format=png&color=6b7280"
    },
    {
      desc: "Participate in focused training and preparation for hackathons and competitive events to sharpen skills and confidence.",
      title: "Hackathon Preparation",
      icon:"https://img.icons8.com/?size=100&id=wgH2Qk7mFnEl&format=png&color=6b7280"
    },
  ];

  return (
    <div className="min-h-screen p-8">
      {/* careousel portion*/}
      <div className="flex justify-between">
        <CarouselImage imageList={imageList} />
        <div className="align-left text-justify flex flex-col justify-center ">
          <p className="text-5xl font-extrabold mb-10">Bit2Byte</p>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-5">
            A software research and development club focused on building a
            community of skilled developers. We prepare our members to excel in
            hackathons, work on real-world projects, secure top jobs, and
            develop essential soft skills.
          </p>
        </div>
      </div>

      <TopicwiseCover topics={topics} />

      <Activities testimonials={testimonials} />
    </div>
  );
}
