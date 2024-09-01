import React from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import AdminTab from "../components/AdminTab";
import Switch from "../components/admin_components/Switch";
import VideoIcon from "../icons/video.png";
import BookIcon from "../icons/books.png";

import VideoMaterials from "../components/admin_components/VideoMaterials";

import Header from "../components/admin_components/Header";
import { HiSelector } from "react-icons/hi";
import {
  Dropdown,
  Link,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import NoData from "../components/ui/NoData";

export default function CreateContent() {
  return (
    <div className="mt-16 flex relative">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <AdminNavbar />
        <div className="ml-[250px] p-5 flex-grow ">
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

      <div className="max-w-xl flex flex-col gap-2 text-sm text-zinc-600">
        <h1>
          Here, you can assign and organize classwork materials and resources.
        </h1>
      </div>
      <CreateButton />

      <InstructorContent />
    </div>
  );
};

const CreateButton = () => {
  const [videoMaterial, setVideoMaterial] = useState(false);
  return (
    <div>
      <Dropdown showArrow className="p-2 font-SpaceGrotesk" backdrop="blur">
        <DropdownTrigger>
          <button className="flex items-center gap-2 bg-indigo-600 text-white border border-indigo-500 shadow-[4px_4px_0px_black] py-3 px-5 text-sm outline-none">
            Select type
            <HiSelector />
          </button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Static Actions">
          <DropdownItem
            onClick={() => setVideoMaterial(true)}
            key="new"
            startContent={<img src={VideoIcon} className="w-5" />}
          >
            Video Materials
          </DropdownItem>
          <DropdownItem
            key="edit"
            startContent={<img src={BookIcon} className="w-5" />}
          >
            PDF Module
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <VideoMaterials
        videoMaterial={videoMaterial}
        setVideoMaterial={setVideoMaterial}
      />
    </div>
  );
};

const InstructorContent = () => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <h1 className="text-lg font-bold">Materials You've Made</h1>

      <NoData
        text="No available materials yet"
        icon="https://cdn-icons-png.flaticon.com/128/9841/9841555.png"
      />
    </div>
  );
};
