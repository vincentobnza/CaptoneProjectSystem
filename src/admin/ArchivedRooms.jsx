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
    <div className="w-full flex flex-col items-start p-3">
      <h1 className="text-lg font-bold text-zinc-700">Archived Rooms</h1>{" "}
    </div>
  );
};
