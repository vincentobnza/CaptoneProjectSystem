import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 inset-0 backdrop-blur grid place-items-center">
      <BeatLoader size={8} color="#64748b" />
    </div>
  );
}
