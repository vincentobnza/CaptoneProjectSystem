import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { PiBooks } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { VscFileSubmodule } from "react-icons/vsc";
import { LuGamepad2 } from "react-icons/lu";
import { Link } from "react-router-dom";
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
      name: "Play Game",
      link: "/play-game",
      icon: <LuGamepad2 />,
    },
    {
      name: "Code Playground",
      link: "/play-game",
      icon: <LuGamepad2 />,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-64 h-screen p-2 bg-white border border-zinc-200">
      <ul className="w-full h-[85vh] mt-[5.5rem] flex flex-col gap-3 p-3 relative">
        {items.map((item, id) => (
          <li key={id} className="w-full flex items-center gap-2">
            <Link
              to={item.link}
              className={`w-full flex items-center text-xs font-semibold gap-6 p-3 relative ${
                location.pathname === item.link
                  ? "bg-zinc-50 before:absolute before:-left-1 before:h-full before:w-[4px] font-black before:bg-zinc-500"
                  : ""
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* <div className="absolute left-0 bottom-0 w-full p-2">
        <div className="w-full h-[220px] border border-zinc-200 text-black rounded-lg flex flex-col gap-2 p-4">
          <h1 className="text-xs font-semibold">Overall Learning Progress</h1>
        </div>
      </div> */}
    </div>
  );
}
