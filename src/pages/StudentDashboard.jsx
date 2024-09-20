import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
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
import ScrollUp from "../components/ScrollUp.jsx";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient.js";
import { useAuth } from "../hooks/AuthContext.tsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import StudentSidebar from "../components/StudentSidebar.jsx";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profile")
        .select("username")
        .eq("id", user.id)
        .single();
      if (error) {
        console.error(error);
        return;
      }
      setUserInfo(data);
      setLoading(false);
    };

    if (user?.id) {
      fetchUser();
    }
  }, [user?.id]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <StudentSidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="ml-64 max-w-7xl mx-auto space-y-14">
            <Boxes />
            <VideoLessons />
            <DiscoverMore />
            <LevelUp />
          </div>
        </main>
      </div>
      <ScrollUp />
      {/* <Footer /> */}
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
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-900">
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
              className="w-full h-[300px] p-4 bg-white border border-zinc-200 cursor-pointer flex flex-col gap-2 relative shadow-2xl shadow-zinc-50 rounded-2xl overflow-hidden"
            >
              <Icon
                size={120}
                className="absolute -top-5 -right-5 text-zinc-200"
              />
              <div className="p-2 bg-gradient-to-br from-zinc-100 to-zinc-200 border border-zinc-300 self-start rounded-lg mb-2">
                <Icon size={25} />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-zinc-800 font-medium">
                  {item.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full justify-between items-center flex px-3 py-2 ">
                <div className="w-full flex justify-between items-center mx-auto p-2 border border-zinc-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <GoCodespaces size={20} />
                    <h1 className="text-xs font-semibold">Entry Level</h1>
                  </div>

                  <Link
                    to={item.link}
                    className="p-2 rounded-lg bg-zinc-800 text-white text-xs font-semibold flex items-center gap-2"
                  >
                    Start
                    <FiArrowUpRight size={16} />
                  </Link>
                </div>
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
      <h2 className="text-lg font-semibold">
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
        <h2 className="text-lg font-semibold">
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
      bgColor: "bg-gradient-to-br from-emerald-400 to-emerald-700",
    },
    {
      id: 2,
      title: "Javascript Objects",
      description:
        "JavaScript objects store key-value pairs for organizing data.",
      icon: MdOutlineDataObject,
      bgColor: "bg-gradient-to-br from-orange-400 to-orange-700",
    },
    {
      id: 3,
      title: "JS Object Oriented Programming",
      description:
        "JavaScript Object-Oriented Programming uses classes and objects to structure code.",
      icon: MdOutlineDataObject,
      bgColor: "bg-gradient-to-br from-indigo-400 to-indigo-700",
    },
  ];
  return (
    <div className="mt-8 w-full grid md:grid-cols-2 gap-4">
      {Boxes.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="p-6 border border-zinc-300  rounded-2xl flex flex-col gap-2 cursor-pointer shadow-2xl shadow-zinc-100 group"
          >
            <div className="flex gap-6 justify-between">
              <div
                className={`p-2 rounded-lg ${item.bgColor} self-start text-white`}
              >
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
        <h2 className="text-lg font-semibold">
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
      image:
        "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/141_Git_logo_logos-1024.png",
      link: "/learn-git",
    },
  ];
  return (
    <div className="mt-8 w-full  gap-4">
      {Boxes.map((item, idx) => {
        return (
          <div className="p-10 md:p-14 h-[400px] flex flex-col gap-2 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-2xl shadow-2xl shadow-zinc-100  text-white relative overflow-hidden">
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1.5 }}
              transition={{
                duration: 3,
                damping: 10,
              }}
              src="https://moniquemidio.github.io/clone_interface_github/assets/mundo.png"
              alt="globe"
              className="absolute -bottom-24 -right-12 w-60 md:w-[450px]"
            />
            <div className="max-w-md flex flex-col gap-6">
              <h1 className="text-4xl font-bold font-Merriweather">
                Get Started with <span className="text-orange-600">GIT</span>{" "}
                for VCS
              </h1>
              <p className="text-zinc-300 font-medium text-sm">
                Introductory guide focused on helping beginners understand the
                basics of using Git for version control.
              </p>

              <Link
                to="/learn-git"
                className="mt-10 self-start text-sm font-semibold bg-gradient-to-br from-white to-zinc-500 py-3 px-8 rounded-full text-black hover:opacity-70 duration-500"
              >
                Learn Git
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
