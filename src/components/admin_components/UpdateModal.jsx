import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "@nextui-org/react";

export default function UpdateModal({ openUpdateModal, setOpenUpdateModal }) {
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
                <h1 className="text-lg font-medium">Update Classroom</h1>
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

              <form className="mt-8 gap-6">
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
                    className="py-2 px-3 border border-indigo-600 font-bold bg-indigo-600 text-white shadow-[4px_4px_0px_black] disabled:cursor-not-allowed outline-none text-sm"
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
