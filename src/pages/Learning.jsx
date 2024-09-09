import React from "react";
import Navbar from "../components/Navbar";
import StudentSidebar from "../components/StudentSidebar";
import NoData from "../components/ui/NoData";

export default function Learning() {
  return (
    <div className="w-full max-w-screen-xl mx-auto flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 gap-2 h-full">
        <div className="h-full">
          <StudentSidebar />
        </div>
        <div className="flex-1 flex-col p-4 overflow-y-auto space-y-10">
          <Content />
        </div>
      </div>
    </div>
  );
}

const Content = () => {
  return (
    <div className="mt-8 w-full flex flex-col gap-2">
      <h1 className="text-lg font-bold">My Learnings</h1>

      <NoData
        icon="https://cdn-icons-png.flaticon.com/128/7486/7486765.png"
        text="No content available yet"
      />
    </div>
  );
};
