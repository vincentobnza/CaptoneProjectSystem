import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox, cn } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";

export default function EnablePolicy({ open, setOpen }) {
  const PolicyList = [
    {
      id: 1,
      title: "Student Awareness:",
      description:
        " Enabling the leaderboard will make student scores visible in a ranked format. This may create competition among students and could lead to misunderstandings or confusion regarding their scores.",
    },
    {
      id: 2,
      title: "Potential for Confusion:",
      description:
        "Some students may find the leaderboard format confusing, particularly if their scores fluctuate or if they are not familiar with how the leaderboard ranks are calculated. It is recommended to explain the leaderboard system to students in advance to minimize any potential confusion.",
    },
    {
      id: 3,
      title: "Teacher Responsibility:",
      description:
        "As the teacher, you are responsible for monitoring the leaderboard and addressing any concerns or questions that students may have about their scores and rankings.",
    },
    {
      id: 4,
      title: "Opt-Out Option:",
      description:
        "If you believe that the leaderboard may negatively impact your students, you have the option to disable this feature at any time.",
    },
  ];

  const [disable, setDisable] = useState(true);

  const handleTerms = () => {
    if (!disable) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-zinc-900/40 grid place-items-center z-[100] p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl h-[600px] bg-white p-8 rounded flex flex-col gap-2 justify-start items-start space-y-2 activity relative"
            >
              <img
                src="https://img.icons8.com/?size=48&id=d9blyrcKb0zb&format=png"
                className="w-8"
              />
              <h1 className="font-bold text-lg">Terms and Policy</h1>

              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">
                  By enabling the "Leaderboards on Students" feature, you
                  acknowledge and agree to the following:
                </p>
              </div>

              <ul className="flex flex-col gap-3 p-4">
                {PolicyList.map((item) => (
                  <li className="list-decimal text-sm">
                    <span className="font-black">{item.title}</span>{" "}
                    <span className="text-zinc-600">{item.description}</span>
                  </li>
                ))}
              </ul>

              <div>
                <h3 className="text-sm">
                  Please check the box below to confirm that you have read and
                  understood the terms and policy regarding the "Enable
                  Leaderboards on Students" feature.
                </h3>
              </div>
              <div>
                <Checkbox
                  onValueChange={handleTerms}
                  color="success"
                  classNames={{
                    base: cn("text-xs"),
                    label: "text-sm",
                  }}
                >
                  I agree to the terms and policy.
                </Checkbox>
              </div>

              <div className="absolute top-2 right-2 cursor-pointer">
                <IoClose size={20} onClick={() => setOpen(false)} />
              </div>
              <button
                disabled={disable}
                className="self-end py-4 px-6 rounded-full bg-zinc-700 text-white text-xs font-bold disabled:bg-zinc-300 disabled:cursor-not-allowed"
              >
                I agree to the terms and policy
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
