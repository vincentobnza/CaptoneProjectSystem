import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiArchiveDuotone } from "react-icons/pi";

export default function ArchivedModal({ archivedModal, setIsArchivedModal }) {
  return (
    <AnimatePresence>
      {archivedModal && (
        <motion.div
          onClick={() => setIsArchivedModal(false)}
          className="fixed inset-0 bg-zinc-900/40 grid place-items-center z-[100]"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.5 }}
            className="w-[400px] bg-white p-5 rounded flex flex-col gap-2 justify-center items-center text-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2821/2821739.png"
              className="w-10 mb-4"
            />
            <h1 className="text-xl font-semibold">Archived this classroom?</h1>
            <p className="text-xs text-zinc-600">
              This action is irreversible and will archived all associated
              content and student data.
            </p>

            <div className="flex items-center gap-2 mt-10">
              <button
                onClick={() => setIsArchivedModal(false)}
                className="py-2 px-3 rounded-lg text-xs font-bold text-zinc-600 hover:text-black"
              >
                Cancel
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold bg-zinc-700 text-white">
                Archived Room
                <PiArchiveDuotone size={20} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
