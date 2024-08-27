import React, { useRef, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { MdDashboardCustomize } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { LuUploadCloud } from "react-icons/lu";
import AdminNavbar from "../components/AdminNavbar";
import { MdOndemandVideo } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import supabase from "../config/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { Select, SelectItem } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";

//Quiz Modal
import QuizModal from "../components/QuizModal";

export default function AdminResources() {
  return (
    <div className="mt-16 flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <AdminNavbar />
        <div className="ml-[240px] p-5 flex-grow ">
          <Content />
        </div>
      </div>
    </div>
  );
}

const Content = () => {
  const options = [
    {
      value: "Module Lessons",
      label: "Module Lessons",
      default: false,
    },
    {
      value: "Video Lessons",
      label: "Video Lessons",
      default: true,
    },
  ];

  const [chapterTitle, setChapterTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="flex justify-between p-4 gap-4">
      <div className="flex flex-col w-full gap-2">
        <Header />
        <Customize
          chapterTitle={chapterTitle}
          setChapterTitle={setChapterTitle}
          description={description}
          setDescription={setDescription}
        />
        <Configuration />
      </div>

      <div className="flex">
        <PreviewPanel title={chapterTitle} description={description} />
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center gap-2">
      <div className="flex flex-col gap-1 relative">
        <h1 className="text-lg font-bold text-zinc-900">Content Creation</h1>
        <p className="text-xs text-zinc-500">Create a new content</p>

        <div className="absolute -top-2 -right-14 px-2 bg-blue-500 text-white rounded-full">
          <p className="text-xs font-bold">Video</p>
        </div>
      </div>

      <div className="flex">
        <Select
          className="w-[180px]"
          size="sm"
          label="Content Type"
          placeholder="Video Lessons"
        >
          <SelectItem value="Video Lessons">Video Lessons</SelectItem>
          <SelectItem value="Module Lessons">Module Lessons</SelectItem>
        </Select>
      </div>
    </div>
  );
};

const Customize = ({
  chapterTitle,
  setChapterTitle,
  description,
  setDescription,
}) => {
  return (
    <div className="mt-5 w-full max-w-screen-sm flex items-start justify-start flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="size-8 rounded-full grid place-items-center bg-emerald-50 border border-emerald-100 text-emerald-600">
          <MdDashboardCustomize size={20} />
        </div>
        <h1 className="text-sm font-medium text-zinc-900">Customize</h1>
      </div>
      <ChapterTitle
        chapterTitle={chapterTitle}
        setChapterTitle={setChapterTitle}
      />
      <Description description={description} setDescription={setDescription} />
    </div>
  );
};
const Configuration = () => {
  return (
    <div className="mt-8 w-full max-w-screen-sm h-[100px] flex items-start justify-start flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="size-8 rounded-full grid place-items-center bg-emerald-50 border border-emerald-100 text-emerald-700">
          <LuUploadCloud size={20} />
        </div>
        <h1 className="text-sm font-semibold text-zinc-900">Upload</h1>
      </div>
      <UploadImageBanner />
      <UploadVideo />

      {/* Create Quiz */}
      <QuizCreation />
    </div>
  );
};

const UploadImageBanner = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function fetchImage() {
    try {
      const { data, error } = await supabase.storage
        .from("LessonsImage")
        .list();
      if (error) {
        console.log("Error fetching images");
      } else {
        console.log("Images fetched successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchImage();
  }, []);

  async function uploadImageFile(e) {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setUploading(true);

    try {
      const { error } = await supabase.storage
        .from("LessonsImage")
        .upload(uuidv4(), imageFile, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.log("Error uploading your image");
      } else {
        const imageUrl = URL.createObjectURL(imageFile);
        setImage(imageUrl);
        console.log("Image uploaded successfully!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-zinc-900">Upload your image</h2>
      <p className="text-sm text-zinc-500">
        Click to browse your image from your computer.
      </p>

      <div
        className={`w-full h-[350px] border border-zinc-200 rounded-lg overflow-hidden relative ${
          image ? "bg-cover" : "bg-zinc-50"
        }`}
        style={{ backgroundImage: image ? `url(${image})` : "none" }}
      >
        {!image && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <label
              htmlFor="file-upload"
              className="px-4 py-2 border border-zinc-200 text-zinc-700 text-xs font-medium rounded cursor-pointer "
            >
              {uploading ? "Uploading..." : "Choose Image"}
            </label>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={uploadImageFile}
          className="hidden"
          id="file-upload"
        />
      </div>

      <div className="w-full flex justify-start items-center p-2 h-10 bg-emerald-50 border-l-4 border-emerald-500">
        <p className="text-xs font-semibold text-blue-900">
          This image will be used as your banner photo in this video lessons.
        </p>
      </div>
    </div>
  );
};
const UploadVideo = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900">
          Upload your video here
        </h2>
        <p className="text-sm text-zinc-500">
          Click to browse your video from your computer.
        </p>
      </div>
      <div className="w-full h-[300px] bg-zinc-100 border border-zinc-200 grid place-items-center">
        <div className="flex justify-center items-center flex-col gap-5">
          <MdOndemandVideo size={40} className="text-zinc-500" />
          <p className="text-xs text-zinc-500 font-semibold">
            Drag and drop or click to upload
          </p>
          <button className="mt-5 text-xs font-medium p-2 bg-zinc-700 text-zinc-200 rounded outline-none">
            Upload Your Video
          </button>
        </div>
      </div>
    </div>
  );
};

// COMPONENTS
const ChapterTitle = ({ chapterTitle, setChapterTitle }) => {
  const ref = useRef();

  const isClick = (e) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  const chapterTitleInfo = [
    {
      title: "Chapter Title",
      iconLabel: "Edit Title",
      icon: RiEditFill,
    },
  ];

  return (
    <div className="w-full p-4  border border-zinc-100 rounded-lg text-zinc-700">
      {chapterTitleInfo.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-4 relative">
          <div className="flex justify-between">
            <h1 className="font-bold text-md">{item.title}</h1>
            <button
              onClick={isClick}
              className="flex items-center gap-2 p-2 text-xs font-semibold text-zinc-500 rounded border border-zinc-100 outline-none hover:bg-zinc-700 hover:text-white duration-300 ease-in"
            >
              {item.iconLabel}
            </button>
          </div>
          <input
            ref={ref}
            type="text"
            onChange={(e) => setChapterTitle(e.target.value)}
            className="text-sm font-medium text-zinc-600 bg-transparent h-10 outline-none border-b border-zinc-100 focus:border-b-2 focus:border-zinc-500 transition duration-300 ease-in placeholder:text-zinc-400"
            value={chapterTitle}
            placeholder="Chapter Title"
          />
        </div>
      ))}
    </div>
  );
};

const Description = ({ description, setDescription }) => {
  const ref = useRef();

  const isClick = (e) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  const chapterTitleInfo = [
    {
      title: "Description",
      iconLabel: "Edit Description",
      icon: RiEditFill,
    },
  ];

  return (
    <div className="w-full p-4  border border-zinc-100 rounded-lg text-zinc-900">
      {chapterTitleInfo.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-4 relative">
          <div className="flex justify-between">
            <h1 className="font-bold text-md">{item.title}</h1>
            <button
              onClick={isClick}
              className="flex items-center gap-2 p-2 text-xs font-semibold text-zinc-500 rounded border border-zinc-100 outline-none hover:bg-zinc-900 hover:text-white duration-300 ease-in"
            >
              {item.iconLabel}
            </button>
          </div>
          <input
            ref={ref}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            className="text-sm font-medium text-zinc-600 bg-transparent h-10 outline-none border-b border-zinc-100 focus:border-b-2 focus:border-zinc-500 transition duration-300 ease-in placeholder:text-zinc-400"
            value={description}
            placeholder="Description here"
          />
        </div>
      ))}
    </div>
  );
};
const PreviewPanel = ({ title, description }) => {
  return (
    <div className="border border-zinc-100 w-[400px] h-full flex flex-col gap-2 p-5 rounded-2xl">
      <div className="w-full flex justify-between items-center gap-2">
        <h1 className="text-sm font-bold">Preview here</h1>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <div className="w-full h-[260px] bg-[url('https://i.pinimg.com/564x/fc/81/92/fc8192fbc3821304ec6a776d69dbb378.jpg')] bg-cover rounded-lg grid place-items-center">
          <FaRegCirclePlay size={50} className="text-zinc-200" />
        </div>
        <h1 className="text-sm font-bold mt-4">Chapter Title</h1>
        <p className="text-xs text-zinc-600 font-semibold">{title}</p>
        <h1 className="text-sm font-bold mt-4">Description</h1>
        <p className="text-xs text-zinc-600 font-semibold">{description}</p>

        <div className="w-full flex justify-end mt-10">
          <button className="text-xs font-semibold p-3 bg-zinc-900 text-white rounded">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

const QuizCreation = () => {
  const [quiz, setQuiz] = useState(false);

  React.useEffect(() => {
    if (quiz) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [quiz]);
  return (
    <div className="w-full flex flex-col gap-2 mt-2">
      <h2 className="text-lg font-semibold text-zinc-900">Quiz Creation</h2>
      <p className="text-sm text-zinc-500">
        Create your quiz for this lesson{" "}
        <span className="italic">{"(Optional)"}</span>
      </p>

      <div className="mt-5 flex flex-col gap-2 mb-10">
        <div className="flex">
          <button
            onClick={() => setQuiz(true)}
            className="flex items-center gap-2 py-3 px-6 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 text-white text-sm font-bold shadow-2xl shadow-zinc-400 hover:brightness-105 duration-300 ease-in"
          >
            Create Quiz
            <FaPlus size={14} />
          </button>

          {/* Modal For Quiz */}
          <QuizModal quiz={quiz} setQuiz={setQuiz} />
        </div>
      </div>
    </div>
  );
};
