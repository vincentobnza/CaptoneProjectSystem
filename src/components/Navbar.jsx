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
    { nav: "Learning Space", link: "/explore", path: true },
    { nav: "Assessments", link: "/qoutes", path: true },
    { nav: "Students Hub", link: "/community", path: true },
    { nav: "About Us", link: "/about", path: false },
    { nav: "Developers", link: "/team-developers", path: false },
  ];

  const { isLoaded, isSignedIn } = useAuth();

  return (
    <nav className="border-b border-zinc-100 bg-white grid place-items-center p-3 sticky top-0 left-0  z-30">
      <div className="w-full flex max-w-screen-xl mx-auto justify-between items-center relative">
        <Link
          to="/"
          className="flex justify-start items-center gap-2 font-bold"
        >
          <img src={Logo} className="w-8" />
          Code Brain
        </Link>
        <ul className="hidden md:flex items-center gap-1 text-xs font-bold text-zinc-700">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="p-2 rounded hover:bg-emerald-50 hover:text-emerald-600 duration-500"
            >
              {isSignedIn || item.path === false ? (
                <Link to={item.link} className="px-2  ">
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
                  <SignUpButton mode="modal">
                    <button className="p-3 text-zinc-600 hover:text-zinc-700 outline-none text-xs font-bold">
                      Sign up
                    </button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <button className="flex items-center gap-1 p-2  border rounded border-zinc-200 text-zinc-600 transition ease-in-out duration-300 outline-none text-xs font-bold">
                      <CiLogin size={20} />
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
