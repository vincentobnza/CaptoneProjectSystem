import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";

export default function UpdateModal({
  openUpdateModal,
  setOpenUpdateModal,
  classroom,
}) {
  const [formData, setFormData] = useState({
    classroomName: classroom.classroom_name,
    description: classroom.description,
    section: classroom.section,
  });

  const [toast, setToast] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase
        .from("classrooms")
        .update({
          classroom_name: formData.classroomName,
          description: formData.description,
          section: formData.section,
        })
        .eq("id", classroom.id);

      if (data) {
        setToast(true);
        const timer = setTimeout(() => {
          setToast(false);
          setTimeout(() => {
            setOpenUpdateModal(false);
          }, 1000);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        {openUpdateModal && (
          <motion.div
            onClick={() => setOpenUpdateModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-zinc-950/40 grid place-items-center"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-full max-w-lg p-8 bg-white"
            >
              <div className="w-full flex justify-between items-center">
                <h1 className="text-lg font-medium">Edit your Classroom</h1>
                <Tooltip
                  content="Press ESC key to exit"
                  placement="left-start"
                  className="text-xs text-zinc-500"
                  radius="none"
                >
                  <button
                    onClick={() => setOpenUpdateModal(false)}
                    className="px-3 py-2 text-xs font-bold bg-white border border-zinc-500 text-zinc-500 hover:bg-zinc-50 shadow-[4px_4px_0px_black]"
                  >
                    ESC
                  </button>
                </Tooltip>
              </div>

              <Toast toast={toast} setToast={setToast} />
              <form className="mt-8 gap-6" onSubmit={handleSubmit}>
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
                    value={formData.classroomName}
                    onChange={handleInputChange}
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
                    value={formData.description}
                    onChange={handleInputChange}
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
                    value={formData.section}
                    onChange={handleInputChange}
                  />
                  <p></p>
                </div>

                <div className="mt-12 w-full flex gap-6 justify-end items-center">
                  <button
                    type="button"
                    onClick={() => setOpenUpdateModal(false)}
                    className="font-semibold text-zinc-500 outline-none text-sm"
                  >
                    Not now
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-3 border border-orange-600 font-bold bg-orange-600 text-white shadow-[4px_4px_0px_black] disabled:cursor-not-allowed outline-none text-sm"
                  >
                    Update
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
            <p className="text-sm font-semibold ">Classroom Updated</p>
            <FaCheckCircle className="text-orange-600 ml-2" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
