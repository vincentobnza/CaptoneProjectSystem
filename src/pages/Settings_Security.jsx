import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineCodeOff } from "react-icons/md";
import { Divider } from "@nextui-org/react";
import { useAuth } from "../hooks/AuthContext.tsx";
import supabase from "../config/supabaseClient.js";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function Settings_Security() {
  return (
    <div className="w-full h-screen bg-white flex justify-center p-8 text-zinc-800">
      <div className="flex w-full max-w-screen-lg relative gap-6">
        <div className="w-1/4 lg:w-1/5">
          <SideBar />
        </div>
        <div className="border border-zinc-200 rounded-2xl w-3/4 lg:w-4/5 h-full p-6">
          <Content />
        </div>
      </div>
    </div>
  );
}

const SideBar = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="w-full border border-zinc-200 h-[400px] rounded-2xl p-6 flex flex-col gap-2 shadow-2xl shadow-zinc-100">
      {/* Sidebar Content */}
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-medium text-zinc-800">My Settings</h1>
        <hr className="h-px mt-3 bg-zinc-200 border-0 " />
      </div>

      <ul className="flex flex-col gap-4 mt-10 text-zinc-700 text-sm">
        <li>
          <Link to="/settings">Profile</Link>
        </li>
        <li>
          <Link
            to="/settings/security"
            className={active ? "text-emerald-500" : ""}
          >
            Security
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Content = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInformation = async () => {
      if (user && user.id) {
        try {
          const { data, error } = await supabase
            .from("profile")
            .select("first_name, last_name")
            .eq("id", user.id)
            .single();

          if (error) throw error;
          setUserInfo(data);
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      }
    };

    fetchUserInformation();
  }, [user]);

  return (
    <div className="flex flex-col gap-2 px-5 ">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-medium text-zinc-800">
          Codecian Account Center
        </h1>
      </div>

      <div className="w-full mt-5 flex flex-col space-y-6">
        <h1 className="text-sm font-medium text-zinc-800">Profile Security</h1>
        <hr className="h-px mt-3 bg-zinc-200 border-0" />

        <div className="w-full flex">
          <div className="w-full flex flex-col items-start gap-2">
            <p className="text-zinc-500 font-medium text-sm">Email Address</p>
            <input
              type="text"
              className="w-full border-b border-zinc-300 p-3 bg-zinc-50 text-zinc-400 mb-3 outline-none focus:border-b-2 focus:border-emerald-500"
              value={user.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
