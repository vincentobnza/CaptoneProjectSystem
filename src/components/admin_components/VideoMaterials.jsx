import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffecta } from "react";
import { FaVideo } from "react-icons/fa";

export default function VideoMaterials({ videoMaterial, setVideoMaterial }) {
  return (
    <>
      {
        <AnimatePresence>
          {videoMaterial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVideoMaterial(false)}
              className="fixed inset-0 bg-zinc-900/40 grid place-items-center z-[100] p-5"
            >
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-screen-md  h-[95vh] bg-white p-5 rounded-lg"
              >
                <div className="flex items-center gap-4 ">
                  <div className="p-2 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg">
                    <FaVideo />
                  </div>
                  <h1 className="text-lg font-bold">Video Materials</h1>
                </div>

                <Input />
                <VideoFile />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      }
    </>
  );
}

const Input = ({ value, setValue }) => {
  return (
    <div className="w-full p-5 mt-5 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-semibold">
          Title
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-zinc-300 p-3 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-semibold">
          Description
        </label>
        <textarea
          type="text"
          placeholder="Description (optional)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-zinc-300 p-3 h-[150px] rounded-lg placeholder:text-sm"
        />
      </div>
    </div>
  );
};

const VideoFile = () => {
  return (
    <div className="w-full p-5 mt-5 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-semibold">
          Upload Video
        </label>
        <input
          type="file"
          className="w-full border border-zinc-300 p-3 rounded-lg"
        />
      </div>
    </div>
  );
};
