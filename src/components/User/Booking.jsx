import React, { useEffect, useState } from "react";
import { addressSchema } from "../../validations/Validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";

function Booking() {
  const location=useLocation()
  const navigate=useNavigate()

  useEffect(()=>{
    if(!location.state){
      navigate('/')
    }

  },[])
  const service=location?.state?.data
  const [zipcodeError, setzipcodeError] = useState(false);
  const [address, setAddress] = useState(false);
  const [booking,setBooking]=useState({serviceType:false,duration:false,amount:0})
console.log(service);
  useEffect(()=>{  
  
    if(booking.serviceType && booking.duration){
      switch(booking.serviceType){
        case('installation'):
        switch(booking.duration){
        case(1):
        setBooking({...booking,amount:service.installationCharge1Hour})
        break;
        case(3):    
        setBooking({...booking,amount:service.installationCharge1Hour+(2*service.installationChargeLatelyHours)})
        break;
        case(6):
        setBooking({...booking,amount:service.installationCharge1Hour+(6*service.installationChargeLatelyHours)})
        break;
        default:
        }
        break;
        case('repair'):
        switch(booking.duration){
          case(1):
          setBooking({...booking,amount:service.repairCharge1Hour})
          break;
          case(3):    
          setBooking({...booking,amount:service.repairCharge1Hour+(2*service.repairChargeLatelyHours)})
          break;
          case(6):
          setBooking({...booking,amount:service.repairCharge1Hour+(6*service.repairChargeLatelyHours)})
          break;
          default:
         
        }
        break
        default:
            


      }
      

     console.log(booking);
    }
  },[booking.serviceType,booking.duration])

  // form validation using useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  const onHandleSubmit = (userAddress) => {
    if (address.zipcode !== "673301") {
      setzipcodeError(true);
    } else {
      setzipcodeError(false);
       setAddress(userAddress)
    }
  };

  return (
    <div className="w-3/4 mx-auto  mt-32 ">
      {/* address section */}
      <div className="bg-light rounded-md  shadow-md  border-[1px] border-slate-300 w-full md:w-3/4 ">
        <h1 className=" m-3 text-2xl text-center w-3/4 font-sans text-dark mb-5 font-medium">
          ADDRESS
        </h1>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap md:mx-3   justify-between w-full md:w-2/3 ">
            <div>
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
            <div>
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
          <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap md:mx-3  justify-between w-full md:w-2/3 ">
            <div>
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
            <div>
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
          <div className="flex flex-col md:flex-row flex-wrap  md:mx-3  lg:flex-nowrap justify-between w-full md:w-2/3  ">
            <div>
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

            <div>
              <input
                {...register("zipcode")}
                type="number"
                name="zipcode"
                onChange={() => setzipcodeError(false)}
                placeholder="zip-code"
                className={`py-2 mt-5 focus:outline focus:outline-slate-400  border-[1px] ${
                  zipcodeError ? "border-red-700" : "border-slate-300"
                } rounded-lg px-10 md:mx-3  md:ml-3 `}
              />
              {errors.zipcode && (
                <p className="mx-4 text-slate-400  text-sm  ">
                  {errors.zipcode.message}
                </p>
              )}
              {zipcodeError && (
                <p className="mx-4 text-slate-400  text-sm ">
                  Sorry, this task is outside of our coverage area
                </p>
              )}
            </div>
          </div>
          <div className=" mx-auto w-1/2 mb-2 mt-5">
            <button className="bg-dark rounded-lg mx-8 hover:bg-gray-800 text-white   px-5 py-1"> Add address</button>
         
          </div>
        </form>
      </div>

      {/* work type and time section */}
      <div className="bg-light w-full md:w-3/4 my-2 rounded-md  shadow-sm  border-[1px] border-slate-300">
        <div className=" flex flex-col lg:flex-row my-2 w-3/4 justify-evenly">
          <div className="work-section">
            <h1 className="text-dark text-lg font-semibold mx-2">Work Type</h1>
            <div className="my-2">
              <input type="radio" onClick={()=>setBooking({...booking,serviceType:'installation'})} name="servicetype"  />
              <span className="text-dark text-md">Installation</span>
            </div>
            <div>
              <input type="radio" name="servicetype" onClick={()=>setBooking({...booking,serviceType:'repair'})} />
              <span className="text-dark text-md">Repair</span>
            </div>
          </div>

          <div className="date-section">
            <h1 className="text-dark text-lg font-semibold">
              How big is your task
            </h1>
            <div className="my-2  md:flex">
              <div className="mr-4">
                <input type="radio" name="duration" id="time" onClick={()=>setBooking({...booking,duration:1})}/>
                <span className="text-dark text-md">small- Est 1 hr</span>
              </div>
              <div className="my-2 md:my-0">
                <input type="radio" name="duration" id="time" onClick={()=>setBooking({...booking,duration:3})} />
                <span className="text-dark text-md">medium- Est 2-3 hrs</span>
              </div>
            </div>
            <div className="my-2 md:my-0">
              <input type="radio" name="duration" id="time" onClick={()=>setBooking({...booking,duration:6})}/>
              <span className="text-dark text-md">large- Est 4+ hrs</span>
            </div>
          </div>
        </div>
        {/* estimated amount */}
        <div className="my-4">
            <span className="text-lg text-dark font-semibold lg:ml-20">Estimated Amount: </span>
            <span className="font-medium">{booking?.amount}</span>
          </div>
      </div>
       {/* date and time section */}
          <div className="bg-light w-full md:w-3/4 mb-1 rounded-md  shadow-sm  border-[1px] border-slate-300">
            <h1 className="text-dark text-lg font-semibold  lg:ml-20">Date & time</h1>
            <div className="flex flex-col md:flex-row">
            <input
                type="date"
                name="date"
                placeholder="zip-code"
                className={`py-1 mt-5 focus:outline focus:outline-slate-400  border-[1px] 
                  border-slate-300
                 rounded-lg md:px-10 md:mx-3 lg:ml-16  md:ml-3 `}
              />
            <button className="rounded-lg border-[1px] border-slate-300 px-3 my-2 md:my-0 mx-1 py-1">Morning</button>
            <button className="rounded-lg border-[1px] border-slate-300 px-3 my-2 md:my-0   mx-1 py-1">Afternoon</button>
            <button className="rounded-lg border-[1px] border-slate-300 px-3 my-2 md:my-0  mx-1 py-1">Evening</button>
            </div>
          </div>
    </div>
  );
}

export default Booking;
