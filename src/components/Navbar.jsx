import React from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import Logo from "../icons/tab-icon.png";
import {
  useAuth,
  UserButton,
  SignUpButton,
  SignInButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const navItems = [
    { nav: "Home", link: "/", path: false },
    { nav: "Room", link: "/explore", path: true },
    { nav: "Assessments", link: "/qoutes", path: true },
    { nav: "Students Hub", link: "/community", path: true },
  ];

  const { isLoaded, isSignedIn } = useAuth();

  return (
    <nav className="bg-zinc-900 grid place-items-center p-5">
      <div className="w-full flex max-w-screen-lg mx-auto justify-between items-center relative">
        <Link
          to="/"
          className="flex justify-start items-center gap-6 font-bold text-zinc-200 text-sm"
        >
          {"{ Codecian }"}
        </Link>
        <ul className="hidden md:flex items-center gap-4 text-xs tracking-wide font-semibold bg-zinc-800/40 backdrop-blur-lg border border-zinc-700 text-zinc-400 py-2 px-6 rounded-lg  fixed top-3 left-1/2 transform -translate-x-1/2 z-50 shadow">
          {navItems.map((item, index) => (
            <li key={index} className="p-1 duration-500 hover:text-white ">
              {isSignedIn || item.path === false ? (
                <Link to={item.link} className="px-2 duration-400">
                  {item.nav}
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <a className="cursor-pointer">{item.nav}</a>
                </SignInButton>
              )}
            </li>
          ))}
        </ul>

        <div className="relative">
          <div className="hidden">
            <FiUser
              size={20}
              className="cursor-pointer text-zinc-500"
              onClick={() => setOpen(true)}
            />
          </div>
          {isLoaded && (
            <div className="flex items-center gap-2">
              {isSignedIn ? (
                <UserButton />
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="flex items-center gap-1 px-6 py-2  bg-violet-600 hover:bg-white hover:text-black rounded-full text-white transition ease-in-out duration-500 outline-none text-sm font-bold">
                      Login
                    </button>
                  </SignInButton>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
