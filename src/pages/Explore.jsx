import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Planet from "../assets/planet.png";
import supabase from "../config/supabaseClient";
import { Select, SelectItem } from "@nextui-org/react";
import { HiOutlineSelector } from "react-icons/hi";
import { useParams } from "react-router-dom";

export default function Explore() {
  return (
    <div className="w-full h-screen bg-zinc-900 space-y-16 relative">
      <Navbar />
      <Content />
      <div
        className="w-full max-w-screen-md h-[120px] grid place-items-center fixed left-1/2 bottom-0 transform -translate-x-1/2 bg-cover bg-center grayscale"
        style={{ backgroundImage: `url(${Planet})` }}
      ></div>
    </div>
  );
}

const Content = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col text-center text-zinc-200 relative">
      <div className="w-full flex flex-col justify-start items-center p-8">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-4xl md:text-6xl font-bold leading-none tracking-tighter text-transparent"
        >
          Welcome to Room Space
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-sm md:text-[16px] font-medium text-zinc-400"
        >
          Turn your ideas into reality with JavaScript 🚀
        </motion.p>

        <button
          onClick={() => setOpen(true)}
          className="flex item-center justify-center gap-2 mt-20 self-center py-4 px-6 rounded-full bg-gradient-to-br from-white to-zinc-400 text-black text-md font-semibold "
        >
          Join a room
          <IoMdAdd size={20} />
        </button>

        {/* modal box */}
        <ModalBox open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

const ModalBox = ({ open, setOpen }) => {
  const [classCode, setClassCode] = useState("");
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [section, setSection] = useState("");

  const { id } = useParams();

  useEffect(() => {
    setDisable(!(name && yearLevel && section && classCode.length >= 6));
  }, [name, yearLevel, section, classCode]);

  const handleInputChange = (event) => setClassCode(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleSectionChange = (event) => setSection(event.target.value);
  const handleYearLevelChange = (event) => setYearLevel(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase
        .from("classrooms")
        .select("*")
        .eq("class_code", classCode)
        .single();

      if (error) {
        console.error(error);
        setError("Class code does not exist");
        return;
      }

      alert("Classroom joined successfully");
      navigate(`/room/${data.id}`);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    }

    try {
      const { data, error } = await supabase.from("students").insert([
        {
          complete_name: name,
          year_level: yearLevel,
          section: section,
          class_code: classCode,
        },
      ]);

      if (error) {
        console.error(error);
        setError("Failed to join the classroom. Please try again.");
      }

      if (data) {
        console.log("Successfully joined the classroom:", data);
      }
    } catch (err) {
      console.error("Unexpected error during insertion:", err);
      setError("Failed to join the classroom. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed top-0 left-0 inset-0 bg-slate-900/30 backdrop-blur grid place-items-center z-[90] p-5 text-zinc-400"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md p-8 bg-zinc-800 border border-zinc-700 rounded-xl flex flex-col justify-start text-left gap-1 overflow-y-auto relative"
          >
            <h1 className="text-2xl font-bold text-zinc-50">Join room</h1>
            <p className="text-sm font-medium">
              Request the room code from your instructor and enter it here.
            </p>

            <form
              className="mt-8 flex flex-col justify-start items-start gap-2"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="w-full h-14 border border-zinc-600 bg-zinc-800 rounded-xl focus:outline-none focus:ring-2 ring-indigo-600  px-4 placeholder:text-sm placeholder:font-medium transition duration-300 font-bold"
                placeholder="Room code"
                onChange={handleInputChange}
                required
                value={classCode}
              />
              {error && (
                <p className="mt-2 ml-1 text-red-500 text-sm font-semibold">
                  {error}
                </p>
              )}
              <Button className="mt-3 bg-indigo-600 text-white" type="submit">
                Enter
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
