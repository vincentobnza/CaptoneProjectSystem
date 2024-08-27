import React from "react";
import Navbar from "../components/Navbar";
import LevelHeader from "../components/LevelHeader";

export default function AdvancedLevel() {
  return (
    <div>
      <Navbar />
      <div className="space-y-4">
        <LevelHeader
          title="Advanced Level"
          description="Enhance your skills with advanced web development tools and techniques."
        />
      </div>
    </div>
  );
}
