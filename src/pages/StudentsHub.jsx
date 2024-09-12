import React from "react";
import Navbar from "../components/Navbar";
import NoData from "../components/ui/NoData";
import { Skeleton } from "@nextui-org/react";

export default function StudentsHub() {
  return (
    <div className="space-y-4 text-zinc-800">
      <Navbar />
      <Header />
    </div>
  );
}

const Header = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const toggleSkeletonLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  };
  toggleSkeletonLoad();

  return (
    <div className="w-full flex justify-between items-center max-w-screen-lg mx-auto p-5">
      <div className="flex flex-col gap-2">
        <Skeleton
          isLoaded={isLoaded}
          className="w-38 self-start px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium"
        >
          Students Hub
        </Skeleton>
        <Skeleton
          isLoaded={isLoaded}
          className="w-60 text-4xl font-medium rounded-full"
        >
          Explore.
        </Skeleton>
        <Skeleton
          isLoaded={isLoaded}
          className="w-80 text-sm text-zinc-500 rounded-full"
        >
          Explore all achievements posting here
        </Skeleton>
      </div>
    </div>
  );
};
