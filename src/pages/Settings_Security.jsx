import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineCodeOff } from "react-icons/md";
import { Divider } from "@nextui-org/react";
import { useAuth } from "../hooks/AuthContext.tsx";
import supabase from "../config/supabaseClient.js";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function Settings_Security() {
  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow p-8 text-zinc-800 space-y-8">
        <div className="flex w-full mx-auto max-w-screen-lg relative gap-6">
          <div className="w-1/4 lg:w-1/5">
            <SideBar />
          </div>
          <div className="w-3/4 lg:w-4/5 h-full p-6">
            <Content />
          </div>
        </div>
      </main>
    </div>
  );
}

const SideBar = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="w-full rounded-2xl p-6 flex flex-col gap-2">
      {/* Sidebar Content */}
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-medium text-zinc-900">General Settings</h1>
        <hr className="h-px mt-3 bg-zinc-200 border-0 " />
      </div>

      <ul className="flex flex-col gap-4 mt-10 text-zinc-700 text-sm font-semibold">
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
            .select(", username, first_name, last_name")
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
        <h1 className="text-xl font-medium text-zinc-800">
          Codecian Account Center
        </h1>
      </div>

      <div className="w-full mt-5 flex flex-col space-y-6">
        <h1 className="text-sm font-medium text-zinc-800">Profile Security</h1>
        <hr className="h-px mt-3 bg-zinc-200 border-0" />

        <div className="w-full flex justify-between">
          <div className="basis-full flex flex-col items-start gap-2">
            <p className="text-zinc-800 font-medium text-sm">
              Email Address
              <span className="italic text-red-400 font-black">*</span>
            </p>
            <input
              type="text"
              className="w-full border border-zinc-200 rounded-lg p-3 text-zinc-700 mb-5 outline-none hover:border hover:border-zinc-400 duration-700 transition-all ease-in-out"
              value={user.email}
            />

            <button
              disabled={true}
              className="mt-8 self-end py-3 px-4 rounded-lg bg-emerald-500 text-white text-sm font-medium disabled:bg-zinc-300 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
