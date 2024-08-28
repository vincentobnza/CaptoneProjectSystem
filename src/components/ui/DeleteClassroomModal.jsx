import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import supabase from "../../config/supabaseClient";
import { TiFolderDelete } from "react-icons/ti";

export default function DeleteClassroomModal({
  open,
  setIsOpen,
  classroom,
  onDelete,
}) {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("classrooms")
      .delete()
      .eq("id", classroom.id);

    if (error) {
      throw error;
    }
    setIsOpen(false);
    if (data) {
      console.log("Before onDelete");
      onDelete(classroom.id);
      console.log("After onDelete");
      console.log("Classroom deleted");
    }
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={() => setIsOpen(false)}
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
              src="https://cdn-icons-png.flaticon.com/128/484/484560.png"
              className="w-10 mb-4"
              alt="Delete icon"
            />
            <h1 className="text-xl font-semibold">Delete this classroom?</h1>
            <p className="text-xs text-zinc-600">
              This action is irreversible and will remove all associated content
              and student data.
            </p>

            <div className="flex items-center gap-2 mt-10">
              <button
                onClick={() => setIsOpen(false)}
                className="py-2 px-3 rounded-lg text-xs font-bold text-zinc-600 hover:text-black"
              >
                Cancel deletion
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold bg-red-500 text-white"
              >
                Confirm Deletion
                <TiFolderDelete size={20} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
