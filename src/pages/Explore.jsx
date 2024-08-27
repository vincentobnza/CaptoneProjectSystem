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

export default function Explore() {
  return (
    <div className="w-full h-screen space-y-16 relative">
      <Navbar />
      <Content />
      <div
        className="w-full max-w-screen-md h-[120px] grid place-items-center fixed left-1/2 bottom-0 transform -translate-x-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${Planet})` }}
      ></div>
    </div>
  );
}

const Content = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col text-center text-zinc-700 relative">
      <div className="w-full flex flex-col justify-start items-center p-8">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome To Your Learning Space
        </h1>
        <p className="mt-6 text-sm md:text-lg font-semibold text-zinc-700">
          Turn your ideas into reality with HTML, CSS, and JavaScript
        </p>

        <button
          onClick={() => setOpen(true)}
          className="flex item-center justify-center gap-2 mt-20 self-center py-4 px-6 rounded-full bg-emerald-500 text-white text-md font-semibold shadow-2xl shadow-zinc-200"
        >
          Join a class
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
      navigate(`/classroom`);
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
          className="fixed top-0 left-0 inset-0 bg-slate-900/30 backdrop-blur grid place-items-center z-[90] p-5 text-zinc-700"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg p-8 bg-white rounded-xl flex flex-col justify-start text-left gap-1 overflow-y-auto relative"
          >
            <h1 className="text-2xl font-bold">Join class</h1>
            <p className="text-sm font-medium">
              Request the class code from your instructor and enter it here.
            </p>

            <form
              className="mt-8 flex flex-col justify-start items-start gap-2"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="w-full h-14 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 ring-emerald-400  px-2 placeholder:text-sm placeholder:font-medium transition duration-300 font-bold"
                placeholder="Your complete name"
                onChange={handleNameChange}
                required
                value={name}
              />
              <div className="w-full grid md:grid-cols-2 gap-1">
                <Select
                  label="Select year level"
                  className="w-full"
                  variant="bordered"
                  selectorIcon={<HiOutlineSelector />}
                  onChange={handleYearLevelChange}
                  selectedKeys={[yearLevel]}
                  required
                >
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                </Select>
                <input
                  type="text"
                  className="w-full h-14 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 ring-emerald-400  px-2 placeholder:text-sm placeholder:font-medium transition duration-300 font-bold"
                  placeholder="Section"
                  onChange={handleSectionChange}
                  required
                  value={section}
                />
              </div>
              <input
                type="text"
                className="w-full h-14 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 ring-emerald-400  px-2 placeholder:text-sm placeholder:font-medium transition duration-300 font-bold"
                placeholder="Class code"
                onChange={handleInputChange}
                required
                value={classCode}
              />
              {error && (
                <p className="mt-2 ml-1 text-red-500 text-sm font-semibold">
                  {error}
                </p>
              )}
              <Button
                className="mt-3 bg-emerald-500 text-white disabled:bg-zinc-300 disabled:cursor-not-allowed"
                disabled={disable}
                type="submit"
              >
                Enter class
              </Button>

              <div className="mt-5 w-full h-10 border-l-3 border-zinc-500 bg-zinc-50 text-zinc-700 flex justify-start items-center px-3">
                <h1 className="text-sm font-semibold">
                  Note: Please use an authorized account.
                </h1>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
