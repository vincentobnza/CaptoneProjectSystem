import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 inset-0 bg-white grid place-items-center z-[100]">
      <div className="size-[300px] flex flex-col gap-4 justify-center items-center text-center">
        <ScaleLoader size={20} color="#18181b" />

        <h1 className="text-xs tracking-wide text-zinc-900">
          Loading please be patient...
        </h1>
      </div>
    </div>
  );
}
