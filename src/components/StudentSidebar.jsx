import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { PiBooks } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { VscFileSubmodule } from "react-icons/vsc";
import { LuGamepad2 } from "react-icons/lu";
export default function StudentSidebar() {
  const location = useLocation();
  const items = [
    {
      name: "Dashboard",
      link: "/student-dashboard",
      icon: <MdOutlineSpaceDashboard />,
    },
    {
      name: "My Learnings",
      link: "/student-dashboard/learnings",
      icon: <PiBooks />,
    },
    {
      name: "School Modules",
      link: "/student-dashboard/school-modules",
      icon: <VscFileSubmodule />,
    },
    {
      name: "Play Game",
      link: "/play-game",
      icon: <LuGamepad2 />,
    },
  ];
  return (
    <div className="hidden md:flex w-64 h-full p-2">
      <ul className="w-full mt-10 flex flex-col gap-3">
        {items.map((item, id) => (
          <li key={id} className="w-full flex items-center gap-2">
            <a
              href={item.link}
              className={`w-full flex items-center text-sm font-bold gap-6 p-3 relative ${
                location.pathname === item.link
                  ? "bg-yellow-50  before:absolute before:-left-1 before:h-full before:w-[4px] font-black before:bg-yellow-700"
                  : ""
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
