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
    <div className="fixed top-0 left-14 bg-white border-b border-zinc-100 h-14 w-full mx-auto flex justify-between items-center z-20">
      <Link to="/admin/dashboard" className="ml-[240px] text-sm ">
        Admin View
      </Link>

      <Dropdown backdrop="blur" showArrow radius="sm">
        <DropdownTrigger>
          <div className="mr-20 flex items-center gap-2">
            <button
              className="flex items-center
         gap-2 text-xs  py-2 px-3  "
            >
              <img src={Teacher} className="w-6 rounded-full" alt="teacher" />
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
