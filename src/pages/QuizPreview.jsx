import React from "react";

export default function QuizPreview({ title, description }) {
  return (
    <div className="w-full h-screen flex justify-start items-start p-10">
      <div className="w-full max-w-screen-lg mx-auto p-5 flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm font-semibold text-zinc-600">{description}</p>
      </div>
    </div>
  );
}
