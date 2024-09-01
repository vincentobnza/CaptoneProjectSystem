import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { useAuth } from "../hooks/AuthContext.tsx";
export default function Signup() {
  return (
    <div className="w-full h-screen bg-zinc-900 grid place-content-center relative text-zinc-200">
      <div className="absolute top-5 left-5">
        <h1 className="font-black text-xl text-zinc-500">{"{ Codecian }"}</h1>
      </div>

      <SignupForm />
    </div>
  );
}

const SignupForm = () => {
  const [visible, isVisible] = React.useState(true);
  const { signInWithGoogle, signInWithGithub } = useAuth();

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
  };
  const handleSignInWithGithub = async () => {
    await signInWithGithub();
  };
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md mx-auto p-5 flex flex-col justify-center items-center text-center gap-5"
        >
          <div className="py-2 px-3 flex items-center gap-2 bg-emerald-600/20 font-medium text-sm rounded-lg text-emerald-300 border border-emerald-800 mb-5">
            <HiOutlineLightningBolt size={20} />
            <p>Sign up</p>
          </div>
          <h1 className="font-black text-4xl tracking-wide">
            CREATE AN ACCOUNT
          </h1>
          <div className="flex items-center gap-2">
            <p>Already a Codecian user ?</p>
            <Link
              to="/login"
              className="text-emerald-500 underline underline-offset-4 font-bold"
            >
              Sign in
            </Link>
          </div>
          <div className="mt-10 w-full flex flex-col gap-2">
            <button
              onClick={handleSignInWithGoogle}
              className="w-full h-12 flex items-center justify-center font-semibold text-zinc-300 hover:opacity-70 duration-400 gap-4 bg-zinc-800 border border-zinc-700 text-sm"
            >
              <FcGoogle size={18} />
              Sign up with Google
            </button>
            <button
              onClick={handleSignInWithGithub}
              className="w-full h-12 flex items-center justify-center font-semibold text-zinc-300 hover:opacity-70 duration-400 gap-4 bg-zinc-800 border border-zinc-700 text-sm"
            >
              <FaGithub size={18} />
              Sign up with Github
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
