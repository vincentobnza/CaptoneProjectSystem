import React from "react";

export default function Logo({ size, textSize }) {
  return (
    <div
      className={`size-${size} rounded-lg bg-zinc-800 border border-zinc-600 shadow-[4px_4px_0px_#3f3f46] grid place-content-center`}
    >
      <h1 className={`text-indigo-500 text-${textSize} font-black`}>
        {"{ ; }"}
      </h1>
    </div>
  );
}
