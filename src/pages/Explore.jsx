import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Planet from "../assets/planet.png";
import { motion } from "framer-motion";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Explore() {
  return (
    <div className="w-full h-screen bg-white space-y-6 relative">
      <Navbar />
      <Content />
      {/* <div
        className="w-full max-w-screen-md h-[120px] grid place-items-center fixed left-1/2 bottom-0 transform -translate-x-1/2 bg-cover bg-center grayscale"
        style={{ backgroundImage: `url(${Planet})` }}
      ></div> */}
    </div>
  );
}

const Content = () => {
  return (
    <section className="space-y-2 flex  w-full max-w-screen-xl mx-auto  justify-between items-center p-5">
      <div className="w-full max-w-screen-md mx-auto flex flex-col gap-2 justify-center items-center text-center sm:p-5 md:p-5 lg:p-0">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold py-2 px-4 border border-emerald-400 mb-4 rounded-full text-emerald-700 bg-emerald-50"
        >
          # Learn with Codecian
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none z-10 whitespace-pre-wrap text-zinc-800 text-4xl md:text-[62px] font-medium leading-none text-transparent font-Merriweather"
        >
          Welcome On Your Learning Space
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-md font-semibold text-zinc-700"
        >
          Start your journey with Codecian.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8"
        >
          <Link
            to="/student-dashboard"
            className="mt-8 flex items-center gap-2 font-semibold text-sm underline underline-offset-8  decoration-zinc-700 text-black font-Merriweather"
          >
            Explore Codecian Resources
            <MdOutlineArrowOutward size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
