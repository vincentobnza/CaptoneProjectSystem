import React from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ArchivedRooms() {
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
  return (
    <div className="w-full flex flex-col items-start p-3 space-y-8">
      <h1 className="text-lg font-bold text-zinc-700">Archived Rooms</h1>

      <NoData
        icon="https://cdn-icons-png.flaticon.com/128/11229/11229557.png"
        text="No archived rooms for now."
      />
    </div>
  );
};

const NoData = ({ icon, text }) => {
  return (
    <div className="w-full h-[300px] grid place-items-center text-zinc-500">
      <div className="flex flex-col justify-center items-center gap-6">
        <img src={icon} className="w-20" />
        <h1 className="text-xs font-medium">{text}</h1>
      </div>
    </div>
  );
};
