import Code from "../icons/code.png";
import Assignment from "../icons/assignment.png";
import Quiz from "../icons/quiz.png";
import Sidebar from "../components/Sidebar";
import { HiSelector } from "react-icons/hi";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { IoIosOpen } from "react-icons/io";
import { IoOpenOutline } from "react-icons/io5";
import NoTask from "../components/ui/NoData";
import AdminNavbar from "../components/AdminNavbar";
import Switch from "../components/admin_components/Switch";
import AdminTab from "../components/AdminTab";
import NoData from "../components/ui/NoData";

export default function ClassroomStudents() {
  return (
    <div className="mt-16 flex relative">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <AdminNavbar />
        <div className="ml-0 md:ml-[250px] p-5 flex-grow ">
          <Content />
        </div>
      </div>

      <Switch />
    </div>
  );
}

const Content = () => {
  return (
    <div className="w-full space-y-6">
      <AdminTab />

      <div className="space-y-10">
        <NoData
          text="No students yet"
          icon="https://cdn-icons-png.flaticon.com/128/4041/4041312.png"
        />
      </div>
    </div>
  );
};
