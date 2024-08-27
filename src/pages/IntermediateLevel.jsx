import React from "react";
import Navbar from "../components/Navbar";
import LevelHeader from "../components/LevelHeader";

export default function IntermediateLevel() {
  return (
    <div>
      <Navbar />
      <div className="space-y-4">
        <LevelHeader
          title="Intermediate Level"
          description="Develop your skills in advanced web development tools and techniques."
        />
      </div>
    </div>
  );
}
