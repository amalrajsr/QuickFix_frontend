import React from "react";
import Home from "../pages/User/Home";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Otp from "../pages/User/Otp";
import Profile from "../components/User/Profile";
import { Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "../utils/ProtectedRoute";
import ViewService from "../components/User/Services/ViewService";
import Booking from "../components/User/Booking";
function UserRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />

          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/otp"} element={<Otp />} />
          <Route path="/services/:name" element={<ViewService />} />

          <Route element={<ProtectedRoute type={"user"} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/booking" element={<Booking />} />
          </Route>

          <Route path={"*"} element={<h1>not found</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default UserRoute;
