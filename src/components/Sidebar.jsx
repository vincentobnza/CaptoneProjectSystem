import React from "react";
import { Link } from "react-router-dom";

import { useState } from "react";
import Dashboard from "../icons/dashboard.png";
import Students from "../icons/students.png";
import Leaderboard from "../icons/leaderboard.png";
import { AnimatePresence, motion } from "framer-motion";
import AdminLogo from "../assets/adminlogo.png";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineLeaderboard } from "react-icons/md";
import { RiProgress3Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
export default function Sidebar({ active }) {
  const sidebarItems = [
    {
      item: "Dashboard",
      link: "/admin/dashboard",
      icon: MdOutlineSpaceDashboard,
    },

    {
      item: "Users",
      link: "/admin/manage-users",
      icon: FiUsers,
    },

    {
      item: "User's Progress",
      link: "/admin/students-progress",
      icon: RiProgress3Line,
    },

    {
      item: "Leaderboards",
      link: "/admin/leaderboards",
      icon: MdOutlineLeaderboard,
    },
  ];

  return (
    <div className="hidden fixed top-0 left-0 bg-white w-[240px] border-r border-zinc-100 h-full md:flex flex-col text-center p-5 z-[40] shadow-2xl shadow-zinc-100">
      <div className="w-[90%] self-center flex items-center justify-start gap-4">
        <img src={AdminLogo} className="w-8 self-center z-50" alt="logo" />
        <h1 className="text-sm font-medium">Admin Panel</h1>
      </div>
      <ul className="flex flex-col gap-1 mt-[4rem]">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.li key={index}>
              <Link
                to={item.link}
                className="p-3 flex items-center gap-3 text-sm text-zinc-800 hover:bg-zinc-50 hover:text-zinc-600 ease-in duration-300 relative  font-medium"
              >
                {active === item.link && (
                  <div>
                    <Icon size={20} />
                  </div>
                )}
                {active !== item.link && (
                  <div>
                    <Icon size={20} />
                  </div>
                )}
                <div className="ml-2 ">{item.item}</div>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
