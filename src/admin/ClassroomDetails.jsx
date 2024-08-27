import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import AdminTab from "../components/AdminTab";
import { CgWebsite } from "react-icons/cg";
import { MdHorizontalDistribute } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
import Switch from "../components/admin_components/Switch";
import { IoExpand } from "react-icons/io5";
import { LuEyeOff } from "react-icons/lu";
import Header from "../components/admin_components/Header";
import NoData from "../components/ui/NoData";

export default function ClassroomDetails() {
  const { id } = useParams();

  const [classroom, setClassroom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classCode, setClassCode] = useState(null);
  const [classroomName, setClassroomName] = useState(null);
  const [section, setSection] = useState(null);

  useEffect(() => {
    const fetchClassroomDetails = async () => {
      const { data, error } = await supabase
        .from("classrooms")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching classroom details:", error.message);
      } else {
        setClassroom(data);
        setClassCode(data.class_code);
        setClassroomName(data.classroom_name);
        setSection(data.section);
      }

      setIsLoading(false);
    };

    fetchClassroomDetails();
  }, [classCode, id]);

  return (
    <div className="mt-16 flex relative">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <AdminNavbar />
        <div className="ml-[250px] p-5 flex-grow ">
          <Content
            classroom={classroom}
            classCode={classCode}
            classroomName={classroomName}
            section={section}
          />
        </div>
      </div>

      {/* Switch between rooms */}
      <Switch />
    </div>
  );
}

const Content = ({ classroom, classCode, classroomName, section }) => {
  return (
    <div className="w-full space-y-6">
      <AdminTab />
      <HeaderBg
        classCode={classCode}
        classroomName={classroomName}
        section={section}
      />

      <Header
        title="Overview"
        description="View, manage, and distribute all system provided materials"
      />
      <div className="space-y-10">
        <ResourcesMaterials />
        <InstructorMaterials />
      </div>
    </div>
  );
};

const HeaderBg = ({ classCode, classroomName, section }) => {
  //Date now
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="mt-5 w-full flex p-6 justify-between items-center h-[200px] headerBg rounded-2xl text-zinc-200">
      <div className="flex flex-col gap-2 h-full p-3">
        <h1 className="text-xs font-semibold text-zinc-300">{formattedDate}</h1>
        <h1 className="text-4xl font-bold text-white">{classroomName}</h1>
        <div className="mt-3 self-start px-3 py-1 bg-zinc-900/40 backdrop-blur border border-zinc-600 rounded-lg">
          <p>Section {section}</p>
        </div>
      </div>

      <div className="w-[300px] h-[150px] rounded-2xl bg-zinc-900/40 backdrop-blur border border-zinc-700 flex justify-start items-start flex-col gap-2 p-6 text-zinc-400 relative overflow-hidden shadow-2xl ">
        <h3 className="font-bold">Class code</h3>
        <h1 className="text-3xl font-bold text-white">{classCode}</h1>

        <div className="absolute top-3 right-3 flex item-center gap-4 text-zinc-400">
          <LuEyeOff className="cursor-pointer" />
          <IoExpand className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const ResourcesMaterials = () => {
  const List = [
    {
      key: 1,
      title: "Basics Level",
      description:
        "Start your journey into web development by mastering the core technologies of the web: HTML, CSS, and JavaScript.",
      color: "text-zinc-600",
    },
    {
      key: 2,
      title: "Intermediate Level",
      description:
        "Take your web development skills to the next level by diving deeper into HTML, CSS, and JavaScript.",
      color: "text-indigo-600",
    },
  ];

  return (
    <div className="w-full grid md:grid-cols-3 gap-4">
      {List.map((item, index) => (
        <div key={index} className="w-full flex flex-col">
          <div className="w-full  p-5 rounded-lg border border-zinc-200 flex flex-col gap-2">
            <CgWebsite size={25} className={`${item.color} mb-3`} />
            <h1 className="text-lg font-bold">{item.title}</h1>
            <p className="text-sm text-zinc-600">{item.description}</p>

            <MdHorizontalDistribute className="mt-5 cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
};

const InstructorMaterials = () => {
  return (
    <div>
      <Header
        title="Materials You've Made"
        description="View, manage, and distribute all materials you've made in this classroom"
      />

      <NoData
        text="No materials have been added yet."
        icon="https://cdn-icons-png.flaticon.com/128/7486/7486766.png"
      />
    </div>
  );
};
