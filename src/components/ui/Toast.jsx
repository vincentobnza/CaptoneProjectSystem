import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function Toast({ toast, setToast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            duration: 0.5,
            type: "spring",
            damping: 25,
            stiffness: 500,
          }}
          className="w-full fixed top-0 left-0 p-3 grid place-items-center"
        >
          <div className="py-3 px-5 rounded-lg bg-white text-zinc-800 flex justify-center items-center text-center font-semibold">
            <p className="text-sm font-semibold ">User Created Successfully</p>
            <FaCheckCircle className="text-emerald-600 ml-2" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
