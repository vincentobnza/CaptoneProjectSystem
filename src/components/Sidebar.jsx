import React from "react";
import { Link } from "react-router-dom";

import { useState } from "react";
import Dashboard from "../icons/dashboard.png";
import Students from "../icons/students.png";
import Leaderboard from "../icons/leaderboard.png";
import { AnimatePresence, motion } from "framer-motion";
import AdminLogo from "../assets/adminlogo.png";

export default function Sidebar({ active }) {
  const sidebarItems = [
    {
      item: "Dashboard",
      link: "/admin/dashboard",
      icon: Dashboard,
    },

    {
      item: "Students",
      link: "/admin/manage-students",
      icon: Students,
    },

    {
      item: "Leaderboards",
      link: "/admin/leaderboards",
      icon: Leaderboard,
    },
  ];

  return (
    <div className="hidden fixed top-0 left-0 bg-white w-[240px] border-r border-zinc-100 h-full md:flex flex-col text-center p-5 z-[40] shadow-2xl shadow-zinc-100">
      <div className="w-[90%] self-center flex items-center justify-start gap-4">
        <img src={AdminLogo} className="w-8 self-center z-50" alt="logo" />
        <h1 className="text-sm font-medium">Admin Panel</h1>
      </div>
      <ul className="flex flex-col gap-1 mt-[4rem]">
        {sidebarItems.map((item, index) => (
          <motion.li key={index}>
            <Link
              to={item.link}
              className="p-3 flex flex-col  items-center gap-3 text-xs text-zinc-800 hover:bg-zinc-50 hover:text-zinc-600 ease-in duration-300 relative  font-semibold"
            >
              {active === item.link && (
                <div>
                  <img src={item.icon} className="size-6" alt="icons" />
                </div>
              )}
              {active !== item.link && (
                <div>
                  <img src={item.icon} className="size-6 grayscale" alt="" />
                </div>
              )}
              <div className="ml-2 ">{item.item}</div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
