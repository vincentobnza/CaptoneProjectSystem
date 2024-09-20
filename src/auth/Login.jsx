import React from "react";
import { Fragment } from "react";
import { GrSecure } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/AuthContext.tsx";
export default function Login() {
  return (
    <div className="w-full h-screen bg-zinc-900 grid place-content-center relative text-zinc-200">
      <div className="absolute top-5 left-5">
        <h1 className="font-semibold text-xl text-zinc-500">
          {"{ Codecian }"}
        </h1>
      </div>
      <LoginForm />
    </div>
  );
}

const LoginForm = () => {
  const [visible, isVisible] = React.useState(true);
  const { signInWithGoogle, signInWithGithub } = useAuth();

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  const handleGithubLogin = async () => {
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
          className="w-[450px]mx-auto p-5 flex flex-col justify-center items-center text-center gap-5"
        >
          <div className="py-2 px-3 flex items-center gap-2 bg-emerald-600/20 text-sm rounded-lg text-emerald-300 border border-emerald-800 mb-5">
            <GrSecure size={20} />
            <p>Login</p>
          </div>
          <h1 className="font-medium text-4xl tracking-wide">
            LOG TO CODECIAN
          </h1>
          <div className="flex items-center gap-2">
            <p>New to Codecian ?</p>
            <Link
              to="/signup"
              className="text-emerald-500 underline underline-offset-4 font-medium"
            >
              Sign Up
            </Link>
          </div>
          <div className="mt-10 w-full flex flex-col gap-2">
            <button
              onClick={handleGoogleLogin}
              className="w-full h-12 flex items-center justify-center text-zinc-300 hover:opacity-70 duration-400 gap-4 bg-zinc-800 border border-zinc-700 text-sm"
            >
              <FcGoogle size={18} />
              Login with Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="w-full h-12 flex items-center justify-center text-zinc-300 hover:opacity-70 duration-400 gap-4 bg-zinc-800 border border-zinc-700 text-sm"
            >
              <FaGithub size={18} />
              Login with Github
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
