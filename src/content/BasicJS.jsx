import React from "react";
import Navbar from "../components/Navbar";
import { CircularProgress } from "@nextui-org/react";
import { IoMdCheckboxOutline } from "react-icons/io";
import OutlineImage from "../assets/outline-js.png";
import { useState } from "react";
import Loading from "../components/ui/Loading";
export default function BasicJS() {
  return (
    <div className="w-full space-y-16 mb-10 p-5 md:p-0">
      <Navbar />
      <Header />
      <CourseOutline />
    </div>
  );
}

const Header = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="w-full flex gap-4">
        <div className="basis-1/2 flex flex-col gap-6">
          <h1 className="text-5xl font-black">
            Learn the basics of JavaScript{" "}
          </h1>
          <p className="text-md font-semibold text-zinc-600">
            Learn the basics of JavaScript to add interactivity and dynamic
            behavior to your web pages.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-10 self-start gap-4 py-3 px-10 bg-yellow-300 border border-black text-black text-sm font-bold shadow-[-4px_4px_0px_black] hover:translate-y-[-4px] hover:shadow-[-6px_6px_0px_black] duration-300 outline-none"
          >
            Get Started
          </button>
        </div>

        <div className="basis-1/2 flex justify-end items-center">
          <ProgressCard />
        </div>
      </div>
    </div>
  );
};

const ProgressCard = () => {
  const [progress, setProgress] = useState(10);
  return (
    <div className="size-[280px] bg-yellow-100 border border-black text-black shadow-[-8px_8px_0px_black] grid place-items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-sm font-black">Learning Progress</h1>
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-yellow-500",
            track: "stroke-black",
            value: "text-3xl font-black text-black",
          }}
          value={progress}
          strokeWidth={4}
          showValueLabel={true}
        />

        <div className="self-center w-full px-3 py-2 border border-dashed border-black grid place-items-center">
          <h1 className="text-xs font-bold">Keep Learning! 🐈</h1>
        </div>
      </div>
    </div>
  );
};

const CourseOutline = () => {
  const outline = [
    "So what is JavaScript",
    "A Hello world! example",
    "Language Basics crash course",
    "Supercharging your example website",
    "Conclusion",
  ];
  return (
    <div className="w-full max-w-screen-lg mx-auto p-5 border-2 border-dashed border-zinc-700 bg-zinc-50 relative">
      <div className="absolute top-2 right-2 size-10  border border-zinc-700 grid place-items-center shadow-[-4px_4px_0px_black]">
        <IoMdCheckboxOutline className="text-zinc-900" size={25} />
      </div>

      <img
        src={OutlineImage}
        alt=""
        className="w-60 absolute right-0 bottom-0 "
      />
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-black">Learning Outline</h1>
          <p className="text-sm font-medium">
            Introduction to HTML structure, elements, attributes, and basic tags
            usage.
          </p>
        </div>

        <ul className="mt-8 flex flex-col gap-4">
          {outline.map((item, idx) => (
            <li
              key={idx}
              className="list-inside list-disc font-bold underline underline-offset-4"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
