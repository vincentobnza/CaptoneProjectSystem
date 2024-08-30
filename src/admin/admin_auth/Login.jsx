import React from "react";

export default function Login() {
  return (
    <div className="w-full h-screen grid place-items-center p-5">
      <div className="w-full max-w-md mx-auto bg-white p-8 gap-3 border border-zinc-500 shadow-[4px_4px_0px_black]">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">ADMIN LOGIN</h1>
          <p className="font-bold text-sm">Login your admin account here.</p>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <label htmlFor="username" className="font-bold">
            Admin username
          </label>
          <input
            type="email"
            autoComplete="off"
            className="w-full h-12 px-3 border border-zinc-500 placeholder:text-xs"
            placeholder="admin username"
          />
          <label htmlFor="username" className="font-bold">
            Admin password
          </label>
          <input
            type="password"
            autoComplete="off"
            className="w-full h-12 px-3 border border-zinc-500 placeholder:text-xs"
            placeholder="admin password"
          />
          <button className="w-full h-12 bg-indigo-600 text-white shadow-[4px_4px_0px_black] text-sm font-bold">
            Login now
          </button>
        </div>
      </div>
    </div>
  );
}
