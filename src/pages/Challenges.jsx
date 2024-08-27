import React from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import Toast from "../components/ui/Toast";
import NoData from "../components/ui/NoData";

export default function Challenges() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="p-3 md:p-4 lg:p-6">
        <PointsBanner />
        <ChallengesForYou />
      </div>
    </div>
  );
}

const PointsBanner = () => {
  return (
    <div className="relative mt-5 w-full max-w-screen-md p-8 mx-auto rounded-2xl  flex justify-between items-center text-zinc-800 bg-white border border-zinc-300 shadow-2xl shadow-zinc-100">
      <div className="flex flex-col justify-start items-start text-left gap-3">
        <h1 className="text-xl md:text-3xl font-semibold">LMS Assessments</h1>
        <p className="text-xs font-semibold text-zinc-500">
          Gain and earn points by completing <br></br>assessments
        </p>

        <div className="flex mt-3">
          <Link
            to="/students-previlege"
            className="p-2 rounded border border-zinc-200 text-xs font-medium text-zinc-700"
          >
            View Previlege
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-end text-right gap-3">
        <h1 className="text-7xl font-semibold text-emerald-600">0</h1>
        <p className="text-sm font-semibold text-zinc-500">Current Points</p>
      </div>

      <div className="hidden md:flex absolute -top-2 -left-10 -rotate-[30deg]">
        <div className="w-32 h-8 rounded-full border border-zinc-200 bg-white z-10 flex justify-center items-center gap-2">
          <p className="text-xs font-semibold">Happy Coding ! 🥳</p>
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <button className="text-xs p-2 text-zinc-600 border border-zinc-100 outline-none shadow-2xl shadow-zinc-300 rounded-md font-semibold flex items-start justify-center gap-2">
          <IoMdRefresh size={15} />
          Refresh
        </button>
      </div>
    </div>
  );
};

const PreviousChallenges = () => {
  const prevChallenges = [
    {
      title: "Development Mode",
      language: "HTML",
      status: "Completed",
      points: "10",
      date: "August 05, 2024",
    },
  ];
  return (
    <div className="mt-8 w-full max-w-screen-md mx-auto flex flex-col">
      <h1 className="text-sm font-semibold">
        Previous Assessments You've Done
      </h1>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
        {prevChallenges.map((challenge, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="mt-5 w-full h-[200px] border border-zinc-200 bg-zinc-100 grid place-items-center cursor-not-allowed withBg rounded-lg">
              <h1 className="text-xs font-medium text-white">
                {challenge.title}
              </h1>
            </div>
            <div className="w-full flex flex-col gap-1">
              <h1 className="text-sm font-semibold text-zinc-600">
                Language:{" "}
                <span className="px-2 rounded-full bg-orange-50 text-orange-700">
                  {challenge.language}
                </span>
              </h1>
              <h3 className="text-xs">
                Status:{" "}
                <span className="text-emerald-600 font-bold">
                  {challenge.status}
                </span>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const ChallengesForYou = () => {
  return (
    <div className="mt-8 w-full max-w-screen-md mx-auto flex flex-col space-y-6">
      <h1 className="text-sm font-semibold">Assessments For You</h1>

      <NoData
        icon="https://cdn-icons-png.flaticon.com/128/7486/7486760.png"
        text="No challenges have been added yet."
      />
    </div>
  );
};
