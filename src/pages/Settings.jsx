import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineCodeOff } from "react-icons/md";
import { Divider } from "@nextui-org/react";
import { useAuth } from "../hooks/AuthContext.tsx";
import supabase from "../config/supabaseClient.js";
export default function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen bg-white flex justify-center p-4 text-zinc-800"
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
  const [active, setActive] = useState(true);
  return (
    <div className="w-full border-r border-zinc-200 h-full p-6 flex flex-col gap-2">
      {/* Sidebar Content */}
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold text-zinc-800">My Settings</h1>
        <p className="text-zinc-700 text-xs font-medium">
          Manage your account information.
        </p>
      </div>

      <ul className="flex flex-col gap-4 mt-10 text-zinc-700 font-semibold text-sm">
        <li>
          <a href="/settings" className={active ? "text-emerald-700" : ""}>
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
    <div className="flex flex-col gap-2 px-5">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-zinc-800">
          Codecian Account Center
        </h1>
      </div>

      <div className="w-full mt-5 flex flex-col space-y-4">
        <h1 className="text-md font-semibold text-zinc-800">
          Profile Information
        </h1>
        <hr className="h-px mt-3 bg-zinc-200 border-0" />

        <div className="w-full flex items-center justify-between">
          <div className="basis-1/2 flex flex-col gap-2">
            <h1 className="text-md font-semibold text-zinc-800">
              Your Profile
            </h1>
            <p className="text-sm text-zinc-500">
              Customize and edit your profile information
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="self-end text-zinc-500 font-bold text-sm">Name</p>
            {userInfo && (
              <h1 className=" font-bold text-sm">{`${userInfo.first_name} ${userInfo.last_name}`}</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
