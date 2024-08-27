import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 inset-0 bg-zinc-900/30 backdrop-blur grid place-items-center">
      <div className="w-[300px] h-[80px] bg-white flex justify-center items-center text-sm font-bold rounded-lg">
        <BeatLoader size={8} color="#64748b" />
      </div>
    </div>
  );
}
