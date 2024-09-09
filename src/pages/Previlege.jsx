import React from "react";
import { Link } from "react-router-dom";

export default function Previlege() {
  const benefits = [
    {
      title: "Point Accumulation",
      description:
        "All programming-related assessments and activities conducted through the LMS will contribute to a student's total points.",
    },
    {
      title: "Point Collection",
      description:
        "Programming teachers will collect and track these points throughout the academic term.",
    },
    {
      title: "Curriculum Integration",
      description:
        "At the end of each term, the points accumulated from the LMS Assessments will be added to the students' grades as part of their curriculum activities. This integration ensures that students who engage actively and perform well in the LMS Assessments are rewarded accordingly in their academic performance.",
    },
  ];
  return (
    <div className="w-full h-screen grid place-items-center p-10 relative mt-5">
      <div className="w-full max-w-screen-sm mx-auto flex flex-col gap-2 justify-start ">
        <img
          src="http://images.unsplash.com/photo-1605379399642-870262d3d051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8cHJvZ3JhbW1pbmd8fDB8fHx8MTYzMTQ4MTI5Mw&ixlib=rb-1.2.1&q=80&w=1080"
          className="w-full rounded-lg mb-5"
          alt=""
        />
        <h1 className="text-lg font-semibold">
          Privilege Note 📝 : Integration of LMS Assessment Points into
          Curriculum Activities
        </h1>
        <p className="text-sm font-semibold text-zinc-600">
          To enhance the academic experience and incentivize active
          participation in coding activities, a new privilege has been
          instituted within the LMS framework. Students who accumulate points
          through the LMS Assessments will benefit from the following:
        </p>

        <ul className="p-5 flex flex-col gap-3">
          {benefits.map((benefit, index) => (
            <li
              key={index}
              className="text-sm font-medium text-zinc-600 list-disc"
            >
              <span className="text-yellow-700 bg-yellow-50 rounded-full px-2 font-semibold">
                {benefit.title}
              </span>{" "}
              : {benefit.description}
            </li>
          ))}
        </ul>

        <div className="mb-10 w-full p-5 border-l-2 border-yellow-600 bg-yellow-50 text-yellow-700  font-semibold text-xs">
          <p>
            This system aims to motivate students to participate actively in the
            LMS Assessments and recognize their efforts and achievements within
            the official grading system.
          </p>
        </div>
      </div>

      <div className="absolute top-1 left-5 text-sm font-semibold">
        <Link to="/assessments">↩ Back</Link>
      </div>
    </div>
  );
}
