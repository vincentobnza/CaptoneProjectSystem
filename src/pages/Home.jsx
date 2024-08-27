import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { SignedIn, useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { SignInButton } from "@clerk/clerk-react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { BsFillLightningFill } from "react-icons/bs";
import { FaBullseye } from "react-icons/fa";
import Cube from "../assets/cube.png";
import { FaBoltLightning } from "react-icons/fa6";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="space-y-10">
        <Hero />
        <Content />
        <Support />
        <Main />
      </div>
    </div>
  );
}

const Hero = () => {
  const { isSignedIn } = useAuth();
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);

  const handleClick = () => {
    if (isSignedIn) {
      ref.current.complete();
    }
  };

  return (
    <div className="w-full h-screen p-5">
      <section className="w-full max-w-screen-xl min-h-[75vh] mx-auto mt-5 p-5 md:p-8 flex justify-start items-center gap-2 relative">
        <div className="w-full max-w-screen-sm flex justify-start items-start text-left flex-col gap-2 p-3 relative">
          <div className="flex items-center gap-2 text-sm px-3 py-1 bg-white shadow-[4px_4px_0px_black] border border-zinc-500 text-zinc-700 rounded-full font-bold mb-3">
            Code Brain
            <FaBoltLightning />
          </div>
          <h1 className="text-3xl md:text-6xl font-semibold mb-4">
            Elevate Your Coding Skills with Our Interactive LMS
          </h1>
          <p className="text-sm text-zinc-600">
            Provides hands-on, supplemental activities to master HTML, CSS, and
            JavaScript—especially tailored to deepen your understanding of
            JavaScript.
          </p>
          <div className="flex mt-8">
            {isSignedIn ? (
              <Link to="/explore">
                <button className="flex justify-center items-center gap-2 py-4 px-8 bg-slate-700 text-white  transition duration-500 text-sm font-medium tracking-wide shadow-[4px_4px_0px_black]">
                  Get Started
                  <FaArrowRightLong />
                </button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="flex justify-center items-center gap-2 py-4 px-8 bg-slate-700 text-white  transition duration-500 text-sm font-medium  tracking-wideshadow-[4px_4px_0px_black]">
                  Get Started
                  <FaArrowRightLong />
                </button>
              </SignInButton>
            )}
          </div>
        </div>

        <div className="hidden md:flex ld:flex absolute right-5 bottom-10">
          <img src={Cube} className="w-[450px]" />
        </div>
      </section>
    </div>
  );
};

const Content = () => {
  const list = [
    {
      icon: IoCheckmarkDoneCircleSharp,
      title: "Easy",
      description:
        "Our platform simplifies the learning process, making it accessible for beginners to start their web development journey.",
      color: "p-2 rounded-full bg-emerald-50 text-emerald-600",
    },
    {
      icon: BsFillLightningFill,
      title: "Comprehensive",
      description:
        "Access a full spectrum of resources, from foundational concepts to advanced techniques, ensuring a thorough understanding of web development.",
      color: "p-2 rounded-full bg-amber-50 text-amber-600",
    },
    {
      icon: FaBullseye,
      title: "Future Ready",
      description:
        "Stay ahead with the latest tools and technologies, preparing you to meet the demands of the ever-evolving web development industry.",
      color: "p-2 rounded-full bg-sky-50 text-sky-600",
    },
  ];
  return (
    <section className="w-full max-w-screen-lg mx-auto flex flex-col justify-center items-center gap-2 p-4">
      <h1 className="text-xl font-semibold mb-8">Learn Web Development</h1>

      <div className="w-full grid md:grid-cols-3 gap-4">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="w-full flex justify-start items-center text-center flex-col space-y-3 p-8 bg-white shadow-[8px_8px_0px_black] border-2 border-zinc-500"
          >
            <div className="rounded-full p-2 bg-white shadow-[4px_4px_0px_black] border border-zinc-500">
              <item.icon size={30} />
            </div>
            <h1 className="text-xl font-bold">{item.title}</h1>
            <p className="text-sm text-zinc-700 font-semibold">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Support = () => {
  const { isSignedIn } = useAuth();
  return (
    <section className="w-full md:min-h-[80vh] lg:min-h-[80vh] max-w-screen-xl mx-auto p-8 flex justify-center items-center gap-2">
      <div className="hidden md:flex basis-1/2">
        <img
          src="https://i.pinimg.com/564x/c5/6f/58/c56f5806f9abedb2f2793477c0cfa529.jpg"
          className="w-[450px]"
        />
      </div>
      <div className="basis-full md:basis-1/2 flex flex-col gap-2">
        <div className="relative">
          <h1 className="text-3xl md:text-6xl font-semibold mb-4">
            Supports School Resources
            <br />
          </h1>
        </div>
        <p className="text-md font-medium text-zinc-600">
          We provide students with valuable tools and resources designed to
          complement their classroom education and help them build the skills
          necessary to excel in the field.
        </p>

        <div className="flex mt-8">
          {isSignedIn ? (
            <Link
              to="/explore"
              className="flex items-center justify-center gap-2 font-bold text-emerald-600"
            >
              Explore Resources
              <FaArrowRightLong />
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center justify-center gap-2 font-bold text-emerald-600">
                Explore Resources
                <FaArrowRightLong />
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </section>
  );
};

const Main = () => {
  const { isSignedIn } = useAuth();
  return (
    <section className="w-full h-screen bg-zinc-900 text-zinc-100 relative">
      <div className="w-full max-w-screen-lg mx-auto flex gap-2 p-8">
        <div className="mt-16 flex flex-col justify-center items-center text-center gap-4 z-10">
          <div className="flex">
            <h2 className="text-lg font-semibold px-4 py-1 bg-yellow-300 text-black rounded-full">
              #Code LMS
            </h2>
          </div>
          <h1 className="text-6xl font-semibold">
            Elevate your academic performance with our cutting-edge learning
            platform.
          </h1>

          <h4 className="mt-5 text-lg font-semibold text-zinc-300">
            Unlock a deeper understanding with Code LMS.
          </h4>

          <div className="flex mt-10">
            {isSignedIn ? (
              <Link
                to="/qoutes"
                className="py-4 px-8 border border-zinc-600 text-zinc-400 rounded-full font-semibold hover:bg-white hover:text-zinc-700 ease-in duration-300"
              >
                Open Assessments
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="py-4 px-8 border border-zinc-600 text-zinc-400 rounded-full font-semibold hover:bg-white hover:text-zinc-700 ease-in duration-300">
                  Open Assessments
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-0 "
      >
        <path
          fill="#27272a"
          fill-opacity="1"
          d="M0,64L14.1,85.3C28.2,107,56,149,85,186.7C112.9,224,141,256,169,266.7C197.6,277,226,267,254,240C282.4,213,311,171,339,144C367.1,117,395,107,424,112C451.8,117,480,139,508,144C536.5,149,565,139,593,117.3C621.2,96,649,64,678,85.3C705.9,107,734,181,762,208C790.6,235,819,213,847,218.7C875.3,224,904,256,932,266.7C960,277,988,267,1016,261.3C1044.7,256,1073,256,1101,218.7C1129.4,181,1158,107,1186,69.3C1214.1,32,1242,32,1271,42.7C1298.8,53,1327,75,1355,69.3C1383.5,64,1412,32,1426,16L1440,0L1440,320L1425.9,320C1411.8,320,1384,320,1355,320C1327.1,320,1299,320,1271,320C1242.4,320,1214,320,1186,320C1157.6,320,1129,320,1101,320C1072.9,320,1045,320,1016,320C988.2,320,960,320,932,320C903.5,320,875,320,847,320C818.8,320,791,320,762,320C734.1,320,706,320,678,320C649.4,320,621,320,593,320C564.7,320,536,320,508,320C480,320,452,320,424,320C395.3,320,367,320,339,320C310.6,320,282,320,254,320C225.9,320,198,320,169,320C141.2,320,113,320,85,320C56.5,320,28,320,14,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
};
