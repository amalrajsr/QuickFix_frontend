import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
function AdminLayout() {
  return (
    <div className="flex w-screen ">
      <Sidebar />
      <div className="ml-16 grow overflow-x-scroll md:ml-52">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
