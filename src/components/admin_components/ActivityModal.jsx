import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Switch, DatePicker } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";
import { Select, SelectItem } from "@nextui-org/react";

import { now, getLocalTimeZone, parseDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

export default function ActivityModal({ open, setOpen, task }) {
  const [isSelected, setIsSelected] = useState(false);
  const [points, setPoints] = useState(0);
  const [pointsError, setPointsError] = useState("");
  const MAXIMUM_POINTS = 100;

  const handlePointsChange = (e) => {
    const value = Number(e.target.value);

    if (isNaN(value)) {
      setPointsError("Please enter a valid number");
      return;
    }

    if (value > MAXIMUM_POINTS) {
      setPointsError("Maximum points is 100");
      setPoints(0);
    } else {
      setPoints(value);
      setPointsError("");
    }
  };
  const handleTimerChange = (e) => {
    const value = e.target.value;

    if (isNaN(value)) {
      setPointsError("Please enter a valid number");
      return;
    }

    if (value > MAXIMUM_POINTS) {
      setPointsError("Maximum points is 100");
      setPoints(0);
    } else {
      setPoints(value);
      setPointsError("");
    }
  };

  const handleSwitch = () => [setIsSelected(!isSelected), setPoints(0)];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={() => setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-zinc-950/20 grid place-items-center z-[100] p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-full h-[95vh] flex flex-col mx-auto max-w-screen-lg bg-white relative overflow-scroll rounded-xl"
          >
            <div className="sticky top-0 bg-white  z-30  w-full py-3 px-5 border-b border-zinc-200 flex justify-between items-center">
              <div
                onClick={() => setOpen(false)}
                className="flex gap-2 items-center cursor-pointer hover:opacity-60 text-zinc-400 hover:text-black text-sm"
              >
                <IoCaretBack />
                BACK
              </div>
              <button
                disabled={true}
                className="px-6 py-2 bg-indigo-600 text-sm font-bold text-white  disabled:cursor-not-allowed shadow-[4px_4px_0px_black]"
              >
                Distribute
              </button>
            </div>
            <div className="w-full h-screen flex gap-1 p-6">
              <div className="basis-1/2 w-full relative p-2">
                <div className="flex flex-col gap-2">
                  <div className="w-[90%]">
                    <h1 className="text-2xl font-bold">{task.title}</h1>
                  </div>
                  <p className="self-start text-sm font-bold px-2 py-1 bg-green-50 text-emerald-700 rounded-full">
                    <span>Type:</span> {task.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-1 mt-3">
                      <h1 className="font-semibold">Objectives</h1>
                      <p className="text-sm text-zinc-500">{task.objective}</p>
                    </div>
                    <div className="flex flex-col gap-1 mt-3">
                      <h1 className="font-semibold">Deliverables</h1>
                      <p className="text-sm text-zinc-500">
                        {task.deliverables}
                      </p>
                    </div>

                    <div className="w-full p-3 bg-yellow-50 border-l-2 border-yellow-500">
                      <p className="text-sm font-semibold">{task.help}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="basis-1/2 w-full flex flex-col p-2 activity">
                <div className="flex flex-col gap-2">
                  <div className="w-full flex justify-between items-center mb-3">
                    <h1 className="font-medium">Output should like this:</h1>

                    <h3 className="text-sm font-bold">
                      Points to earned: {""}
                      <span className="text-emerald-600 px-2 rounded-full bg-emerald-50 border border-emerald-100">
                        {points} pts
                      </span>
                    </h3>
                  </div>
                  <img
                    src={task.output}
                    className="w-full h-[260px] border border-zinc-200 rounded"
                  />
                  <div className="w-full p-3 flex justify-between items-center rounded bg-zinc-50 border border-zinc-200 gap-8">
                    <div className="flex flex-col gap-1">
                      <p className="text-medium">Enable Points Accumulation</p>
                      <p className="text-tiny text-default-400">
                        When points accumulation is enabled{" "}
                        <Link className="text-emerald-600 underline font-bold">
                          Read here
                        </Link>
                      </p>
                    </div>
                    <div className="h-full">
                      <Switch
                        isSelected={isSelected}
                        onValueChange={handleSwitch}
                        color="success"
                      ></Switch>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        className="flex flex-col gap-2"
                      >
                        <div className="w-full flex justify-between items-center">
                          <p className="text-sm">Points</p>
                          <p className="text-xs text-red-500 font-semibold">
                            {pointsError}
                          </p>
                        </div>
                        <input
                          type="text"
                          value={points}
                          onChange={handlePointsChange}
                          autoFocus
                          className="flex w-full h-12 px-3 border border-zinc-300 outline-none focus:border-2 focus:ring-1 focus:ring-emerald-200 ring-offset-4 focus:border-emerald-500 transition duration-300 rounded placeholder:text-sm"
                          placeholder="Enter points here"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div>
                    <Deadline />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Deadline = () => {
  const [value, setValue] = useState(now(getLocalTimeZone()));

  let formatter = useDateFormatter({ dateStyle: "full" });

  return (
    <div className="mt-3 w-full max-w-xl flex flex-col gap-2">
      <h1 className="text-sm font-semibold text-zinc-500">Set a due</h1>
      <DatePicker
        value={value}
        onChange={setValue}
        label="Chooose your deadline"
        variant="underlined"
        hideTimeZone
        showMonthAndYearPickers
        defaultValue={now(getLocalTimeZone())}
      />
    </div>
  );
};
