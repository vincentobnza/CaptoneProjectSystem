import React from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { PiStudentBold } from "react-icons/pi";
import { GrResources } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { Select, SelectItem } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/react";
import { SiGoogleclassroom } from "react-icons/si";
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
  let greetings;
  const [loaded, isLoaded] = React.useState(false);
  const [classroomCount, setClassroomCount] = useState(0);

  setTimeout(() => {
    isLoaded(true);
  }, 2000);

  if (currentHour >= 5 && currentHour < 12) {
    greetings = "Good Morning 🌞";
  } else if (currentHour >= 12 && currentHour < 18) {
    greetings = "Good Afternoon 🌤️";
  } else if (currentHour >= 18 && currentHour < 22) {
    greetings = "Good Evening 🌛";
  }

  useEffect(() => {
    const countData = async () => {
      try {
        const { count, error: countError } = await supabase
          .from("classrooms")
          .select("*", { count: "exact" });

        if (countError) {
          console.log(countError);
          return;
        }
        setClassroomCount(count);
      } catch (error) {
        console.log(error);
      }
    };
    countData();
  }, []);

  const boxInfo = [
    {
      value: 10,
      icon: PiStudentBold,
      description: "Total Students",
      color: "bg-gradient-to-b from-indigo-600 to-purple-600 text-white",
    },
    {
      value: 100,
      icon: GrResources,
      description: "Total Resources",
      color: "bg-gradient-to-b from-emerald-600 to-green-500 text-white",
    },
    {
      value: 1,
      icon: FaUsers,
      description: "Online Users",
      color: "bg-gradient-to-b from-blue-600 to-indigo-600 text-white",
    },
    {
      value: classroomCount,
      icon: SiGoogleclassroom,
      description: classroomCount > 1 ? "Classrooms" : "Classroom",
      color: "bg-gradient-to-b from-zinc-600 to-neutral-600 text-white",
    },
  ];
  return (
    <div className="w-full flex flex-col items-start p-3">
      <Skeleton className="rounded-lg" isLoaded={loaded}>
        <h1 className="text-md font-medium">{greetings}</h1>
      </Skeleton>

      <div className="mt-6 w-full grid md:grid-cols-4 gap-3">
        <AnimatePresence>
          {boxInfo.map((item, idx) => (
            <motion.div
              key={idx}
              className={`w-full h-[130px] p-6 flex items-center justify-center flex-col gap-2 ${item.color} rounded-2xl shadow-[6px_6px_0px_black] hover:shadow-[8px_8px_0px_black] duration-500 relative overflow-hidden`}
            >
              <item.icon
                size={55}
                className="absolute bottom-1 right-1 text-white opacity-30 "
              />
              <div className="w-full flex items-center gap-4">
                <Skeleton isLoaded={loaded} className="rounded-full">
                  <div className="size-10 border-2 border-white grid place-items-center rounded-full text-white">
                    <item.icon size={25} />
                  </div>
                </Skeleton>
                <div className="flex flex-col gap-2 p-2 text-white">
                  <Skeleton className="rounded-lg" isLoaded={loaded}>
                    <p className="text-sm text-white font-semibold">
                      {item.description}
                    </p>
                  </Skeleton>
                  <div className="flex items-start">
                    <Skeleton className="rounded-lg" isLoaded={loaded}>
                      <div className="w-32">
                        <h1 className="text-2xl font-bold text-white">
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
          <h1 className="text-md font-medium">Active Students</h1>
        </Skeleton>

        <Skeleton className="rounded-lg" isLoaded={loaded}>
          <Dropdown backdrop="blur" showArrow radius="sm">
            <DropdownTrigger>
              <div className="flex gap-2">
                <button
                  className="flex items-center
         gap-2 text-xs font-bold py-2 px-3  border border-zinc-500 shadow-[4px_4px_0px_black] "
                >
                  Filter Students
                  <PiCaretUpDownFill size={15} />
                </button>
              </div>
            </DropdownTrigger>

            <DropdownMenu className="p-3">
              <DropdownItem>1st Year</DropdownItem>
              <DropdownItem>2nd Year</DropdownItem>
            </DropdownMenu>
          </Dropdown>   
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
  return (
    <>
      <Table
        aria-label="Students table"
        className="w-full border border-zinc-300 rounded-lg"
        shadow="none"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>YEAR LEVEL</TableColumn>
          <TableColumn>SECTION</TableColumn>
          <TableColumn>GAINED POINTS</TableColumn>
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
