import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useLocation } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import { AiOutlineDelete } from "react-icons/ai";
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
import { IoIosWarning } from "react-icons/io";

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

const StudentsTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState(false);
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onOpenChange: onViewOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

  const fetchUsersInfo = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchUsersInfo();
  }, [fetchUsersInfo]);

  //REALTIME DATA INSERTION

  useEffect(() => {
    const channel = supabase
      .channel("realtime:profile")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profile" }, // Listen to all events (INSERT, UPDATE, DELETE)
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setUsersData((prevData) => [...prevData, payload.new]);
              break;

            case "UPDATE":
              setUsersData((prevData) =>
                prevData.map((user) =>
                  user.id === payload.new.id ? payload.new : user
                )
              );
              break;

            case "DELETE":
              setUsersData((prevData) =>
                prevData.filter((user) => user.id !== payload.old.id)
              );

              setToast(true);
              setTimeout(() => {
                setToast(false);
              }, 3000);
              break;

            default:
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    onViewOpen();
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    onDeleteOpen();
  };

  const handleUserDeleted = useCallback(
    (deletedUserId) => {
      setUsersData((prevData) =>
        prevData.filter((user) => user.id !== deletedUserId)
      );
      onDeleteOpenChange(false);
    },
    [onDeleteOpenChange]
  );

  return (
    <>
      <Table
        aria-label="Students table"
        className="w-full border border-zinc-200 rounded-lg"
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
              <TableCell>{user.rank}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-4">
                  <Tooltip radius="sm" content="Details">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <FaEye
                        size={20}
                        onClick={() => handleViewDetails(user)}
                      />
                    </span>
                  </Tooltip>
                  <Tooltip radius="sm" content="Edit user">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <RiEditLine size={20} />
                    </span>
                  </Tooltip>
                  <Tooltip
                    radius="sm"
                    className="bg-red-600 text-white"
                    content="Delete user"
                  >
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <AiOutlineDelete
                        size={20}
                        onClick={() => handleDeleteUser(user)}
                      />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ViewStudentDetails
        isOpen={isViewOpen}
        onOpenChange={onViewOpenChange}
        user={selectedUser}
      />

      <DeleteData
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        user={selectedUser}
        onUserDeleted={handleUserDeleted}
      />

      <Toast toast={toast} setToast={setToast} />
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

const DeleteData = ({ isOpen, onOpenChange, user, onUserDeleted }) => {
  if (!user) return null;

  const confirmDeleteUser = useCallback(async () => {
    try {
      const { error } = await supabase
        .from("profile")
        .delete()
        .eq("id", user.id);
      if (error) throw error;

      onUserDeleted(user.id);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  }, [user, onUserDeleted]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime:profile")
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "profile" },
        (payload) => {
          if (payload.old && payload.old.id === user.id) {
            onUserDeleted(user.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, onUserDeleted]);

  return (
    <Modal
      backdrop="opaque"
      size="sm"
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
            <ModalHeader className="flex flex-col gap-1 space-y-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">Delete this user?</h1>
                <p className="text-sm font-normal text-zinc-600">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-black">
                    "{user.username}'s"
                  </span>
                  data?
                </p>
              </div>

              <div className="w-full h-20 p-2 flex justify-start border-l-4 border-red-600 bg-red-50 text-red-800">
                <div className="flex justify-start gap-2">
                  <IoIosWarning className="text-red-500" size={24} />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold">Warning</p>
                    <p className="text-xs">
                      This action is irreversible and will permanently delete
                      the user's entire data.
                    </p>
                  </div>
                </div>
              </div>
            </ModalHeader>
            <ModalBody></ModalBody>
            <hr />
            <ModalFooter>
              <Button
                size="sm"
                className="border border-zinc-300 text-zinc-500"
                auto
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-red-500 rounded-lg text-white"
                auto
                onClick={confirmDeleteUser}
              >
                Delete Data
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const Toast = ({ toast, setToast }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[1000]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        User successfully deleted!
      </motion.div>
    </div>
  );
};
