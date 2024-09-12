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
import NoData from "../components/ui/NoData";
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
    <div className="flex flex-col space-y-4 items-start p-3">
      <Header />
      <UsersTable />
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
          className="flex items-center gap-2 px-3 h-12 rounded-xl text-xs text-zinc-600 font-semibold border border-zinc-300"
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
          <button className="flex items-center gap-2 px-3 h-12 rounded-xl text-xs bg-emerald-500 text-white font-semibold border border-emerlad-600 outline-none">
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
          <DropdownItem key="text">Highest Points</DropdownItem>
          <DropdownItem key="number">Lowest</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const UsersTable = () => {
  return (
    <>
      <Table
        aria-label="Students table"
        className="w-full border border-zinc-100 rounded-lg"
        shadow="none"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>USERNAME</TableColumn>
          <TableColumn>POINTS</TableColumn>
          <TableColumn>RANK</TableColumn>
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
