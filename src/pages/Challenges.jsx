import React from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import Toast from "../components/ui/Toast";
import NoData from "../components/ui/NoData";
import { GiDiamondTrophy } from "react-icons/gi";

export default function Challenges() {
  return (
    <div className="w-full min-h-screen bg-zinc-900 text-zinc-400">
      <Navbar />
      <div className="p-3 md:p-4 lg:p-6">
        <PointsBanner />
        <Ranking />
      </div>
    </div>
  );
}

const PointsBanner = () => {
  return (
    <div className="max-w-screen-md mx-auto p-2 md:p-4 lg:p-6 flex flex-col justify-center items-center text-center gap-4">
      <img
        src="https://cdn-icons-png.flaticon.com/128/11167/11167978.png"
        alt="award"
        className="w-32"
      />

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-zinc-200">
          Codecian Leaderboards
        </h1>
        <p className="text-xs">Compete and see your ranking 💥</p>
      </div>
      <div className="flex flex-col gap-4">
        {/* Points */}

        <h1 className="font-black text-4xl text-orange-500">0</h1>
        <p className="text-sm font-bold text-zinc-200">Current Points</p>
      </div>
    </div>
  );
};

const Ranking = () => {
  return (
    <div className="w-full max-w-screen-md mx-auto p-8 rounded-2xl mt-5 flex flex-col gap-2 bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <GiDiamondTrophy size={20} className="text-yellow-600" />
          <h1 className="text-zinc-200 text-md font-bold">Codecian Ranking</h1>
        </div>
        <p className="text-xs font-semibold">Updated a few seconds ago</p>
      </div>

      <div className="grayscale">
        <NoData
          icon="https://cdn-icons-png.flaticon.com/128/4076/4076441.png"
          text="There are no players to show"
        />
      </div>
    </div>
  );
};
