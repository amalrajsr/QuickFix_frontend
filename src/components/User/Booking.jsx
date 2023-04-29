import React, { useEffect, useState } from "react";
import { addressSchema } from "../../validations/Validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchLocationApi } from "../../apis/admin";
import { addBookingApi } from "../../apis/user";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import fireToast from "../../utils/fireToast";
function Booking() {
  const userData = useSelector((state) => state.user.value);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const service = location?.state?.data;
  const [error, setError] = useState({ zipcode: false, date: false });
  const [blockSlot, setblockSlot] = useState({
    // state to remove slots based on current time
    morning: true,
    afternoon: true,
    evening: true,
  });
  const [address, setAddress] = useState(true);
  const [booking, setBooking] = useState({
    user: userData._id,
    address: null,
    service: service.service,
    type: false,
    duration: false,
    estimatedCharge: 0,
    date: null,
    slot: null,
    detail: null,
  });

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
    fetchLocationApi()
      .then(({ data }) => {
        console.log(data);
        data.locations.forEach((location) => {
          for (let i in location) {
            if (i === "pincode") {
              locations.push(location[i]);
            }
          }
        });
      })
      .catch((error) => {
        if (error.response?.data?.error?.tokenExpired) {
          localStorage.removeItem("user");
          navigate(`/login`);
        }
      });
  }, []);

  // useEffect for showing estimated amount
  useEffect(() => {
    if (booking.type && booking.duration) {
      switch (booking.type) {
        case "installation":
          switch (booking.duration) {
            case 1:
              setBooking({
                ...booking,
                estimatedCharge: service.installationCharge1Hour,
              });
              break;
            case 3:
              setBooking({
                ...booking,
                estimatedCharge:
                  service.installationCharge1Hour +
                  2 * service.installationChargeLatelyHours,
              });
              break;
            case 6:
              setBooking({
                ...booking,
                estimatedCharge:
                  service.installationCharge1Hour +
                  6 * service.installationChargeLatelyHours,
              });
              break;
            default:
          }
          break;
        case "repair":
          switch (booking.duration) {
            case 1:
              setBooking({
                ...booking,
                estimatedCharge: service.repairCharge1Hour,
              });
              break;
            case 3:
              setBooking({
                ...booking,
                estimatedCharge:
                  service.repairCharge1Hour +
                  2 * service.repairChargeLatelyHours,
              });
              break;
            case 6:
              setBooking({
                ...booking,
                estimatedCharge:
                  service.repairCharge1Hour +
                  6 * service.repairChargeLatelyHours,
              });
              break;
            default:
          }
          break;
        default:
      }
    }
  }, [booking.type, booking.duration]);

  // form validation using useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  // handle user address form
  const onHandleSubmit = (userAddress) => {
    if (!locations.includes(parseInt(userAddress.zipcode))) {
      setError({ ...error, zipcode: true });
    } else {
      setError({ ...error, zipcode: false });
      setBooking({ ...booking, address: userAddress });
      setAddress(true);
    }
  };

  // function to handle zipcode
  const handelZipcode = (value) => {
    const pincode = parseInt(value);

    setError({ ...error, zipcode: false });
    if (!locations.includes(pincode)) {
      setError({ ...error, zipcode: true });
      setAddress(false);
    } else {
      setError({ ...error, zipcode: false });
    }
  };

  // function to verify and update date
  const handleDate = (e) => {
   
    const enteredDate = new Date(e.target.value);
    const currentDate = new Date();
    if(enteredDate.toDateString() === currentDate.toDateString()){
      const hourOfDay = currentDate.getHours();
      if(hourOfDay<=5){
      setblockSlot({ morning: false, afternoon: false, evening: false });
      }
     else if (hourOfDay >= 5 && hourOfDay < 12) {
      setblockSlot({ morning: true, afternoon: false, evening: false });

      } else if (hourOfDay >= 12 && hourOfDay < 16) {
        setblockSlot({ morning: true, afternoon: true, evening: false });

      } else {
        setblockSlot({ morning: true, afternoon: true, evening: true });
        setError({...error,date:true})
      }
    }else{
      setblockSlot({ morning: false, afternoon: false, evening: false });
      setError({...error,date:false})

    }
    
    if(!error.date) {
      setBooking({ ...booking, date: enteredDate });

    }

  };

  // handle booking
  const handleBooking = async () => {
    if (
      booking.address &&
      booking.estimatedCharge &&
      booking.date &&
      booking.detail &&
      booking.duration &&
      booking.type &&
      booking.slot
    ) {
      try {
        setLoading(true);
        const { data } = await addBookingApi(booking);
        setLoading(false);
        if (data.success) {
          fireToast("success", "booking successfull");
          reset();
          setAddress(false);
          setblockSlot({ morning: false, afternoon: false, evening: false });
          setBooking({
            user: userData._id,
            address: null,
            service: service.service,
            type: false,
            duration: false,
            estimatedCharge: 0,
            date: null,
            slot: null,
            detail: null,
          });
          navigate("/bookings");
        }
      } catch (error) {
        console.log("error");
        setLoading(false);
        fireToast("error", error.response.data.error.message);
      }

      // .then((error) => {
      //   console.log('error')
      //   setLoading(false);
      //   fireToast('error',error.response.data.error.message)
      //  });
    }
  };

  return (
    <div className="w-3/4 mx-auto  mt-32 ">
      {/* address section */}
      <div
        className={`bg-light rounded-md ${
          address ? "mb-0" : "mb-14"
        } shadow-lg  border-[1px] border-slate-300 w-full  `}
      >
        <h1 className=" m-3 text-2xl text-center w-full font-sans text-dark mb-5 font-medium">
          ADDRESS
        </h1>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="flex flex-col md:flex-row  flex-wrap lg:flex-nowrap mx-auto   justify-between w-full md:w-2/3 ">
            <div className="mx-auto">
              <input
                {...register("fullname")}
                type="text"
                name="fullname"
                placeholder="fullname"
                className="py-2 text-start mt-5 focus:outline focus:outline-slate-400 border-[1px] border-slate-300 rounded-lg  px-10 md:mx-3  md:ml-3"
              />
              {errors.fullname && (
                <p className="mx-4 text-slate-400  text-sm">
                  {errors.fullname.message}
                </p>
              )}
            </div>
            <div className="mx-auto">
              <input
                {...register("mobile")}
                type="number"
                name="mobile"
                placeholder="mobile number"
                className="py-2 mt-5 focus:outline focus:outline-slate-400  border-[1px] border-slate-300  rounded-lg px-10 md:mx-3  md:ml-3 "
              />
              {errors?.mobile && (
                <p className="mx-4 text-slate-400  text-sm">
                  {errors.mobile.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap md:mx-auto  justify-between w-full md:w-2/3 ">
            <div className="mx-auto">
              <input
                {...register("house")}
                type="text"
                name="house"
                placeholder="house"
                className="py-2 text-start mt-5 focus:outline focus:outline-slate-400 border-[1px] border-slate-300 rounded-lg  px-10 md:mx-3  md:ml-3"
              />
              {errors.house && (
                <p className="mx-4 text-slate-400  text-sm">
                  {errors.house.message}
                </p>
              )}
            </div>
            <div className="mx-auto">
              <input
                {...register("landmark")}
                type="text"
                name="landmark"
                placeholder="landmark"
                className="py-2 mt-5 focus:outline focus:outline-slate-400  border-[1px] border-slate-300  rounded-lg px-10 md:mx-3  md:ml-3 "
              />
              {errors?.landmark && (
                <p className="mx-4 text-slate-400  text-sm">
                  {errors.landmark.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap  md:mx-auto  lg:flex-nowrap justify-between w-full md:w-2/3  ">
            <div className="mx-auto">
              <input
                {...register("street")}
                type="text"
                name="street"
                placeholder="street"
                className="py-2 mt-5 focus:outline focus:outline-slate-400  border-[1px] border-slate-300  rounded-lg px-10 md:mx-3  md:ml-3 "
              />
              {errors.street && (
                <p className="mx-4 text-slate-400  text-sm ">
                  {errors.street.message}
                </p>
              )}
            </div>

            <div className="mx-auto">
              <input
                {...register("zipcode")}
                type="number"
                name="zipcode"
                onChange={(e) => handelZipcode(e.target.value)}
                placeholder="zip-code"
                className={`py-2 mt-5 focus:outline focus:outline-slate-400  border-[1px] ${
                  error.zipcode ? "border-red-700" : "border-slate-300"
                } rounded-lg px-10 md:mx-3  md:ml-3 `}
              />
              {errors.zipcode && (
                <p className="md:ml-3 text-slate-400  text-sm  ">
                  {errors.zipcode.message}
                </p>
              )}
              {error.zipcode && !errors.zipcode && (
                <p className="mx-4 text-slate-400  text-sm ">
                  This task is outside of our coverage area
                </p>
              )}
            </div>
          </div>
          <div className=" mx-auto w-full text-center mb-2 mt-5">
            <button className="bg-dark rounded-lg   hover:bg-gray-800 text-white   px-5 py-1">
              next
            </button>
          </div>
        </form>
      </div>

      {/* work type and slot section */}
      {address && (
        <>
          <div className="bg-light w-full  my-2 rounded-md  shadow-sm  border-[1px] border-slate-300">
            <div className=" flex flex-col lg:flex-row my-2  mx-auto w-1/2 justify-between">
              <div className="work-section">
                <h1 className="text-dark text-lg font-semibold mx-2">
                  Work Type
                </h1>
                <div className="my-2">
                  <input
                    type="radio"
                    onClick={() =>
                      setBooking({ ...booking, type: "installation" })
                    }
                    name="type"
                  />
                  <span className="text-dark text-md">Installation</span>
                </div>
                <div>
                  <input
                    type="radio"
                    name="type"
                    onClick={() => setBooking({ ...booking, type: "repair" })}
                  />
                  <span className="text-dark text-md">Repair</span>
                </div>
              </div>

              <div className="date-section">
                <h1 className="text-dark text-lg font-semibold">
                  How big is your task
                </h1>
                <div className="my-2  md:flex">
                  <div className="mr-4">
                    <input
                      type="radio"
                      name="duration"
                      id="time"
                      onClick={() => setBooking({ ...booking, duration: 1 })}
                    />
                    <span className="text-dark text-md">small- Est 1 hr</span>
                  </div>
                  <div className="my-2 md:my-auto">
                    <input
                      type="radio"
                      name="duration"
                      id="time"
                      onClick={() => setBooking({ ...booking, duration: 3 })}
                    />
                    <span className="text-dark text-md">
                      medium- Est 2-3 hrs
                    </span>
                  </div>
                </div>
                <div className="my-2 md:my-auto">
                  <input
                    type="radio"
                    name="duration"
                    id="time"
                    onClick={() => setBooking({ ...booking, duration: 6 })}
                  />
                  <span className="text-dark text-md">large- Est 4+ hrs</span>
                </div>
              </div>
            </div>
            {/* estimated amount */}
            <div className="my-4 justify-evenly mx-auto w-1/2">
              <span className="text-lg  text-dark font-semibold">
                Estimated Charge:
              </span>
              <span className="font-medium">₹{booking?.estimatedCharge}</span>
            </div>
          </div>
          {/* date and slot section */}
          <div className="bg-light w-full  py-2 rounded-md  shadow-sm  border-[1px] border-slate-300 mb-10">
            <h1 className="text-dark text-center text-lg font-semibold mb-2 ">
              Date & time
            </h1>
            <div>
              {error.date && (
                <p className="mx-auto text-center  w-1/3 text-slate-400  text-md ">
                  Invalid date
                </p>
              )}
            </div>
            <div className="flex flex-col md:flex-row md:justify-center mx-2">
              <input
                type="date"
                name="date"
                value={ new Date(booking.date).toISOString().split('T')[0]}
                min={new Date().toISOString().split('T')[0]}
                onChange={handleDate}
                placeholder="zip-code"
                className={`py-1 my-auto focus:outline focus:outline-slate-400  border-[1px] 
                ${error.date ? "border-red-700" : "border-slate-300"}
                 rounded-lg md:px-10 md:mx-3 lg:ml-16  md:ml-3 `}
              />
              {!blockSlot.morning && (
                <button
                  onClick={() => setBooking({ ...booking, slot: "morning" })}
                  className={`rounded-lg  border-[1px] ${
                    booking.slot === "morning" ? "bg-slate-300" : "bg-slate-200"
                  } border-slate-300 px-3 my-2 h-1/2 md:my-auto mx-1 py-1`}
                >
                  Morning
                </button>
              )}
              {!blockSlot.afternoon && (
                <button
                  onClick={() => setBooking({ ...booking, slot: "afternoon" })}
                  className={`rounded-lg  border-[1px] ${
                    booking.slot === "afternoon"
                      ? "bg-slate-300"
                      : "bg-slate-200"
                  } border-slate-300 px-3 my-2 h-1/2 md:my-auto mx-1 py-1`}
                >
                  Afternoon
                </button>
              )}
              {!blockSlot.evening && (
                <button
                  onClick={() => setBooking({ ...booking, slot: "evening" })}
                  className={`rounded-lg  border-[1px] ${
                    booking.slot === "evening" ? "bg-slate-300" : "bg-slate-200"
                  } border-slate-300 px-3 my-2 h-1/2 md:my-auto mx-1 py-1`}
                >
                  Evening
                </button>
              )}
            </div>
            <div className="text-center md:text-center">
              <h1 className="text-lg  mt-3 mb-2 text-dark font-semibold">
                Tell us details about your task
              </h1>
              <textarea
                required
                onChange={(e) =>
                  setBooking({ ...booking, detail: e.target.value })
                }
                className="lg:ml-16  w-3/4 md:w-1/2 rounded-md border-[1px] outline-none focus:border-slate-300 "
              />
            </div>
            <div className="w-full md:-3/4 flex my-2 justify-center">
              <button
                disabled={loading}
                onClick={handleBooking}
                className="rounded-lg border-[1px] mx-auto bg-dark text-white border-slate-300 hover:bg-slate-800 px-3 my-2 h-1/2 md:my-auto  py-1"
              >
                {loading ? <ClipLoader color="#ffff" size={20} /> : " Book Now"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Booking;
