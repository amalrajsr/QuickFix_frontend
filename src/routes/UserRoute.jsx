import React from "react";
import Home from "../pages/User/Home";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Otp from "../pages/User/Otp";
import Profile from "../components/User/Profile/Profile";
import { Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "../utils/ProtectedRoute";
import ViewService from "../components/User/Services/ViewService";
import Booking from "../components/User/Booking";
import ViewBooking from "../components/User/Profile/ViewBooking";
import PaymentSuccessPage from "../components/User/PaymentSuccessPage";
import PageNotfound from "../components/UI/PageNotfound";
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
          <Route element={<ProtectedRoute type={"user"} redirect={"/login"} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/:name/booking" element={<Booking />} />
            <Route path="/bookings" element={<ViewBooking />} />
            <Route path="/payment/success" element={<PaymentSuccessPage/>} />
          </Route>
          <Route path={"*"} element={<PageNotfound redirect={'/'}/>} />
        </Route>
      </Routes>
    </>
  );
}

export default UserRoute;
