import React from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useLocation } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { RxCaretDown } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import NoData from "../components/ui/NoData";

export default function Students() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  return (
    <div>
      <div className="mt-16 flex ">
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
    <div className="flex flex-col items-start p-3 space-y-4">
      <Header />
      <StudentsTable />
    </div>
  );
};

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center gap-2">
      <div className="basis-1/4 flex flex-col gap-2">
        <h1 className="text-lg font-medium">Manage Students</h1>
        <p className="text-xs text-zinc-600">
          This is where you can manage students
        </p>
      </div>

      <div className="basis-3/4 flex items-center justify-end gap-3">
        <div className="flex gap-1">
          <input
            type="text"
            className="w-[300px] h-10 border border-zinc-500 shadow-[4px_4px_0px_black] px-2 text-xs"
            placeholder="Search for students"
          />
        </div>

        <FilterStudents />
        <AddNew />
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
      <Dropdown>
        <DropdownTrigger>
          <button className="flex items-center gap-2 px-3 h-10 text-xs text-zinc-600 font-semibold border border-zinc-500 outline-none shadow-[4px_4px_0px_black]">
            Filter students
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

const AddNew = () => {
  return (
    <button className="px-4 h-10 bg-indigo-600 text-white shadow-[4px_4px_0px_black] text-xs font-medium flex items-center gap-2">
      Add New
      <IoMdAdd size={15} />
    </button>
  );
};
const StudentsTable = () => {
  return (
    <>
      <Table
        aria-label="Students table"
        className="w-full border border-zinc-100 rounded-lg"
        shadow="none"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>YEAR LEVEL</TableColumn>
          <TableColumn>SECTION</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>CLASS CODE</TableColumn>
          <TableColumn>POINTS</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            <NoData
              icon="https://cdn-icons-png.flaticon.com/128/7486/7486747.png"
              text="No students yet"
            />
          }
        >
          {[]}
        </TableBody>
      </Table>
    </>
  );
};
