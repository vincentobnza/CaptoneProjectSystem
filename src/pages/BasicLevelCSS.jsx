import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import LevelHeader from "../components/LevelHeader";

export default function BasicLevelCSS() {
  return (
    <div>
      <Navbar />
      <div className="space-y-4">
        <LevelHeader
          title="Basic Level"
          description="Build your foundation in a modern web development."
        />
      </div>
    </div>
  );
}
