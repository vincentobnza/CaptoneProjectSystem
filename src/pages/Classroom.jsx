import Navbar from "../components/Navbar";
import { Divider, Skeleton } from "@nextui-org/react";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
export default function Classroom() {
  return (
    <div>
      <div className="space-y-10">
        <Navbar />
        <Content />
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
          <Link to="/" className="text-zinc-700 font-medium">
            Your Classroom
          </Link>
          <Divider orientation="vertical" />
          <Link to="/online-resources" className="text-zinc-300">
            Online Resources
          </Link>
        </div>
      </div>
    </div>
  );
};
