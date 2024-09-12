import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import StudentSidebar from "../components/StudentSidebar";
import { GoCodespaces } from "react-icons/go";
import { useState } from "react";
import { MdOutlineSmartDisplay } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import ReactPlayer from "react-player/youtube";
import { useApi } from "../hooks/ApiContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";
import { IoBookmarksOutline } from "react-icons/io5";
import { LuDatabase } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineDataObject } from "react-icons/md";
import { IoIosGitBranch } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import ScrollUp from "../components/scrollUp.jsx";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient.js";
import { useAuth } from "../hooks/AuthContext.tsx";
export default function StudentDashboard() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex px-5 py-1">
        <StudentSidebar />
        <div className="ml-64 flex-1 flex-col p-4 overflow-y-auto space-y-10">
          <Boxes />
          <VideoLessons />
          <DiscoverMore />
          <LevelUp />
        </div>
      </div>
      <ScrollUp />
    </div>
  );
}

const Boxes = () => {
  const List = [
    {
      id: "BasicHTML",
      title: "Basics of HTML",
      description:
        "Master the essentials of HTML with this beginner-friendly course.",
      link: "/basic-html",
      icon: FaHtml5,
    },
    {
      id: "BasicCSS",
      title: "Basics of CSS",
      description:
        "Understand the fundamentals of CSS with this introductory course.",
      link: "/basic-css",
      icon: FaCss3Alt,
    },
    {
      id: "BasicJS",
      title: "Basics of JavaScript",
      description:
        "Get started with JavaScript and learn the basics of programming.",
      link: "/basic-javascript",
      icon: FaJsSquare,
    },
  ];
  return (
    <div className="mt-8 w-full flex flex-col gap-6">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-medium text-zinc-700">
          Beginner's Starter Pack <span className="text-3xl">📦</span>
        </h2>

        <IoBookmarksOutline size={20} className="cursor-pointer" />
      </div>
      <div className="w-full grid md:grid-cols-3 gap-2">
        {List.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              to={item.link}
              key={index}
              className="w-full h-[240px] p-4 bg-white border border-zinc-200 cursor-pointer flex flex-col gap-2 relative shadow-2xl shadow-zinc-50 rounded-2xl overflow-hidden"
            >
              <Icon
                size={120}
                className="absolute -top-5 -right-5 text-zinc-200"
              />
              <div className="p-2 bg-gradient-to-br from-zinc-100 to-zinc-200 border border-zinc-300 self-start rounded-lg mb-2">
                <Icon size={25} />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-sm text-zinc-500">{item.description}</p>
              </div>

              <div className="absolute bottom-0 left-0 w-full justify-between  items-center flex py-2 px-3">
                <div className="flex items-center gap-2">
                  <GoCodespaces size={20} />
                  <h1 className="text-xs font-semibold">Entry Level</h1>
                </div>

                <FiArrowUpRight size={23} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const VideoLessons = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="text-lg font-medium">
        Online Tutorials <span className="text-3xl">🎬</span>
      </h2>
      <VideoCarousel />
    </div>
  );
};

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const { youtubeData } = useApi();
  const [openModal, setOpenModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state for bookmarking
  const { user } = useAuth();

  const navigate = useNavigate();

  const itemWidth = 350;
  const gap = 16;
  const visibleItems = 3;
  const totalItems = youtubeData ? youtubeData.length : 0;
  const totalWidth = totalItems * (itemWidth + gap) - gap;

  const handleNext = () => {
    const maxTranslateX = -((totalItems - visibleItems) * (itemWidth + gap));
    if (translateX > maxTranslateX) {
      setTranslateX(Math.max(translateX - (itemWidth + gap), maxTranslateX));
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (translateX < 0) {
      setTranslateX(Math.min(translateX + (itemWidth + gap), 0));
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setOpenModal(true);
  };

  const handleBookmarkClick = async (video) => {
    setLoading(true); // Set loading state while saving bookmark

    try {
      const { error } = await supabase.from("bookmarks").insert([
        {
          video_id: video.id,
          title: video.title,
          image: video.image,
          duration: video.duration,
          user_id: user.id, // Assuming the user is logged in
          link: video.link,
        },
      ]);

      if (error) throw error;

      navigate("/student-dashboard/learnings");
    } catch (error) {
      console.error("Error bookmarking video:", error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="w-full flex flex-col overflow-hidden relative">
      <div
        className="flex transition-transform duration-500 ease-in-out gap-4"
        style={{
          transform: `translateX(${translateX}px)`,
          width: `${totalWidth}px`,
        }}
      >
        {youtubeData &&
          youtubeData.map((item, index) => (
            <div
              key={index}
              className="w-[316px] border border-zinc-200 p-2 rounded-tl-2xl rounded-tr-2xl shadow-2xl shadow-zinc-50"
            >
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8 }}
                className="w-full h-[13rem] rounded-tl-md rounded-tr-md"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></motion.div>
              <div className="p-4">
                <h3 className="text-md font-semibold">{item.title}</h3>
                <p className="text-sm text-zinc-500">
                  Duration: {item.duration}
                </p>

                <div className="mt-5 w-full flex items-center justify-between">
                  <div
                    onClick={() => handleVideoClick(item)}
                    className="size-14 border border-zinc-200 grid place-content-center cursor-pointer bg-white rounded-full text-zinc-400 hover:text-black duration-300"
                  >
                    <MdOutlineSmartDisplay size={27} />
                  </div>

                  <div onClick={() => handleBookmarkClick(item)}>
                    <FaRegBookmark size={20} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full flex justify-end items-end mt-2 gap-2">
        <div
          onClick={handlePrev}
          className="size-10 border border-zinc-200 rounded-lg text-zinc-400 grid place-content-center cursor-pointer"
        >
          <GrCaretPrevious size={15} />
        </div>
        <div
          onClick={handleNext}
          className="size-10 border border-zinc-200 rounded-lg text-zinc-400 grid place-content-center cursor-pointer"
        >
          <GrCaretNext size={15} />
        </div>
      </div>

      <VideoPlayer
        openModal={openModal}
        setOpenModal={setOpenModal}
        video={selectedVideo}
      />
    </div>
  );
};

const VideoPlayer = ({ openModal, setOpenModal, video }) => {
  return (
    <>
      <AnimatePresence>
        {openModal && video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-zinc-900/80 grid place-items-center backdrop-blur-xl z-[100]"
            onClick={() => setOpenModal(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-screen-lg h-[85vh] mx-auto relative p-5 md:p-2 bg-indigo-600 border border-zinc-700 rounded-lg"
            >
              <ReactPlayer
                url={video.link}
                width="100%"
                height="100%"
                controls={true}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const DiscoverMore = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">
          Discover More <span className="text-3xl">📢</span>
        </h2>
        <p className="text-sm">
          Take an advanced path on your career development
        </p>

        <DiscoverMoreBoxes />
      </div>
    </div>
  );
};

const DiscoverMoreBoxes = () => {
  const Boxes = [
    {
      id: 1,
      title: "Javascript Arrays",
      description:
        "Master array creation, access, and manipulation in JavaScript.",
      icon: LuDatabase,
    },
    {
      id: 2,
      title: "Javascript Objects",
      description:
        "JavaScript objects store key-value pairs for organizing data.",
      icon: MdOutlineDataObject,
    },
    {
      id: 3,
      title: "JS Object Oriented Programming",
      description:
        "JavaScript Object-Oriented Programming uses classes and objects to structure code.",
      icon: MdOutlineDataObject,
    },
  ];
  return (
    <div className="mt-8 w-full grid md:grid-cols-2 gap-4">
      {Boxes.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="p-6 border border-zinc-200  rounded-2xl flex flex-col gap-2 cursor-pointer shadow-2xl shadow-zinc-100 group"
          >
            <div className="flex gap-6 justify-between">
              <div className="p-2 rounded-lg bg-emerald-50 self-start text-emerald-700">
                <Icon size={20} />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-md font-semibold">{item.title}</h1>
                <p className="text-sm pr-2">{item.description}</p>
              </div>
              <div className="h-full flex items-center">
                <IoIosArrowForward size={25} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LevelUp = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">
          Level Up Your Skills <span className="text-3xl">🤖 </span>
        </h2>
        <p className="text-sm">
          Embark on an advanced path to enhance your development expertise with
          essential tools.
        </p>

        <LevelUpBoxes />
      </div>
    </div>
  );
};

const LevelUpBoxes = () => {
  const Boxes = [
    {
      id: 1,
      title: "Get started with GIT",
      description:
        "Learn the fundamentals of version control and streamline your coding workflow.",
      icon: IoIosGitBranch,
    },
    {
      id: 2,
      title: "Get Started with GitHub",
      description:
        "Discover how to manage your projects, collaborate with others, and build your portfolio",
      icon: FaGithub,
    },
  ];
  return (
    <div className="mt-8 w-full grid md:grid-cols-2 gap-4">
      {Boxes.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="p-8 flex flex-col gap-2 border border-zinc-200 rounded-2xl shadow-2xl shadow-zinc-100 cursor-pointer"
          >
            <div className="flex gap-6 justify-between">
              <div className="p-2 self-start bg-orange-50 text-orange-700 rounded-full">
                <Icon size={20} />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-md font-semibold">{item.title}</h1>
                <p className="text-sm pr-2">{item.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
