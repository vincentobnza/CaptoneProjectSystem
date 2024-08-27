import React from "react";
import { Divider, Skeleton } from "@nextui-org/react";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function OnlineResources() {
  return (
    <div>
      <div className="space-y-10">
        <Navbar />
        <Content />

        <Cards />
      </div>
    </div>
  );
}
const Content = () => {
  const currentHour = new Date().getHours();
  let greetings;

  if (currentHour >= 5 && currentHour < 12) {
    greetings = "Good Morning 🌞";
  } else if (currentHour >= 12 && currentHour < 18) {
    greetings = "Good Afternoon 🌤️";
  } else if (currentHour >= 18 && currentHour < 22) {
    greetings = "Good Evening 🌛";
  }
  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col  text-zinc-700 relative">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col self-start gap-2">
          <h1 className="text-2xl font-bold">{greetings}</h1>
          <p className="text-sm text-zinc-500">
            Welcome to your virtual classroom
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col space-y-1">
            <h3 className="text-xs font-semibold text-zinc-400">
              Your Instructor Here
            </h3>
            <h1 className="font-bold text-md">Unknown</h1>
          </div>

          <img
            src="https://i.pinimg.com/564x/bf/43/0a/bf430a0a0850d18841c14fecfb6e64e3.jpg"
            className="size-12 rounded-full border border-zinc-300"
          />
        </div>
      </div>
      <div className="mt-5">
        <Divider className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-small">
          <Link to="/classroom" className="text-zinc-300">
            Your Classroom
          </Link>
          <Divider orientation="vertical" />
          <Link to="/online-resources" className=" text-zinc-700 font-medium">
            Online Resources
          </Link>
        </div>
      </div>
    </div>
  );
};

function Cards() {
  return (
    <div className="mt-5 w-full max-w-screen-lg mx-auto grid place-items-center gap-2">
      <div className="w-full max-w-screen-lg mx-auto flex justify-between items-center text-left">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Explore and Learn</h1>
          <p className="text-sm font-semibold text-zinc-700">
            Level up your web development skills
          </p>
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2 gap-2 mt-12">
        <div className="relative w-full flex justify-start items-start flex-col gap-2 rounded-lg bg-white border border-zinc-200 p-4 shadow-2xl shadow-zinc-200">
          <img
            src="https://i.pinimg.com/564x/f2/2d/2a/f22d2afa19665d3dcf1d1480f1f527c2.jpg"
            className="w-full h-[280px] rounded-tr-lg rounded-tl-lg object-cover"
          ></img>
          <h1 className="text-3xl font-semibold mt-4">Basic Level</h1>
          <h3 className="font-semibold">Building your foundation</h3>
          <p className="mt-2 text-zinc-600 text-sm font-medium">
            Start your journey into web development by mastering the core
            technologies of the web: HTML, CSS, and JavaScript.
          </p>
          <div className="mt-5 w-full flex justify-end p-3">
            <Link
              to="/basic-level-html/resources=online"
              className="flex justify-center items-center px-4 py-3 text-sm border border-zinc-200 text-zinc-500  hover:bg-zinc-700 hover:text-white transition-all duration-300"
            >
              Start Level
            </Link>
          </div>
        </div>
        <div className="w-full flex items-start justify-start flex-col gap-2 rounded-lg bg-white border border-zinc-200 p-4 shadow-2xl shadow-zinc-200">
          <img
            src="https://i.pinimg.com/564x/41/2e/a7/412ea792b6963690a4a9dce67b73f216.jpg"
            className="w-full h-[280px] rounded-tr-lg rounded-tl-lg object-cover"
          ></img>
          <h1 className="text-3xl font-semibold mt-4">Intermediate Level</h1>
          <h3 className="font-semibold">Enhancing your skills</h3>
          <p className="mt-2 text-zinc-600 text-sm font-medium">
            Take your web development skills to the next level by diving deeper
            into HTML, CSS, and JavaScript.
          </p>
          <div className="mt-5 w-full flex justify-end p-3">
            <Link
              to="/basic-level-html"
              className="flex justify-center items-center px-4 py-3 text-sm border border-zinc-200 text-zinc-500  hover:bg-zinc-700 hover:text-white transition-all duration-300"
            >
              Start Level
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
