import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 inset-0 bg-zinc-900/60 backdrop-blur grid place-items-center z-[100]">
      <div className="size-[300px] flex flex-col gap-4 justify-center items-center text-center">
        <ScaleLoader size={20} color="#f4f4f5" />

        <h1 className="text-xs tracking-wide text-white">
          Loading please be patient...
        </h1>
      </div>
    </div>
  );
}
