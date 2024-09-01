import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsLightning } from "react-icons/bs";
import Logo from "../components/Logo";
import supabase from "../config/supabaseClient";

export default function SetupProfile() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    section: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    console.log(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="w-full h-screen grid place-items-center p-8 md:p-5 text-zinc-200 bg-zinc-900"
    >
      <div className="w-full max-w-screen-md min-h-[75vh] mx-auto flex flex-col gap-2">
        <Logo size="12" textSize={"sm"} />
        <div className="mt-5 flex items-center gap-4 ">
          <h1 className="text-3xl font-bold">Setup your profile first.</h1>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-zinc-400">
            Please complete all the required fields below.
          </p>
        </div>

        <form className="mt-8 w-full grid grid-cols-2 gap-3">
          <div className="flex-col w-full">
            <label htmlFor="section" className="text-sm font-semibold">
              First name{" "}
              <span className="italic text-xs font-medium text-zinc-400">
                {"(Required)"}
              </span>
            </label>
            <input
              type="text"
              autoComplete="off"
              className="mt-2 w-full h-12 px-3 bg-zinc-800 border border-zinc-700 rounded placeholder:text-xs outline-none focus:ring-2 ring-indigo-600 duration-400"
              placeholder="First name"
              onChange={handleInputChange}
              required
              name="fname"
            />
          </div>
          <div className="flex-col w-full">
            <label htmlFor="section" className="text-sm font-semibold">
              Last name {""}
              <span className="italic text-xs font-medium text-zinc-400">
                {"(Required)"}
              </span>
            </label>
            <input
              autoComplete="off"
              type="text"
              className="mt-2 w-full h-12 px-3 bg-zinc-800 border border-zinc-700 rounded placeholder:text-xs outline-none focus:ring-2 ring-indigo-600 duration-400"
              placeholder="Last name"
              onChange={handleInputChange}
              required
              name="lname"
            />
          </div>
          <div className="flex-col w-full">
            <label htmlFor="section" className="text-sm font-semibold">
              Year Level {""}
              <span className="italic text-xs font-medium text-zinc-400">
                {"(Most Required)"}
              </span>
            </label>
            <input
              type="text"
              autoComplete="off"
              className="mt-2 w-full h-12 px-3 bg-zinc-800 border border-zinc-700 rounded placeholder:text-xs outline-none focus:ring-2 ring-indigo-600 duration-400"
              placeholder="Class section"
              onChange={handleInputChange}
              required
              section="Year level"
            />
          </div>
          <div className="flex-col w-full">
            <label htmlFor="section" className="text-sm font-semibold">
              Section {""}
              <span className="italic text-xs font-medium text-zinc-400">
                {"(Most Required)"}
              </span>
            </label>
            <input
              type="text"
              autoComplete="off"
              className="mt-2 w-full h-12 px-3 bg-zinc-800 border border-zinc-700 rounded placeholder:text-xs outline-none focus:ring-2 ring-indigo-600 duration-400"
              placeholder="Class section"
              onChange={handleInputChange}
              required
              section="section"
            />
          </div>
        </form>

        <button
          type="submit"
          className="mt-12 self-end bg-white text-black text-sm font-bold px-6 py-2 rounded outline-none"
        >
          Save
        </button>
      </div>
    </motion.div>
  );
}
