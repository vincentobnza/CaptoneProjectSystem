import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import StudentSidebar from "../components/StudentSidebar";
import GameBanner from "../assets/GameBanner.png";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Header from "../components/Header";

export default function PlayGame() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full max-w-screen-lg mx-auto flex-col p-8 overflow-y-auto space-y-14">
        <Header title="Codecian Game" description="Play Game" />
        <Banner />
      </div>
    </div>
  );
}

const Banner = () => {
  return (
    <div className="w-full flex flex-col gap-4 p-2">
      <div className="w-full self-start">
        <GameCard />
      </div>
    </div>
  );
};

const GameCard = () => {
  const SwitchTab = () => {
    window.open("http://localhost:5173/codecian-game", "_blank");
  };
  return (
    <div className="w-full grid md:grid-cols-4">
      <div className="w-full border border-zinc-300 shadow-2xl shadow-zinc-100 rounded-lg ">
        <div className="w-full flex flex-col gap-1 p-4 h-[120px]  bg-zinc-800 text-zinc-300 border border-zinc- relative rounded-tr-lg rounded-tl-lg">
          <img
            src="https://cdn-icons-png.flaticon.com/128/10490/10490256.png"
            alt="opponent"
            className="w-16 absolute top-2 right-2 opacity-30"
          />
          <h1 className="text-2xl font-medium text-white">Quiz Battle</h1>
          <p className="text-xs">Test your knowledge</p>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <p className="text-xs">
            Challenge your friends in real-time battles of wit and wisdom. Prove
            you're the ultimate quiz master!
          </p>

          <button
            onClick={SwitchTab}
            className="mt-5 self-start py-1 px-2 rounded bg-emerald-600 text-white text-xs outline-none"
          >
            Battle Now
          </button>
        </div>
      </div>
    </div>
  );
};
