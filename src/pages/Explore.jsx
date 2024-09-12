import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Planet from "../assets/planet.png";
import { motion } from "framer-motion";

export default function Explore() {
  return (
    <div className="w-full h-screen bg-white space-y-16 relative">
      <Navbar />
      <Content />
      <div
        className="w-full max-w-screen-md h-[120px] grid place-items-center fixed left-1/2 bottom-0 transform -translate-x-1/2 bg-cover bg-center grayscale"
        style={{ backgroundImage: `url(${Planet})` }}
      ></div>
    </div>
  );
}

const Content = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col text-center text-zinc-200 relative">
      <div className="w-full flex flex-col justify-start items-center p-8">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none z-10 whitespace-pre-wrap text-zinc-700 text-4xl md:text-5xl font-medium"
        >
          Welcome to Learning Space
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-sm md:text-[16px]  text-zinc-600"
        >
          Turn your ideas into reality with HTML, CSS, and JavaScript 🚀
        </motion.p>

        <Link
          to="/student-dashboard"
          className="flex item-center justify-center gap-2 mt-20 self-center py-4 px-6 bg-gradient-to-br from-emerald-600 to-green-600 shadow-[-5px_5px_0px_black] hover:translate-y-[-4px] hover:shadow-[-8px_8px_0px_black] duration-300 outline-none text-white text-sm font-semibold "
        >
          Explore now
        </Link>

        {/* modal box */}
      </div>
    </div>
  );
};
