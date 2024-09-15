import React from "react";
import Navbar from "../components/Navbar";
import StudentSidebar from "../components/StudentSidebar";
import NoData from "../components/ui/NoData";
import Header from "../components/Header";

export default function Modules() {
  return (
    <div className="w-full">
      <Navbar />

      <div className="w-full max-w-screen-lg mx-auto flex-col p-8 overflow-y-auto space-y-14">
        <Header
          title="School Modules"
          description="View all your intructor modules"
        />
        <Content />
      </div>
    </div>
  );
}

const Content = () => {
  return (
    <div className="w-full flex flex-col gap-2 p-3">
      <NoData
        icon="https://cdn-icons-png.flaticon.com/128/7486/7486765.png"
        text="No modules has been addet yet by your instructor."
      />
    </div>
  );
};
