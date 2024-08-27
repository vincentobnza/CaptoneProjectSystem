import React from "react";
import { Link } from "react-router-dom";
import { BsDatabase } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";
import LogOutModal from "./ui/LogOutModal";
import { useState } from "react";
import { HiOutlineTrophy } from "react-icons/hi2";
import { SiGoogleclassroom } from "react-icons/si";
import { AiTwotoneDashboard } from "react-icons/ai";
import Dashboard from "../icons/dashboard.png";
import Classroom from "../icons/classroom.png";
import Students from "../icons/students.png";
import Leaderboard from "../icons/leaderboard.png";
import RoomIcon from "../icons/room.png";
import { AnimatePresence, motion } from "framer-motion";
import AdminLogo from "../assets/adminlogo.png";

export default function Sidebar({ active }) {
  const [open, setOpen] = useState(false);
  const sidebarItems = [
    {
      item: "Dashboard",
      link: "/admin/dashboard",
      icon: Dashboard,
    },
    {
      item: "Rooms",
      link: "/admin/admin-create-classroom",
      icon: Classroom,
    },
    {
      item: "Archived Rooms",
      link: "/admin/archived-rooms",
      icon: RoomIcon,
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
    <div className="hidden fixed top-0 left-0 bg-white w-[240px] border-r border-zinc-100 h-full md:flex flex-col text-center p-5 z-[80] shadow-2xl shadow-zinc-100">
      <div className="w-[90%] self-center flex items-center justify-start gap-4">
        <img src={AdminLogo} className="w-8 self-center" />
        <h1 className="text-sm font-bold">Admin Panel</h1>
      </div>
      <ul className="flex flex-col gap-1 mt-[4rem]">
        {sidebarItems.map((item, index) => (
          <motion.li key={index}>
            <Link
              to={item.link}
              className={`p-3 flex justify-start items-center gap-3 text-xs text-zinc-800 hover:bg-zinc-50 font-semibold hover:text-zinc-600 ease-in duration-300 relative ${
                active === item.link
                  ? "bg-zinc-50 text-zinc-600 before:absolute before:-left-1 before:h-full before:w-[3px] before:bg-zinc-500"
                  : ""
              }`}
            >
              {active === item.link && (
                <div>
                  <img src={item.icon} className="size-6" />
                </div>
              )}
              {active !== item.link && (
                <div>
                  <img src={item.icon} className="size-6 grayscale" />
                </div>
              )}
              <div className="ml-2 font-bold">{item.item}</div>
            </Link>
          </motion.li>
        ))}
      </ul>
      {/* 
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 ">
        <ul className="w-full flex justify-center items-center flex-col relative">
          <div
            onClick={() => setOpen(!open)}
            className="w-full p-2 flex justify-center items-center gap-4 text-center text-xs font-semibold text-zinc-700  hover:text-emerald-700 hover:font-bold ease-in duration-300 cursor-pointer"
          >
            <RiLogoutCircleLine size={20} />
            Logout
          </div>
          <LogOutModal open={open} setOpen={setOpen} />
        </ul>
      </div> */}
    </div>
  );
}
