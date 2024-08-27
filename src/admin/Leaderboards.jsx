import React from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import EnablePolicy from "../components/admin_components/EnablePolicy";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
export default function Leaderboards() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  return (
    <div>
      <div className="mt-16 flex">
        <Sidebar active={active} />
        <div className="flex flex-col flex-grow">
          <AdminNavbar />
          <div className="ml-[250px] p-5 flex-grow">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
}

const Content = () => {
  return (
    <div className="flex flex-col items-start p-3">
      <Header />
    </div>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex justify-between items-center gap-2">
      <div className="basis-1/4 flex flex-col gap-2">
        <h1 className="text-lg font-medium">Leaderboard</h1>
        <p className="text-xs text-zinc-600">
          View who are the top students here.
        </p>
      </div>

      <div className="basis-3/4 flex items-center justify-end gap-3">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-3 h-10 text-xs text-zinc-600 font-semibold border border-zinc-500 outline-none shadow-[4px_4px_0px_black]"
        >
          Enable to Students
        </button>
        <FilterStudents />
        <EnablePolicy open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};
const FilterStudents = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  return (
    <div>
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <button className="flex items-center gap-2 px-3 h-10 text-xs bg-indigo-600 text-white font-semibold border border-indigo-600 outline-none shadow-[4px_4px_0px_black]">
            Filter Records
            <RxCaretDown size={18} />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <DropdownItem key="text">1st Year</DropdownItem>
          <DropdownItem key="number">2nd Year</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
