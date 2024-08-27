import React from "react";

export default function NoData({ text, icon }) {
  return (
    <div className="w-full h-[300px] grid place-items-center text-zinc-500">
      <div className="flex flex-col justify-center items-center gap-6">
        <img src={icon} className="w-20" />
        <h1 className="text-xs font-medium">{text}</h1>
      </div>
    </div>
  );
}
