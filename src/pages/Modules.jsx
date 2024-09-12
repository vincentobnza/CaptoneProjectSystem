import React from "react";
import Navbar from "../components/Navbar";
import StudentSidebar from "../components/StudentSidebar";
import NoData from "../components/ui/NoData";

export default function Modules() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex px-5 py-1">
        <StudentSidebar />
        <div className="ml-64 flex-1 flex-col p-4 overflow-y-auto space-y-10">
          <Content />
        </div>
      </div>
    </div>
  );
}

const Content = () => {
  return (
    <div className="mt-8 w-full flex flex-col gap-2 p-3">
      <h1 className="text-lg font-medium">School Modules</h1>

      <NoData
        icon="https://cdn-icons-png.flaticon.com/128/7486/7486765.png"
        text="No modules has been addet yet by your instructor."
      />
    </div>
  );
};
