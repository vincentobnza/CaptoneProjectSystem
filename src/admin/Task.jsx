import AdminNavbar from "../components/AdminNavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import AdminTab from "../components/AdminTab";
import Switch from "../components/admin_components/Switch";
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
  button,
} from "@nextui-org/react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { LuDices } from "react-icons/lu";
import { IoOpenOutline } from "react-icons/io5";
import NoData from "../components/ui/NoData";
import ActivityModal from "../components/admin_components/ActivityModal";
import { PredefinedTask } from "../task/PredefinedTask";

export default function Task() {
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

      <div className="max-w-xl flex flex-col gap-2 text-sm text-zinc-600">
        <h1>Here, you can assign and organize task materials and resources.</h1>
      </div>
      <div className="space-y-10">
        <CreateButton />
        <PredefinedTasks />

        <InstructorTask />
      </div>
    </div>
  );
};

const CreateButton = () => {
  const [quiz, setQuiz] = useState(false);
  return (
    <div>
      <Dropdown showArrow backdrop="blur" className="p-2 font-SpaceGrotesk">
        <DropdownTrigger>
          <button className="flex items-center gap-2 bg-emerald-500 text-white shadow-[4px_4px_0px_black] py-3 px-5 text-sm outline-none">
            Select type
            <HiSelector />
          </button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Static Actions">
          <DropdownItem
            onClick={() => setQuiz(!quiz)}
            key="quiz"
            startContent={<img src={Quiz} className="w-5" />}
          >
            Quizzes
          </DropdownItem>

          <DropdownItem
            key="code"
            startContent={<img src={Code} className="w-5" />}
          >
            Supplemental Activities
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const PredefinedTasks = () => {
  const [open, setOpen] = useState(false);
  const [currentTask, setTask] = useState(null);

  const handleModalOpen = (task) => {
    setTask(task);
    setOpen(true);
  };

  return (
    <div className="w-full flex flex-col space-y-6 text-zinc-800">
      <div className="w-full flex justify-between items-center gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold">System's Predefined Tasks</h1>
          <p className="text-sm text-zinc-500">
            Supplemental Activities in JavaScript
          </p>
        </div>

        <RandomTaskButton />
      </div>

      <div className="w-full grid md:grid-cols-4 gap-4">
        {PredefinedTask.map((task) => (
          <div
            key={task.id}
            className="w-full bg-gradient-to-br from-white via-zinc-50 to-zinc-100 border border-zinc-300 rounded-2xl p-4 relative shadow-2xl shadow-zinc-100 overflow-hidden"
          >
            <div className="flex h-[180px] flex-col items-start justify-start gap-4 relative">
              <img src={Code} className="w-10" />
              <div className="flex flex-col gap-2">
                <h1 className="text-md font-bold">{task.title}</h1>

                <div className="flex items-center gap-2">
                  <p className="text-xs text-emerald-600 font-bold">
                    {task.description}
                  </p>
                </div>

                <div
                  onClick={() => handleModalOpen(task)}
                  className="absolute bottom-0 left-0 p-1  bg-white border border-zinc-500 shadow-[2px_2px_0px_black] cursor-pointer hover:opacity-60"
                >
                  <IoOpenOutline size={20} className="text-zinc-900" />
                </div>

                {/* Open Activity Modal */}
                {currentTask && (
                  <ActivityModal
                    open={open}
                    setOpen={setOpen}
                    task={currentTask}
                  />
                )}
              </div>
            </div>

            <div
              className={
                task.status === "Not active"
                  ? "absolute top-2 right-2 rounded-full text-zinc-400"
                  : "absolute top-2 right-2 rounded-full text-green-500"
              }
            >
              <BsFillLightningChargeFill />
            </div>

            <div className="absolute -bottom-1 right-0 -rotate-[25deg] grayscale">
              <img
                src="https://cdn-icons-png.flaticon.com/128/136/136530.png"
                className="w-20"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InstructorTask = () => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <h1 className="text-lg font-bold">Tasks You've Made</h1>

      <NoData
        text="No available tasks yet"
        icon="https://cdn-icons-png.flaticon.com/128/7486/7486820.png"
      />
    </div>
  );
};

const RandomTaskButton = () => {
  return (
    <button className="flex items-center gap-2 text-xs bg-yellow-200 text-black font-black py-2 px-3 border border-zinc-500 shadow-[4px_4px_0px_black] outline-none ">
      Random Pick
      <LuDices size={16} />
    </button>
  );
};
