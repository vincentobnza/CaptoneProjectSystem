import Navbar from "../components/Navbar";
import { Divider, Skeleton } from "@nextui-org/react";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import RoomIcon from "../icons/classroom.png";
import AssessmentIcons from "../icons/assignment.png";
import ResourcesIcon from "../icons/books.png";


const SideBar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-60 flex items-center p-5">
      <div className="w-full h-[90vh] bg-zinc-800 p-6 overflow-y-auto rounded-lg border border-zinc-700">
        <Link
          to="/room"
          className="flex justify-start items-start mb-6 font-bold text-zinc-200 text-sm"
        >
          {"{ Codecian }"}
        </Link>
        <nav>
          <ul className="flex flex-col justify-start items-start mt-16 space-y-6 text-sm font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors duration-200"
              >
                <img src={RoomIcon} className="w-5 h-5 grayscale" alt="Room" />
                Room
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors duration-200"
              >
                <img
                  src={AssessmentIcons}
                  className="w-5 h-5 grayscale"
                  alt="Assessments"
                />
                Assessments
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors duration-200"
              >
                <img
                  src={ResourcesIcon}
                  className="w-5 h-5 grayscale"
                  alt="Resources"
                />
                Resources
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default function Room() {
  return (
    <div className="w-full min-h-screen bg-zinc-900 overflow-hidden text-zinc-400">
      <div className="flex">
        <SideBar />
        <div className="flex-1 ml-[17rem] p-6 overflow-y-auto h-screen">
          <div className="bg-zinc-900 min-h-full">
            <div className="w-full">
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-white mb-2">
                  Welcome Vincent 👋
                </h1>
                <p className="text-xs">
                  Manage and view all your room activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
