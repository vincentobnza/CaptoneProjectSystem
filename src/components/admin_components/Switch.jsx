import React from "react";
import { GoArrowSwitch } from "react-icons/go";
export default function Switch() {
  return (
    <button className="fixed py-2 px-4 bg-white bottom-6 right-6 border border-zinc-500  flex items-center gap-2 cursor-pointer shadow-[4px_4px_0px_black] text-sm font-bold outline-none">
      <GoArrowSwitch size={16} />
      Switch
    </button>
  );
}
