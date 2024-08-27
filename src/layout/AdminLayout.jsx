import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Adjust the path if necessary

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex">
      <Sidebar active={location.pathname} />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
