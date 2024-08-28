import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { IoAdd } from "react-icons/io5";
import CreateClassroomModal from "../components/CreateClassroomModal";
import supabase from "../config/supabaseClient";
import {
  Button,
  Divider,
  Skeleton,
  DropdownMenu,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DeleteClassroomModal from "../components/ui/DeleteClassroomModal";
import { PiCaretUpDownFill } from "react-icons/pi";
import UpdateModal from "../components/admin_components/UpdateModal";
import ArchivedModal from "../components/admin_components/ArchivedModal";

import { DeleteIcon, EditIcon } from "../icons/Icons";
import { CgOptions } from "react-icons/cg";

export default function AdminClassroom() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  return (
    <div className="mt-16 flex ">
      <Sidebar active={active} />
      <div className="flex flex-col flex-grow">
        <AdminNavbar />
        <div className="ml-[250px] p-5 flex-grow ">
          <Content />
        </div>
      </div>
    </div>
  );
}

const Content = () => {
  const [open, setIsOpen] = useState(false);
  const [dataExist, setDataExist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFetchData = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("classrooms")
        .select()
        .order("id", { ascending: false });
      if (error) {
        console.log(error);
      }

      if (data) {
        setDataExist(data);
      }

      setIsLoading(false);
    };

    checkFetchData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between p-2 gap-4">
        <div className="flex justify-between items-center w-full gap-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold text-zinc-700">
              Welcome to your Classroom
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Dropdown backdrop="blur" className="font-SpaceGrotesk" showArrow>
              <DropdownTrigger>
                <button className="flex item-center justify-center gap-2 text-xs font-medium outline-none bg-white border border-zinc-500 shadow-[4px_4px_0px_black] py-2 px-4 text-zinc-700">
                  Filter Classroms
                  <PiCaretUpDownFill size={15} />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Static Actions"
                selectionMode="single"
                disallowEmptySelection
              >
                <DropdownItem>1st Year</DropdownItem>
                <DropdownItem key="new">2nd Year</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <button
              onClick={() => setIsOpen(true)}
              className="flex item-center justify-center gap-2 text-xs font-medium outline-none border border-indigo-600  bg-indigo-600 text-white shadow-[4px_4px_0px_black] py-2 px-4"
            >
              Create new
              <IoAdd size={15} />
            </button>
          </div>

          <CreateClassroomModal open={open} setIsOpen={setIsOpen} />
        </div>
      </div>

      {isLoading ? (
        <div className="w-full min-h-[70vh] grid place-items-center">
          <h1 className="text-xs font-medium">Loading your classrooms...</h1>
        </div>
      ) : dataExist.length === 0 ? (
        <NoData />
      ) : (
        <ClassroomList />
      )}
    </div>
  );
};

const NoData = () => {
  return (
    <div className="w-full min-h-[60vh] grid place-items-center">
      <div className="flex flex-col justify-center items-center gap-6">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?t=st=1724120325~exp=1724123925~hmac=4e282b2f089125af8fd6537ef1cac28caf4051f372909bdfb985da78d1d452b1&w=740"
          alt="image"
          className="w-[350px] object-cover"
        />
        <h1 className="font-medium text-sm text-zinc-500">
          It appears that you haven't set up a classroom yet, please create
          first.
        </h1>
      </div>
    </div>
  );
};

const ClassroomList = () => {
  const [classroomData, setClassroomData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [archivedModal, setArchivedModal] = useState(false);

  const ClassroomsStyle = [
    {
      value: "1",
      headerImg:
        "https://i.pinimg.com/564x/01/0f/1f/010f1fdb581f6a57af91f6c723f1e390.jpg",
    },
    {
      value: "2",
      headerImg:
        "https://i.pinimg.com/564x/f9/15/9b/f9159b10e2b15e1ba461bd1d8649d9a5.jpg",
    },
  ];

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const { data, error } = await supabase.from("classrooms").select("*");
        if (error) {
          console.error("Error fetching classrooms:", error.message);
          return;
        }

        const classroomsWithHeaderImg = data.map((classroom) => {
          const matchingStyle = ClassroomsStyle.find(
            (style) =>
              classroom.section && classroom.section.includes(style.value)
          );
          return {
            ...classroom,
            headerImg: matchingStyle
              ? matchingStyle.headerImg
              : ClassroomsStyle[0].headerImg,
          };
        });

        setClassroomData(classroomsWithHeaderImg);
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchClassrooms();

    // REAL-TIME UPDATES
    const channel = supabase
      .channel("classrooms-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "classrooms" },
        (payload) => {
          const handleDelete = (payload) => {
            console.log("Deleted classroom:", payload.old);
            setClassroomData((prevClassrooms) =>
              prevClassrooms.filter(
                (classroom) => classroom.id !== payload.old.id
              )
            );
          };

          const handleInsert = (payload) => {
            console.log("Added new classroom:", payload.new);
            setClassroomData((prevClassrooms) => [
              ...prevClassrooms,
              payload.new,
            ]);
          };

          const handleUpdate = (payload) => {
            console.log("Updated classroom:", payload.new);
            setClassroomData((prevClassrooms) =>
              prevClassrooms.map((classroom) =>
                classroom.id === payload.new.id ? payload.new : classroom
              )
            );
          };

          if (payload.eventType === "DELETE") {
            handleDelete(payload);
          } else if (payload.eventType === "INSERT") {
            handleInsert(payload);
          } else if (payload.eventType === "UPDATE") {
            handleUpdate(payload);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [classroomData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id) => {
    setClassroomData((prevClassrooms) => {
      return prevClassrooms.filter((classroom) => classroom.id !== id);
    });
  };

  return (
    <div className="w-full grid md:grid-cols-4 gap-4">
      {classroomData.map((data) => (
        <div
          draggable="true"
          key={data.id}
          className="flex flex-col justify-start items-start bg-white border border-zinc-500  gap-2 shadow-[6px_6px_0px_black] duration-300 ease-in"
        >
          <Link to={`/admin/classroom/${data.id}`} className="w-full">
            <Skeleton className="w-full h-[150px]" isLoaded={isLoaded}>
              <LazyLoadImage
                className="w-full h-[150px] object-cover cursor-pointer"
                src={data.headerImg}
              />
            </Skeleton>
          </Link>

          <div className="w-full flex items-start gap-4 p-3">
            <div className="w-full flex flex-col gap-1">
              <Skeleton className="w-full rounded-md" isLoaded={isLoaded}>
                <h1 className="text-lg font-bold">{data.classroom_name}</h1>
              </Skeleton>
              <Skeleton className="w-[100px] rounded-md" isLoaded={isLoaded}>
                <p className="text-sm text-zinc-500 font-bold">
                  {data.section}
                </p>
              </Skeleton>
            </div>
          </div>
          {isLoaded && <Divider />}
          <div className="w-full h-full flex justify-between items-center gap-4 p-3 mb-4">
            <Skeleton className="w-full rounded-md" isLoaded={isLoaded}>
              <p className="text-xs text-zinc-600 font-bold">
                {data.description}
              </p>
            </Skeleton>

            <Dropdown>
              <DropdownTrigger>
                <Skeleton
                  className="w-[20px] rounded-full mr-2 cursor-pointer"
                  isLoaded={isLoaded}
                >
                  <CgOptions size={20} />
                </Skeleton>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Static Actions"
                selectionMode="single"
                disallowEmptySelection
              >
                <DropdownItem onClick={() => setOpenUpdateModal(true)}>
                  Edit
                </DropdownItem>
                <DropdownItem onClick={() => setArchivedModal(true)}>
                  Archived
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSelectedClassroom(data);
                    setIsOpen(true);
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <UpdateModal
            openUpdateModal={openUpdateModal}
            setOpenUpdateModal={setOpenUpdateModal}
            classroom={data}
          />

          <DeleteClassroomModal
            open={open}
            setIsOpen={setIsOpen}
            classroom={selectedClassroom}
            onDelete={handleDelete}
          />
          <ArchivedModal
            archivedModal={archivedModal}
            setIsArchivedModal={setArchivedModal}
          />
        </div>
      ))}
    </div>
  );
};
