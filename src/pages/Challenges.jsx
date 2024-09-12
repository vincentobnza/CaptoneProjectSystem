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
import { MdLeaderboard } from "react-icons/md";
import { useAuth } from "../hooks/AuthContext";

export default function Challenges() {
  return (
    <div className="w-full min-h-screen text-zinc-700">
      <Navbar />
      <div className="p-3 md:p-4 lg:p-6">
        <PointsBanner />
        <Ranking />
      </div>
    </div>
  );
}

const PointsBanner = () => {
  const [points, setPoints] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPoints = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("profile")
            .select("points")
            .eq("id", user.id)
            .single();

          if (error) {
            console.error("Error fetching points:", error);
            return;
          }

          if (data) {
            setPoints(data.points || 0);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchPoints();
  }, [user]);

  return (
    <div className="w-full max-w-screen-md mx-auto p-10 flex justify-center  gap-4 bg-gradient-to-br from-zinc-800 to-gray-800 h-[200px] rounded-2xl shadow-2xl text-white shadow-zinc-200 relative overflow-hidden">
      <img
        src="https://cdn-icons-png.flaticon.com/128/1642/1642423.png"
        alt="pic"
        className="absolute left-0 bottom-0 w-28 opacity-30"
      />
      <div className="basis-1/2 flex items-start flex-col gap-2 z-10">
        <h1 className="text-2xl font-bold">Codecian Leaderboards</h1>
        <p className="text-sm text-zinc-400">Compete and see your rankings.</p>
      </div>

      <div className="basis-1/2 flex justify-end relative">
        <span className="absolute -top-6 -right-6 rounded-full px-2 bg-emerald-500/60 border border-emerald-500 text-white text-xs font-bold">
          pts
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="self-end text-6xl font-bold bg-gradient-to-br from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            {points}
          </h1>
          <p className="mt-5 text-zinc-300 text-sm font-medium">
            Current Points
          </p>
        </div>
      </div>
    </div>
  );
};

const Ranking = () => {
  const [rankingData, setRankingData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const { data, error } = await supabase
          .from("profile")
          .select("id, points, first_name")
          .order("points", { ascending: false, nullsLast: true });

        if (error) {
          console.error("Error fetching ranking data:", error);
          return;
        }

        if (data) {
          const updatedData = data
            .filter((user) => user.points !== null && user.points !== 0) // Remove users with null or 0 points
            .map((user, index) => ({
              ...user,
              points: user.points || 0,
              rank: index + 1,
            }));
          setRankingData(updatedData);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRankingData();
  }, []);

  const formatDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="w-full max-w-screen-md mx-auto p-8 rounded-2xl mt-5 flex flex-col gap-2 border border-zinc-200">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <GiDiamondTrophy size={20} className="text-zinc-700" />
          <h1 className="text-zinc-800 text-md font-bold">Codecian Ranking</h1>
        </div>
        <p className="text-xs font-semibold">{formatDate(lastUpdated)}</p>
      </div>

      {rankingData.length > 0 ? (
        <div className="mt-8 flex flex-col gap-2">
          {rankingData.map((user, index) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-3 relative ${
                index === 0
                  ? "bg-zinc-50"
                  : index % 2 === 0
                  ? "bg-zinc-50"
                  : "bg-white"
              } border border-zinc-200`}
            >
              {index === 0 && (
                <div className="absolute -left-3 -top-7 -rotate-[30deg] flex">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/707/707163.png"
                    alt="crown"
                    className="w-10"
                  />
                </div>
              )}
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-full border text-emerald-700 grid place-items-center font-black">
                  <h1>{user.rank}</h1>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold">{user.first_name}</h1>
                  {index === 0 && (
                    <p className="flex text-xs">Dev of the day 🤖</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="self-end text-xs font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full border border-emerald-200">
                  {user.points} Points
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grayscale">
          <NoData
            icon="https://cdn-icons-png.flaticon.com/128/4076/4076441.png"
            text="There are no users to show"
          />
        </div>
      )}
    </div>
  );
};
