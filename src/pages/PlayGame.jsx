import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import StudentSidebar from "../components/StudentSidebar";
import GameBanner from "../assets/GameBanner.png";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
export default function PlayGame() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full max-w-screen-xl mx-auto flex flex-col">
        <div className="flex flex-1 gap-2 h-full">
          <div className="h-full">
            <StudentSidebar />
          </div>
          <div className="flex-1 flex-col justify-center items-center p-4 overflow-y-auto space-y-10">
            <Banner />
          </div>
        </div>
      </div>
    </div>
  );
}

const Banner = () => {
  return (
    <div className="mt-8 w-full flex flex-col gap-4">
      <h1 className="text-lg font-bold">Codecian Games</h1>

      <div className="self-start">
        <GameCard />
      </div>
    </div>
  );
};

const GameCard = () => {
  return (
    <Card isFooterBlurred radius="lg" className="border-none">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={300}
        src={GameBanner}
        width={300}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">Available Now</p>
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          Play now
        </Button>
      </CardFooter>
    </Card>
  );
};
