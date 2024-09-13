import React, { useEffect } from "react";
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
import { useAuth } from "../hooks/AuthContext.tsx";

import { FaEye } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Tooltip } from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import { FaRankingStar } from "react-icons/fa6";

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
            className="w-[300px] h-10 border border-zinc-200 px-2 text-xs outline-none focus:border focus:border-emerald-300"
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
          <button className="flex items-center gap-2 px-3 h-10 text-xs text-zinc-600 font-semibold border border-zinc-200 outline-none">
            Filter Users
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
          <DropdownItem key="text">Lowest Rank</DropdownItem>
          <DropdownItem key="number">Highest Rank</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const AddNew = () => {
  return (
    <button className="px-4 h-10 bg-indigo-600 text-white rounded-lg text-xs font-medium flex items-center gap-2">
      Add New
      <IoMdAdd size={15} />
    </button>
  );
};
const StudentsTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchUsersInfo = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("profile")
          .select("id, username, first_name, last_name, rank")
          .order("rank", { ascending: true, nullsLast: true });

        if (error) throw error;

        setUsersData(data);
      } catch (error) {
        console.error("Error fetching users data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersInfo();
  }, []);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <>
      <Table
        aria-label="Students table"
        className="w-full border border-zinc-100 rounded-lg"
        shadow="none"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Username</TableColumn>
          <TableColumn>First Name</TableColumn>
          <TableColumn>Last Name</TableColumn>
          <TableColumn>Progress</TableColumn>
          <TableColumn>Progress Update At</TableColumn>
          <TableColumn>Rank</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            <NoData
              icon="https://cdn-icons-png.flaticon.com/128/7486/7486747.png"
              text="No students yet"
            />
          }
          loadingContent={<div>Loading...</div>}
          loadingState={loading ? "loading" : "idle"}
        >
          {usersData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{/* Add progress data here */}</TableCell>
              <TableCell>{/* Add progress update data here */}</TableCell>
              <TableCell>{user.rank || "N/A"}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-4">
                  <Tooltip content="Details">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <FaEye onClick={() => handleViewDetails(user)} />
                    </span>
                  </Tooltip>
                  <Tooltip content="Edit user">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <RiEditLine />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete user">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <RiDeleteBin5Line />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ViewStudentDetails
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        user={selectedUser}
      />
    </>
  );
};

const ViewStudentDetails = ({ isOpen, onOpenChange, user }) => {
  if (!user) return null;
  const [value, setValue] = React.useState(50);

  return (
    <Modal
      backdrop="opaque"
      size="lg"
      isOpen={isOpen}
      className="z-[100]"
      onOpenChange={onOpenChange}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold">User Details</h1>
              <p className="text-xs font-normal text-zinc-500">
                View user details in a convenient format.
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-1 p-3 border border-zinc-200 rounded">
                <label htmlFor="id" className="text-xs text-zinc-500">
                  ID
                </label>
                <h1 className="text-lg font-semibold">{user.id}</h1>
              </div>
              <div className="w-full grid md:grid-cols-3 gap-2 p-3 border border-zinc-200">
                <div className="flex flex-col gap-1">
                  <label htmlFor="id" className="text-xs text-zinc-500">
                    Username
                  </label>
                  <h1 className="text-lg font-semibold">{user.username}</h1>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="id" className="text-xs text-zinc-500">
                    First name
                  </label>
                  <h1 className="text-lg font-semibold">{user.first_name}</h1>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="id" className="text-xs text-zinc-500">
                    Last name
                  </label>
                  <h1 className="text-lg font-semibold">{user.last_name}</h1>
                </div>
              </div>
              <div className="grid w-full md:grid-cols-2 gap-2">
                <div className="flex flex-col p-3 gap-1 border border-zinc-200">
                  <label htmlFor="id" className="text-xs text-zinc-500">
                    Progress
                  </label>
                  <Progress
                    aria-label="Progressing..."
                    size="md"
                    value={value}
                    color="success"
                    showValueLabel={true}
                    className="max-w-md font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1 p-3 border border-zinc-200 relative">
                  <div className="absolute bottom-1 right-1 text-zinc-300">
                    <FaRankingStar size={60} />
                  </div>
                  <label htmlFor="id" className="text-xs text-zinc-500">
                    Rank
                  </label>
                  <h1 className="text-lg font-semibold">{user.rank}</h1>
                </div>
              </div>
            </ModalBody>
            <hr />
            <ModalFooter>
              <Button
                size="sm"
                className="bg-emerald-500 rounded-lg text-white"
                auto
                color="error"
                onClick={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
