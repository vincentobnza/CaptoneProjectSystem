import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StudentSidebar from "../components/StudentSidebar";
import NoData from "../components/ui/NoData";
import supabase from "../config/supabaseClient"; // Ensure your Supabase client is configured
import { useAuth } from "../hooks/AuthContext";
import ReactPlayer from "react-player/youtube";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegCirclePlay } from "react-icons/fa6";
export default function Learning() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <StudentSidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="ml-64 max-w-7xl mx-auto space-y-14">
            <Content />
          </div>
        </main>
      </div>
    </div>
  );
}

const Content = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        if (!user) {
          throw new Error("User not authenticated");
        }

        const { data, error } = await supabase
          .from("bookmarks")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;
        setBookmarks(data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error.message);
      }
    };
    fetchBookmarks();
  }, []);

  return (
    <div className="w-full flex flex-col gap-2 p-2">
      {bookmarks.length === 0 ? (
        <NoData
          icon="https://cdn-icons-png.flaticon.com/128/7486/7486765.png"
          text="No content available yet"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="border border-gray-300 rounded-lg shado-2xl shadow-zinc-100 p-2"
            >
              <img
                src={bookmark.image}
                alt={bookmark.title}
                className="w-full h-[250px] object-cover rounded-t-lg mb-2"
              />
              <div className="p-2">
                <h3 className="text-md font-semibold">{bookmark.title}</h3>
                <p className="text-sm text-gray-500">
                  Duration: {bookmark.duration}
                </p>
              </div>
              <div className="mt-4 p-2">
                <FaRegCirclePlay
                  onClick={() => setOpenModal(true)}
                  size={35}
                  className="cursor-pointer text-zinc-600"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <VideoPlayer openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

const VideoPlayer = ({ openModal, setOpenModal }) => {
  const { user } = useAuth();
  const [videoLink, setVideoLink] = useState(null);

  useEffect(() => {
    const fetchVideoLink = async () => {
      try {
        const { data, error } = await supabase
          .from("bookmarks")
          .select("link")
          .eq("user_id", user.id);

        if (error) throw error;
        setVideoLink(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideoLink();
  }, []);
  return (
    <>
      <AnimatePresence>
        {openModal && (
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
                url={videoLink?.link}
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
