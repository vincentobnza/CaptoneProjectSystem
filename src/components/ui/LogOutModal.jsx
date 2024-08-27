import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
export default function LogOutModal({ open, setOpen }) {
  return (
    <>
      {open && (
        <AnimatePresence>
          <motion.div
            key={open}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute p-5 left-20 -top-20 w-[210px] h-[80px] rounded bg-white border border-zinc-200 z-10 flex flex-col justify-center items-center gap-2"
          >
            <h1 className="text-sm font-semibold ">You want to logout?</h1>
            <div className="mt-2 flex items-start gap-4">
              <button
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-zinc-400 hover:text-black"
              >
                No, Don't
              </button>
              <Link
                to="/admin_login"
                className="text-xs font-semibold text-emerald-600"
              >
                Yes, Logout
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
