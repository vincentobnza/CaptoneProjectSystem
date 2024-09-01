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

const Navbar = () => {
  const navItems = [
    { nav: "Home", link: "/", path: false },
    { nav: "Room", link: "/explore", path: true },
    { nav: "Leaderboards", link: "/qoutes", path: true },
    { nav: "Students Hub", link: "/community", path: true },
  ];

  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <nav className="bg-zinc-900 grid place-items-center p-5">
      <div className="w-full flex max-w-screen-lg mx-auto justify-between items-center relative">
        <Link
          to="/"
          className="flex justify-start items-center gap-6 font-bold text-zinc-200 text-sm"
        >
          {"{ Codecian }"}
        </Link>
        <ul className="hidden md:flex items-center gap-4 text-xs tracking-wide font-semibold bg-zinc-800/40 backdrop-blur-lg border border-zinc-700 text-zinc-400 py-2 px-6 rounded-lg fixed top-4 left-1/2 transform -translate-x-1/2 z-50 shadow">
          {navItems.map((item, index) => (
            <li key={index} className="p-1 duration-500 hover:text-white">
              <Link to={item.link} className="px-2 duration-400">
                {item.nav}
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative">
          <div className="flex items-center gap-2">
            {user ? (
              // Profile Default is Cat hehehe
              <Dropdown
                placement="bottom-end"
                className="text-zinc-300 font-SpaceGrotesk text-xs font-bold p-2 border border-zinc-800"
              >
                <DropdownTrigger>
                  <div className="size-10 rounded-full grid place-items-center border border-zinc-700 overflow-hidden cursor-pointer hover:opacity-70 duration-400">
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
                className="flex items-center gap-1 px-6 py-2 bg-gradient-to-br from-zinc-100 to-zinc-200 hover:bg-white hover:opacity-60 rounded-lg text-black transition ease-in-out duration-500 outline-none text-sm font-bold"
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
