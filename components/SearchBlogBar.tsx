"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export function SearchBlogBar() {
  const placeholders = [
    "C language",
    "Reac js",
    "Object Oriented Programming",
    "Data Structure and Algorithms",
    "Laravel",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-[20rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-5 sm:mb-10 text-xl text-center sm:text-5xl dark:text-white text-black">
        Bit2Byte Blogs
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
