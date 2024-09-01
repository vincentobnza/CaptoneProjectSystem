import React from "react";
import { motion } from "framer-motion";
import { MdOutlineCodeOff } from "react-icons/md";
import { Divider } from "@nextui-org/react";
import { useAuth } from "../hooks/AuthContext.tsx";
export default function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen bg-zinc-900 flex justify-center p-4 text-zinc-300"
    >
      <div className="flex w-full max-w-screen-lg relative">
        <div className="w-1/4 lg:w-1/5">
          <SideBar />
        </div>
        <div className="w-3/4 lg:w-4/5 h-full p-6">
          <Content />
        </div>
      </div>
    </motion.div>
  );
}

const SideBar = () => {
  const [active, setActive] = React.useState(true);
  return (
    <div className="w-full border-r border-zinc-800 h-full p-6 flex flex-col gap-2">
      {/* Sidebar Content */}
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold text-zinc-200">My Settings</h1>
        <p className="text-zinc-400 text-xs font-medium">
          Manage your account information.
        </p>
      </div>

      <ul className="flex flex-col gap-4 mt-10 text-zinc-300 font-semibold text-sm">
        <li>
          <a href="/settings" className={active ? "text-indigo-500" : ""}>
            Profile
          </a>
        </li>
        <li>
          <a href="/settings">Security</a>
        </li>
      </ul>
    </div>
  );
};

const Content = () => {
  const { user } = useAuth();

  console.log(user.app_metadata);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <MdOutlineCodeOff size={22} className="text-zinc-200" />
        <h1 className="text-lg font-bold text-zinc-200">
          Codecian Account Center
        </h1>
      </div>

      <div className="w-full mt-5 ml-9 flex flex-col space-y-4">
        <h1 className="text-sm font-semibold text-zinc-400">
          Profile Information
        </h1>
        <hr class="h-px mt-3 bg-zinc-800 border-0" />

        <div className="flex items-center justify-between">
          <h1 className="text-sm font-medium">Profile</h1>

          <div className="flex items-center gap-2">
            <img
              src="https://via.placeholder.com/150"
              alt="profile"
              className="w-10"
            />
            <h1>{user.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
