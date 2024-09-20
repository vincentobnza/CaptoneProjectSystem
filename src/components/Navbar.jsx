import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.tsx";
import DefaultProfile from "../assets/default-profile.png";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { RiSettings6Line } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import { Switch } from "@nextui-org/react";
import { RiMoonClearFill } from "react-icons/ri";
import { IoIosSunny } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import { RxCaretDown } from "react-icons/rx";
import { MdOutlineArrowOutward } from "react-icons/md";

const Navbar = () => {
  const { user, signOut } = useAuth();

  console.log(user);

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <nav className="sticky top-0 left-0 w-full grid place-items-center bg-white z-[60] p-2">
      <div className="w-full flex max-w-screen-xl mx-auto justify-between items-center relative py-2 px-9 text-zinc-900">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex justify-start items-center gap-6 font-semibold text-black text-sm"
          >
            {"{ Codecian }"}
          </Link>
          <ul className="hidden md:flex items-center gap-2 text-[12px] tracking-wide py-2 px-6 text-xs text-zinc-950 font-semibold">
            <li className="p-1 duration-500 hover:opacity-80 hover:text-emerald-600">
              <Link to="/" className="px-2 duration-400">
                Home
              </Link>
            </li>
            <li className="p-1 duration-500 hover:opacity-80 hover:text-emerald-600">
              <Link
                to="/explore"
                className="px-2 duration-400 flex items-center gap-2"
              >
                Explore
              </Link>
            </li>
            <li className="p-1 duration-500 hover:opacity-80 hover:text-emerald-600">
              <Link to="/qoutes" className="px-2 duration-400">
                Leaderboards
              </Link>
            </li>
            <li className="p-1 duration-500 hover:opacity-80 hover:text-emerald-600">
              <Link to="/developers" className="px-2 duration-400 relative">
                Developers
                <div className="absolute top-0 -right-3">
                  <MdOutlineArrowOutward />
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="flex items-center gap-6">
            {user ? (
              // Profile Default is Cat hehehe
              <Dropdown placement="bottom-end" className="text-xs font-sans">
                <DropdownTrigger>
                  <div className="flex items-center gap-4">
                    <h1 className="font-bold text-xs">{user.email}</h1>
                    <div className="size-12 grid place-items-center cursor-pointer border border-zinc-100 rounded-full overflow-hidden">
                      <img
                        src={
                          user.user_metadata.avatar_url || "default_profile_url"
                        }
                        alt="default profile"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-4">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user.user_metadata.name}</p>
                  </DropdownItem>
                  <DropdownItem href="/settings" key="settings">
                    My Settings
                  </DropdownItem>
                  <DropdownItem key="feedback">Send Feedback</DropdownItem>

                  <DropdownItem key="signout" onClick={handleSignOut}>
                    Signout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 px-8 py-3 bg-zinc-900 text-white rounded-full transition ease-in-out duration-500 outline-none text-xs tracking-wide font-semibold"
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
