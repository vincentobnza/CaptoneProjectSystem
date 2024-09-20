import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar.jsx";
import AdminNavbar from "../components/AdminNavbar.jsx";
import { useLocation } from "react-router-dom";
import supabase from "../config/supabaseClient.js";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Progress,
} from "@nextui-org/react";
import { RxCaretDown } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import NoData from "../components/ui/NoData.jsx";
import { useAuth } from "../hooks/AuthContext.tsx";
import { FaEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";

export default function Users() {
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

const Inputs = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKey, setSelectedKey] = useState("Joined");

  const options = {
    Joined: "Joined",
    Email: "Email",
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleSelectionChange = (keys) => {
    const selectedKey = keys.currentKey || keys.values().next().value;
    setSelectedKey(selectedKey);
    onSort(selectedKey);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-end gap-3">
        <div className="relative flex items-center w-[300px]">
          <MdOutlineSearch
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-zinc-400"
            size={20}
          />
          <input
            type="text"
            className="w-full h-10 border border-zinc-200 pl-8 pr-2 text-xs outline-none focus:border-2 focus:border-zinc-300 focus:shadow shadow rounded-lg"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <FilterUsers
          selectedKey={selectedKey}
          options={options}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center gap-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">Users</h1>
        <p className="text-sm text-zinc-600">View and manage users.</p>
      </div>
      <button className="py-2 px-5 rounded-lg bg-gradient-to-b from-emerald-400 to-emerald-500 text-white text-[12px] font-semibold">
        Create User
      </button>
    </div>
  );
};

const FilterUsers = ({ selectedKey, options, onSelectionChange }) => {
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <button className="flex items-center gap-2 px-3 h-10 text-xs text-zinc-400 font-semibold border border-zinc-200 outline-none shadow rounded-lg">
            Sort by:{" "}
            <b className="font-bold text-zinc-700">{options[selectedKey]}</b>
            <RxCaretDown size={18} />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Sorting options"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={new Set([selectedKey])}
          onSelectionChange={onSelectionChange}
        >
          {Object.entries(options).map(([key, value]) => (
            <DropdownItem key={key}>{value}</DropdownItem>
          ))}
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

  const fetchUsersInfo = useCallback(async (searchTerm = "") => {
    try {
      setLoading(true);
      let query = supabase
        .from("profile")
        .select("id, username, first_name, last_name, rank");

      if (searchTerm) {
        query = query.ilike("username", `%${searchTerm}%`); // Modify search logic if needed
      }

      const { data, error } = await query.order("rank", {
        ascending: true,
        nullsLast: true,
      });

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

  useEffect(() => {
    const channel = supabase
      .channel("realtime:profile")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profile" },
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
              setTimeout(() => setToast(false), 3000);
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

  const handleSearch = (searchTerm) => {
    fetchUsersInfo(searchTerm); // Fetch users based on the search term
  };

  return (
    <>
      <Inputs onSearch={handleSearch} />

      <Table
        aria-label="Students table"
        className="w-full border border-zinc-200 rounded-xl"
        shadow="sm"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Username</TableColumn>
          <TableColumn>First Name</TableColumn>
          <TableColumn>Last Name</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            <NoData
              icon="https://cdn-icons-png.flaticon.com/128/7486/7486747.png"
              text="No students yet"
            />
          }
          loadingState={loading ? "loading" : "idle"}
        >
          {usersData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
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
                  <Tooltip
                    radius="sm"
                    className="bg-red-600 text-white"
                    content="Delete user"
                  >
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
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
      className="z-[100] font-MonaSans"
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
            <ModalHeader className="flex flex-col gap-1 space-y-4 bg-zinc-100 border-b border-zinc-300 shadow">
              <div className="flex flex-col gap-2">
                <h1 className="text-md font-semibold">Delete this user?</h1>
              </div>
            </ModalHeader>
            <ModalBody>
              <h3 className="text-sm font-medium text-zinc-500">
                Are you sure you want to delete this user?
              </h3>
              <p className="font-bold">{user.username}</p>

              <div className="w-full rounded-tl-lg rounded-tr-lg bg-zinc-50">
                <div className="flex items-center gap-2"></div>
              </div>
            </ModalBody>
            <hr />
            <ModalFooter className="bg-zinc-100 shadow">
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
