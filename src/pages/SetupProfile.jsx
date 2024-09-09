import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsLightning } from "react-icons/bs";
import Logo from "../components/Logo";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SetupProfile() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
  });
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createProfile = async () => {
    if (!user) {
      throw new Error("You must be logged in to create a profile.");
    }

    const { data, error } = await supabase.from("profile").upsert([
      {
        id: user.id,
        first_name: formData.fname,
        last_name: formData.lname,
      },
    ]);

    if (error) throw error;
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast
      .promise(createProfile, {
        pending: "Creating your profile...",
        success: "Your profile was created successfully!",
        error: {
          render({ data }) {
            return `Error creating profile: ${data.message}`;
          },
        },
      })
      .then(() => {
        // Wait for 2 seconds before navigating
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="w-full h-screen grid place-items-center p-8 md:p-5 text-zinc-800"
    >
      <div className="w-full max-w-screen-md min-h-[75vh] mx-auto flex flex-col gap-2">
        <Logo size="12" textSize={"sm"} />
        <div className="mt-5 flex items-center gap-4 ">
          <h1 className="text-3xl font-bold">Setup your profile first.</h1>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-zinc-600">
            Please complete all the required fields below.
          </p>
        </div>

        <form className="mt-8 w-full grid grid-cols-2 gap-3">
          <div className="flex-col w-full">
            <label htmlFor="section" className="text-md font-semibold">
              First name{" "}
              <span className="italic text-xs font-medium text-zinc-400">
                {"(Required)"}
              </span>
            </label>
            <input
              type="text"
              autoComplete="off"
              className="mt-2 w-full h-12 px-3 border border-zinc-300 rounded placeholder:text-sm outline-none focus:ring-2 ring-emerald-400 duration-400"
              placeholder="First name"
              onChange={handleInputChange}
              required
              name="fname"
            />
          </div>
          <div className="flex-col w-full">
            <label htmlFor="section" className="text-md font-semibold">
              Last name {""}
              <span className="italic text-xs font-medium text-zinc-400">
                {"(Optional)"}
              </span>
            </label>
            <input
              autoComplete="off"
              type="text"
              className="mt-2 w-full h-12 px-3 border border-zinc-300 rounded placeholder:text-sm outline-none focus:ring-2 ring-emerald-400 duration-400"
              placeholder="Last name"
              onChange={handleInputChange}
              required
              name="lname"
            />
          </div>
        </form>

        <button
          onClick={handleSubmit}
          type="submit"
          className="mt-12 self-end bg-emerald-600 text-white text-sm font-bold px-6 py-2 rounded outline-none"
        >
          Save
        </button>
        <ToastContainer position="top-center" />
      </div>
    </motion.div>
  );
}
