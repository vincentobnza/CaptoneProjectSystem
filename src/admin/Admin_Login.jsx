import React from "react";

export default function Admin_Login() {
  return (
    <div className="w-full h-screen text-zinc-800 grid place-items-center">
      <div className="w-[360px] mx-auto flex flex-col justify-center items-center gap-2 p-5 border border-zinc-200 rounded-lg">
        <h1 className="font-bold text-xl">Login your admin account</h1>
        <p className="text-sm font-medium">Please login your account here.</p>

        <form className="w-full mt-10 flex flex-col gap-2">
          <label htmlFor="Email Address" className="text-sm font-semibold">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Please enter your email address"
            className="flex flex-grow h-10 border border-zinc-300 rounded focus:outline-none focus:ring-2 ring-emerald-600 px-2 placeholder:text-xs"
          />
          <label htmlFor="Email Address" className="text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            placeholder="Please enter your password"
            className="flex flex-grow h-10 border border-zinc-300 rounded focus:outline-none focus:ring-2 ring-emerald-600 px-2 placeholder:text-xs"
          />
          <button className="w-full h-10 bg-emerald-600 text-white font-bold text-sm rounded tracking-wide">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
