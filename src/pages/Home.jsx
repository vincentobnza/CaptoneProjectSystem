"use client";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { SignedIn, useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { SignInButton } from "@clerk/clerk-react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { BsFillLightningFill } from "react-icons/bs";
import { FaBullseye } from "react-icons/fa";
import Cube from "../assets/cube.png";
import { FaBoltLightning } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { FiBatteryCharging, FiWifi } from "react-icons/fi";
import { IoLogoJavascript } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-zinc-900 w-full space-y-16 text-zinc-400 pb-10">
      <Navbar />
      <Hero />
      <Content />
    </div>
  );
}

const Hero = () => {
  return (
    <div className="space-y-2 flex  w-full max-w-screen-lg mx-auto  justify-between items-center sm:p-5 md:p-5 lg:p-0">
      <div className="flex basis-full md:basis-3/4 flex-col gap-2 justify-start items-start text-left sm:p-5 md:p-5 lg:p-0">
        <h1 className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-4xl md:text-6xl font-bold leading-none tracking-tighter text-transparent">
          Accelerate Your IT Journey to JavaScript Mastery
        </h1>
        <p className="mt-8 text-md font-medium">
          Enhance your expertise with interactive challenges and hands-on
          JavaScript projects.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="relative self-start text-xl font-black bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent outline-none hover:text-white duration-500 ease-in-out"
          >
            {"{Start Learning Today}"}
          </Link>
        </div>
      </div>

      <div className="hidden md:flex basis-1/2 justify-end items-end">
        <FloatingPhone />
      </div>
    </div>
  );
};

const FloatingPhone = () => {
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateY(-30deg) rotateX(15deg)",
      }}
      className="rounded-[24px] bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#481283]"
    >
      <motion.div
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-8px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
        className="relative h-[26rem] w-[16rem] rounded-[24px] border-2 border-b-4 border-r-4 border-zinc-500 border-l-neutral-800 border-t-neutral-700 bg-zinc-800 backdrop-blur p-1 pl-[3px] pt-[3px]"
      >
        <HeaderBar />
        <Screen />
      </motion.div>
    </div>
  );
};

const HeaderBar = () => {
  return (
    <>
      <div className="absolute left-[50%] top-2.5 z-10 h-2 w-16 -translate-x-[50%] rounded-md bg-neutral-6  00 border border-zinc-600 bg-black"></div>
      <div className="absolute right-3 top-2 z-10 flex gap-2">
        <FiWifi className="text-white" />
        <FiBatteryCharging className="text-green-400" />
      </div>
    </>
  );
};

const Screen = () => {
  return (
    <div className="relative z-0 grid h-full w-full place-content-center overflow-hidden rounded-[20px] bg-zinc-900">
      {/* Example logo from logoispum */}
      <h1 className="text-5xl font-black  bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-300 bg-clip-text text-transparent outline-none">
        {"{< / >}"}
      </h1>

      <button className="absolute bottom-4 left-4 right-4 z-10 rounded-lg bg-white py-2 text-xs font-bold text-black outline-none">
        Get Started
      </button>

      {/* <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-violet-500" /> */}
      <div className="absolute -bottom-72 left-[50%] h-96 w-96 -translate-x-[50%] rounded-full bg-gradient-to-br from-neutral-500 to-black" />
    </div>
  );
};

const Content = () => {
  return (
    <section className="w-full space-y-6 max-w-screen-lg mx-auto">
      <div className="max-w-2xl w-full flex flex-col gap-2">
        <h3 className="text-xl font-black text-indigo-400">
          {"{ For OMSC IT Developers 👨🏻‍💻}"}
        </h3>
        <h1 className="text-5xl text-white font-black leading-snug">
          Enjoy completing challenges like this 🎉
        </h1>
      </div>
      <Box />

      <div className="flex justify-end pr-5">
        <button className="flex items-center gap-2 text-white text-sm font-black outline-none">
          ✨ Try it now <FaLongArrowAltRight size={15} />
        </button>
      </div>
    </section>
  );
};

const Box = () => {
  const List = [
    {
      id: 1,
      title: "Calculator App",
      description: "Description is under construction.",
      icon: "https://cdn-icons-png.flaticon.com/128/891/891175.png",
    },
    {
      id: 2,
      title: "Factorial",
      description: "Description is under construction.",
      icon: "https://cdn-icons-png.flaticon.com/128/2249/2249488.png",
    },
    {
      id: 3,
      title: "Generate a Random Number within a Range",
      description: "Description is under construction.",
      icon: "https://cdn-icons-png.flaticon.com/128/1055/1055804.png",
    },
    {
      id: 4,
      title: "Palindrome Checker",
      description: "Description is under construction.",
      icon: "https://cdn-icons-png.flaticon.com/128/12123/12123688.png",
    },
    {
      id: 5,
      title: "To Do App",
      description: "Description is under construction.",
      icon: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
    },
    {
      id: 6,
      title: "Weather App",
      description: "Description is under construction.",
      icon: "https://cdn-icons-png.flaticon.com/128/1146/1146869.png",
    },
    {
      id: 7,
      title: "Random Quote Generator",
      description: "Description is under construction.",
      icon: "https://cdn-icons-png.flaticon.com/128/14753/14753811.png",
    },
    {
      id: 8,
      title: "Countdown Timer",
      description: "Description is under construction.",
      icon: "https://cdn-icons-png.flaticon.com/128/850/850960.png",
    },
    {
      id: 9,
      title: "Light and Dark Mode Toggle",
      description: "Description is under construction.",
      icon: "https://cdn-icons-png.flaticon.com/128/5549/5549898.png",
    },
  ];
  return (
    <div className="w-full p-5 max-w-screen-2xl mx-auto rounded-2xl bg-gradient-to-br from-purple-800 via-pink-800 to-indigo-700 flex flex-col gap-2">
      <div className="w-full grid md:grid-cols-3 grid-cols-2 gap-4">
        {List.map((item) => (
          <div
            key={item.id}
            className="w-full h-[140px] p-6 flex flex-col gap-2 rounded-xl bg-zinc-950/40 backdrop-blur relative overflow-hidden group cursor-grab"
          >
            <h1 className="text-xl font-black text-white">{item.title}</h1>
            <p className="text-xs font-medium">{item.description}</p>

            <img
              src={item.icon}
              className="w-30 absolute -right-10 -bottom-10 opacity-40 group-hover:scale-125 duration-500 "
            />
          </div>
        ))}
      </div>
    </div>
  );
};
