import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../assets/404_NOT_FOUND.gif";

export default function NotFound() {
  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="flex flex-col justify-center items-center text-center gap-2">
        <img
          src="https://i.pinimg.com/564x/c7/8f/65/c78f6507972d3c21e290ea660a812433.jpg"
          className="w-[300px]"
        />
        <h1 className="text-3xl font-semibold">Page Not Found</h1>
        <p className="text-sm font-medium text-zinc-500">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
