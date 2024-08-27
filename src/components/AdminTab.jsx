import React from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AdminTab() {
  const { id } = useParams();
  const { pathname } = useLocation(); // Access the pathname property directly
  return (
    <div className="sticky top-14 flex w-full flex-col bg-white z-50">
      <Tabs
        selectedKey={pathname} // Use the pathname property directly
        aria-label="Options"
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#161616]",
          tab: "max-w-fit px-0 h-12 text-xs font-semibold text-zinc-800",
          tabContent: "group-data-[selected=true]:text-[#121212]",
        }}
      >
        <Tab
          href={`/admin/classroom/${id}`}
          key="overview"
          title={
            <div className="flex items-center space-x-2">
              <span>Overview</span>
            </div>
          }
        />
        <Tab
          key="content"
          href={`/admin/classroom/create-content/${id}`}
          title={
            <div className="flex items-center space-x-2">
              <span>Create Materials</span>
            </div>
          }
        />

        <Tab
          key="videos"
          href={`/admin/classroom/create-task/${id}`}
          title={
            <div className="flex items-center space-x-2">
              <span>Tasks</span>
            </div>
          }
        />
        <Tab
          href={`/admin/classroom/students/${id}`}
          key="students"
          title={
            <div className="flex items-center space-x-2">
              <span>Students</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
}
