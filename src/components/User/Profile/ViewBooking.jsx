import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { useSelector } from "react-redux";
import { viewBookings } from "../../../apis/user";
import { useNavigate } from "react-router-dom";
import SingleBooking from "./SingleBooking";
import Button from "../../UI/Button";
function ViewBooking() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const [bookings, setBookings] = useState([]);
  const [bookingStatus, setbookingStatus] = useState("pending");
  const [fetchBooking,setFetchBooking]=useState(false)
  useEffect(() => {
    viewBookings(user._id)
      .then(({ data }) => {
        if (data.success) {
          setBookings(data.bookings);
        }
      })
      .catch((error) => {
        if (error.response?.data?.error?.tokenExpired) {
          localStorage.removeItem("user");
          navigate("/");
        }
      });
  }, [fetchBooking]);

  return (
    <div className="h-[550px] mb-5 mt-24">
      <div className="bg-light flex justify-center items-center h-1/3">
        <h1 className="text-3xl">My Bookings</h1>
      </div>
      <div className="flex justify-end h-2/3">
        <div className="w-full flex">
          {/* filter section */}
          <div className="w-1/2 hidden md:flex  justify-center  ">
            <div className="mt-12 w-1/2 ">
              <div className="flex md:flex-col  lg:flex-row justify-between">
                <span>
                  Showing:
                  <span className="md:ml-4 lg:ml-0 text-dark font-semibold">
                    All Orders
                  </span>
                </span>
                <span className=" px-4 rounded-md border-[1px] border-slate-300 inline-flex">
                  <span className="my-auto mx-1">
                    <CiFilter />
                  </span>
                  Filter
                </span>
              </div>
              <hr className="h-px w-full  mt-2  mb-5 bg-gray-200 border-0" />
            </div>
          </div>
          {/* filter section ends*/}
          <div className="w-full overflow-y-scroll md:w-2/3  ">
            <Button booking={'pending'} bookingStatus={bookingStatus} setbookingStatus={setbookingStatus}>PENDING</Button>
            <Button booking={'active'} bookingStatus={bookingStatus} setbookingStatus={setbookingStatus}>ACTIVE</Button>
            <Button booking={'completed'} bookingStatus={bookingStatus} setbookingStatus={setbookingStatus}>PAST</Button>
            <Button booking={'cancelled'} bookingStatus={bookingStatus} setbookingStatus={setbookingStatus}>CANCELLED</Button>
            <hr className="h-px w-3/4 mx-8 mt-3  mb-5 bg-gray-200 border-0" />
            {bookings.length > 0 &&
              bookings.map((booking) => {
                return booking?.status !== bookingStatus ? (
                  <></>
                ) : (
                  <SingleBooking fetchBooking={fetchBooking} setFetchBooking={setFetchBooking} booking={booking} />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBooking;
