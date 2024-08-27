import React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "@nextui-org/react";
import { TiUpload } from "react-icons/ti";
import supabase from "../config/supabaseClient";
import { FaCheckCircle } from "react-icons/fa";

export default function CreateClassroomModal({ open, setIsOpen }) {
  const [formData, setFormData] = useState({
    classroomName: "",
    description: "",
    section: "",
    classroomCode: "",
  });
  const [toast, setToast] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const generateClassCode = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < 10; i++) {
          result += characters.charAt(Math.floor(Math.random() * 36));
        }
        return result;
      };

      const randomClassCode = generateClassCode();

      const { data, error } = await supabase.from("classrooms").insert([
        {
          classroom_name: formData.classroomName,
          description: formData.description,
          section: formData.section,
          class_code: randomClassCode,
        },
      ]);

      if (error) throw error;
      setLoading(true);
      setToast(true);
      const timer = setTimeout(() => {
        setToast(false);
        setTimeout(() => {
          setIsOpen(false);
          setFormData({
            classroomName: "",
            description: "",
            section: "",
          });
          setLoading(false);
        }, 1000);
      }, 3000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
    }
  };

  //PREVENT SCROLLING ON MY OVERLAY
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  //PRESS ESC KEYS TO CLOSE MODAL
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setIsOpen]);

  // Manage disabled state
  useEffect(() => {
    setDisabled(
      !(formData.classroomName && formData.description && formData.section)
    );
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-zinc-900/40 z-[100] backdrop-blur grid place-items-center p-5"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-full max-w-lg  bg-white flex flex-col gap-2 p-6 relative"
            >
              {/* ESCAPE */}
              <div className="w-full flex justify-between items-center">
                <h1 className="text-lg font-medium">Create Classroom</h1>
                <Tooltip
                  content="Press ESC key to exit"
                  placement="left-start"
                  className="text-xs text-zinc-500"
                  radius="none"
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 text-xs font-bold bg-white border border-zinc-500 text-zinc-500 hover:bg-zinc-50 shadow-[4px_4px_0px_black]"
                  >
                    ESC
                  </button>
                </Tooltip>
              </div>

              <Toast toast={toast} setToast={setToast} />
              <form onSubmit={handleSubmit} className="mt-8 gap-6">
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-sm">
                    Classroom Name
                    <span className="ml-1 text-red-300">{"*"}</span>
                  </h1>
                  <input
                    autoComplete="off"
                    type="text"
                    name="classroomName"
                    className="w-full h-14 border border-zinc-300 outline-none placeholder:text-sm focus:border focus:border-zinc-400 transition duration-300 px-3  mb-1"
                    placeholder="Classroom Name"
                    onChange={handleInputChange}
                    value={formData.classroomName}
                  />
                  <h1 className="font-semibold text-sm">
                    Class Description{" "}
                    <span className="ml-1 text-red-300">{"*"}</span>
                  </h1>
                  <input
                    autoComplete="off"
                    type="text"
                    name="description"
                    className="w-full h-14 border border-zinc-300 outline-none placeholder:text-sm focus:border focus:border-zinc-400 transition duration-300 px-3  mb-1"
                    placeholder="Description here"
                    onChange={handleInputChange}
                    value={formData.description}
                  />
                  <h1 className="font-semibold text-sm">
                    Section <span className="ml-1 text-red-300">{"*"}</span>
                  </h1>
                  <input
                    autoComplete="off"
                    type="text"
                    name="section"
                    className="w-full h-14 border border-zinc-300 outline-none placeholder:text-sm focus:border focus:border-zinc-400 transition duration-300 px-3  mb-1"
                    placeholder="Class Section"
                    onChange={handleInputChange}
                    value={formData.section}
                  />
                  <p></p>
                </div>

                <div className="mt-12 w-full flex gap-6 justify-end items-center">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="font-semibold text-zinc-500 outline-none text-sm"
                  >
                    Not now
                  </button>
                  <button
                    type="submit"
                    disabled={disabled}
                    className="py-2 px-3 border border-indigo-600 font-bold bg-indigo-600 text-white shadow-[4px_4px_0px_black] disabled:cursor-not-allowed outline-none text-sm"
                  >
                    {loading ? "Creating..." : "Create Classroom"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Toast({ toast, setToast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{
            duration: 0.5,
            type: "spring",
            damping: 25,
            stiffness: 500,
          }}
          className="w-full fixed top-0 left-0 p-3 grid place-items-center"
        >
          <div className="py-3 px-5 rounded bg-white text-zinc-800 flex justify-center items-center text-center font-semibold">
            <p className="text-sm font-semibold ">Classroom Created</p>
            <FaCheckCircle className="text-emerald-600 ml-2" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
