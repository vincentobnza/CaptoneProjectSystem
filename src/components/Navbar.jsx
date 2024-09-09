import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.tsx";
import DefaultProfile from "../assets/default-profile.png";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { RiSettings6Line } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import { Switch } from "@nextui-org/react";
import { RiMoonClearFill } from "react-icons/ri";
import { IoIosSunny } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";

const Navbar = () => {
  const navItems = [
    { nav: "Home", link: "/", path: false },
    { nav: "Learning Space", link: "/explore", path: true },
    { nav: "Leaderboards", link: "/qoutes", path: true },
    { nav: "Students Hub", link: "/community", path: true },
    { nav: "Developers", link: "/developers", path: true },
  ];

  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <nav className="sticky top-0 left-0 w-full grid place-items-center bg-white border-b border-zinc-100 z-[60]">
      <div className="w-full flex max-w-screen-xl mx-auto justify-between items-center relative py-2 px-9 text-zinc-900">
        <Link
          to="/"
          className="flex justify-start items-center gap-6 font-semibold text-zinc-700 text-sm"
        >
          {"{ Codecian }"}
        </Link>
        <ul className="hidden md:flex items-center gap-2 text-[12px] tracking-wide py-2 px-6 text-xs  font-bold text-zinc-700">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="p-1 duration-500 hover:opacity-80 hover:text-emerald-600"
            >
              <Link to={item.link} className="px-2 duration-400">
                {item.nav}
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative">
          <div className="flex items-center gap-6">
            {user ? (
              // Profile Default is Cat hehehe
              <Dropdown placement="bottom-end" className="text-xs font-Manrope">
                <DropdownTrigger>
                  <div className="size-8 shadow-[-2px_2px_0px_black] hover:translate-y-[-4px] hover:shadow-[-4px_4px_0px_black] grid place-items-center border border-zinc-700 overflow-hidden cursor-pointer hover:opacity-70 duration-400 outline-none">
                    <img
                      src={DefaultProfile}
                      alt="default profile"
                      className="object-cover"
                    />
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-4">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user.email}</p>
                  </DropdownItem>
                  <DropdownItem
                    href="/settings"
                    key="settings"
                    startContent={
                      <RiSettings6Line size={18} className="text-zinc-400" />
                    }
                  >
                    My Settings
                  </DropdownItem>
                  <DropdownItem
                    key="feedback"
                    startContent={
                      <MdOutlineFeedback size={18} className="text-zinc-400" />
                    }
                  >
                    Send Feedback
                  </DropdownItem>
                  <DropdownItem
                    onClick={handleSignOut}
                    key="logout"
                    startContent={
                      <VscSignOut size={18} className="text-zinc-400" />
                    }
                  >
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 px-6 py-2 border border-zinc-400 text-zinc-900 transition ease-in-out duration-500 outline-none text-xs"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
