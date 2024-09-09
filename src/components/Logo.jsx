import React from "react";

export default function Logo({ size, textSize }) {
  return (
    <div
      className={`size-${size} rounded-lg bg-emerald-600 border border-zinc-300 shadow-[4px_4px_0px_#d4d4d8] grid place-content-center`}
    >
      <h1 className={`text-white text-${textSize} font-black`}>{"{;}"}</h1>
    </div>
  );
}
