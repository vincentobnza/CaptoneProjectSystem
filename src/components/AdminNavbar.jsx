import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import Teacher from "../icons/teacher.png";
import { IoCaretDownSharp } from "react-icons/io5";
import { PiSignOutDuotone } from "react-icons/pi";
import { RiSettingsLine } from "react-icons/ri";

export default function AdminNavbar() {
  return (
    <div className="fixed top-0 left-14 bg-white border-b border-zinc-100 h-14 w-full mx-auto flex justify-between items-center z-50">
      <Link to="/admin/dashboard" className="ml-[210px] text-sm font-semibold">
        LMS Admin Panel
      </Link>

      <Dropdown backdrop="blur" showArrow radius="sm">
        <DropdownTrigger>
          <div className="mr-20 flex items-center gap-2">
            <button
              className="flex items-center
         gap-2 text-xs font-bold py-[0.30rem] px-3  border border-zinc-500 shadow-[4px_4px_0px_black] "
            >
              <img src={Teacher} className="w-6 rounded-full" />
              Instructor Mode
              <IoCaretDownSharp className="text-zinc-500" />
            </button>
          </div>
        </DropdownTrigger>

        <DropdownMenu className="p-3">
          <DropdownItem startContent={<RiSettingsLine size={18} />}>
            System Controls
          </DropdownItem>
          <DropdownItem startContent={<PiSignOutDuotone size={18} />}>
            Sign out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}