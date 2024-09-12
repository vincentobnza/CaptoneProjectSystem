import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SetupProfile() {
  const [formData, setFormData] = useState({
    uname: "",
    fname: "",
    lname: "",
  });
  const [user, setUser] = useState(null);
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

  const checkProfileExists = async () => {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") throw error; // Ignore "No rows found" error
    return data;
  };

  const createProfile = async () => {
    if (!user) {
      throw new Error("You must be logged in to create a profile.");
    }

    // Check if the profile already exists
    const existingProfile = await checkProfileExists();
    if (existingProfile) {
      throw new Error("Profile already created.");
    }

    // Proceed with profile creation
    const { data, error } = await supabase.from("profile").upsert([
      {
        id: user.id,
        username: formData.uname,
        first_name: formData.fname,
        last_name: formData.lname,
      },
    ]);

    if (error) throw error;
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if username is provided
    if (!formData.uname) {
      toast.error("Username is required!");
      return;
    }

    toast
      .promise(createProfile, {
        pending: "Creating your profile...",
        success: "Your profile was created successfully!",
        error: {
          render({ data }) {
            if (data.message === "Profile already created.") {
              setTimeout(() => navigate("/"), 2000);
            }
            return data.message;
          },
        },
      })
      .then(() => {
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

        <form
          onSubmit={handleSubmit}
          className="mt-8 w-full grid grid-cols-2 gap-3"
        >
          <div className="flex-col w-full">
            <label htmlFor="uname" className="text-md font-semibold">
              Username{" "}
              <span className="italic text-xs font-medium text-zinc-400">
                {"(Required)"}
              </span>
            </label>
            <input
              type="text"
              autoComplete="off"
              className="mt-2 w-full h-12 px-3 border border-zinc-300 rounded placeholder:text-sm outline-none focus:ring-2 ring-emerald-400 duration-400"
              placeholder="Username"
              onChange={handleInputChange}
              required
              name="uname"
            />
          </div>
          <div className="flex-col w-full">
            <label htmlFor="fname" className="text-md font-semibold">
              First name{" "}
              <span className="italic text-xs font-medium text-zinc-400">
                {"(Optional)"}
              </span>
            </label>
            <input
              type="text"
              autoComplete="off"
              className="mt-2 w-full h-12 px-3 border border-zinc-300 rounded placeholder:text-sm outline-none focus:ring-2 ring-emerald-400 duration-400"
              placeholder="First name"
              onChange={handleInputChange}
              name="fname"
            />
          </div>
          <div className="flex-col w-full">
            <label htmlFor="lname" className="text-md font-semibold">
              Last name{" "}
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
              name="lname"
            />
          </div>
        </form>

        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-12 self-end bg-emerald-600 text-white text-sm font-bold px-6 py-2 rounded outline-none"
        >
          Save
        </button>
        <ToastContainer position="top-center" />
      </div>
    </motion.div>
  );
}
