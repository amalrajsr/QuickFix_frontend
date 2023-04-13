import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Admin/Login";
import UserManagement from "../pages/Admin/UserManagement";
import ServiceMangement from "../pages/Admin/ServiceMangement";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import LocationMangement from "../pages/Admin/LocationMangement";
import BookingManagement from "../pages/Admin/BookingManagement";
import ExpetManagement from "../pages/Admin/ExpetManagement";
function adminRoute() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={<ProtectedRoute type={"admin"} redirect={"/admin/login"} />}
        >
          <Route path="/" element={<AdminLayout />}>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/services" element={<ServiceMangement />} />
            <Route path="/locations" element={<LocationMangement />} />
            <Route path="/bookings" element={<BookingManagement />} />
            <Route path="/experts" element={<ExpetManagement />} />
          </Route>
            <Route path={"*"} element={<h1>not found</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default adminRoute;
