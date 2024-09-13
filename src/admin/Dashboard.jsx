import React from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { PiStudentBold } from "react-icons/pi";
import { GrResources } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { Skeleton } from "@nextui-org/react";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { PiCaretUpDownFill } from "react-icons/pi";
import NoData from "../components/ui/NoData";
import { AnimatePresence, motion } from "framer-motion";
export default function Dashboard() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  return (
    <div className="mt-16 flex">
      <Sidebar active={active} />
      <div className="flex flex-col flex-grow">
        <AdminNavbar />
        <div className="ml-[250px] p-5 flex-grow">
          <Content />
        </div>
      </div>
    </div>
  );
}

const Content = () => {
  const currentHour = new Date().getHours();
  const [loaded, setLoaded] = useState(false);
  const [userCount, setUserCount] = useState(0);

  let greetings;
  if (currentHour >= 5 && currentHour < 12) {
    greetings = "Good Morning 🌞";
  } else if (currentHour >= 12 && currentHour < 18) {
    greetings = "Good Afternoon 🌤️";
  } else if (currentHour >= 18 && currentHour < 22) {
    greetings = "Good Evening 🌛";
  } else {
    greetings = "Good Night 🌙";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const countData = async () => {
      try {
        const { count, error } = await supabase
          .from("profile")
          .select("*", { count: "exact", head: true });

        if (error) {
          console.log(error);
          return;
        }
        setUserCount(count);
      } catch (error) {
        console.log(error);
      }
    };
    countData();
  }, []);

  const boxInfo = [
    {
      value: userCount,
      icon: PiStudentBold,
      description: "Total Users",
      color: "bg-orange-100 text-orange-600",
    },
    {
      value: 0,
      icon: GrResources,
      description: "Total Resources",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      value: 0,
      icon: FaUsers,
      description: "Online Users",
      color: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <div className="w-full flex flex-col items-start p-3">
      <Skeleton className="rounded-lg" isLoaded={loaded}>
        <h1 className="text-md ">{greetings}</h1>
      </Skeleton>

      <div className="mt-6 w-full grid md:grid-cols-3 gap-2">
        <AnimatePresence>
          {boxInfo.map((item, idx) => (
            <motion.div
              key={idx}
              className="w-full h-[130px] border border-zinc-200 bg-white shadow-2xl shadow-zinc-50 p-6 flex items-center justify-center flex-col gap-2 rounded duration-500 relative overflow-hidden"
            >
              <div className="w-full flex justify-start items-start gap-6">
                <Skeleton isLoaded={loaded} className="rounded-full">
                  <div
                    className={`size-10 grid place-items-center rounded-full ${item.color}`}
                  >
                    <item.icon size={20} />
                  </div>
                </Skeleton>
                <div className="flex flex-col gap-2 text-zinc-800">
                  <Skeleton className="rounded-lg" isLoaded={loaded}>
                    <p className="text-sm text-zinc-600">{item.description}</p>
                  </Skeleton>
                  <div className="flex items-start ">
                    <Skeleton className="rounded-lg" isLoaded={loaded}>
                      <div className="w-32">
                        <h1 className="text-3xl font-medium text-zinc-600">
                          {item.value}
                        </h1>
                      </div>
                    </Skeleton>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ListData />
    </div>
  );
};

const ListData = () => {
  const [loaded, isLoaded] = React.useState(false);

  setTimeout(() => {
    isLoaded(true);
  }, 2000);
  return (
    <div className="mt-10 w-full flex flex-col gap-2 justify-start items-start p-2 text-zinc-900">
      <div className="w-full flex justify-between">
        <Skeleton className="rounded-lg" isLoaded={loaded}>
          <h1 className="text-md font-medium">Codecian Users</h1>
        </Skeleton>
      </div>

      <div className="w-full mt-5">
        <Skeleton className="rounded-lg" isLoaded={loaded}>
          <StudentsTable />
        </Skeleton>
      </div>
    </div>
  );
};

const StudentsTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      const fetchUsersData = async () => {
        const { data, error } = await supabase
          .from("profile")
          .select("id, first_name, last_name, username, points, rank")
          .order("points", { ascending: false });

        if (error) throw error;

        setUsers(data);
      };

      fetchUsersData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Table
        aria-label="Students table"
        className="w-full border border-zinc-300 rounded-lg"
        shadow="none"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Username</TableColumn>
          <TableColumn>First Name</TableColumn>
          <TableColumn>Last Name</TableColumn>
          <TableColumn>Points</TableColumn>
          <TableColumn>Rank</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            <NoData
              icon="https://cdn-icons-png.flaticon.com/128/7486/7486747.png"
              text="No students yet"
            />
          }
        >
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.points}</TableCell>
              <TableCell>{user.rank}</TableCell>
            </TableRow>
          ))}
          {[]}
        </TableBody>
      </Table>
    </>
  );
};
