import React from "react";
import Button from "../UI/Button";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Banner() {
  const location=useLocation()
  
  // location?.state?.message &&  toast.error(location.state.message, {
  //   position: "top-right",
  //   autoClose: 1000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  //   });
  const banner ="https://res.cloudinary.com/dsw9tifez/image/upload/v1679220718/quickfix/static/banner1_vohlaf.jpg";
  return (
    <>
      <div
        style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover" }}
        className={` mt-20 gap-5 flex flex-col h-[300px] items-center w-full md:h-76  justify-center`}
      >
        <h1 className="flex gap-5 ">
          <span className="sm:text-3xl md:text-5xl transition-all transform	delay-150	  hover:ease-in-out  text-light font-medium tracking-wide	hover:border-y-2 hover:border-indigo-500 hover:mx-5 py-2	">
            asdfjklsjdfl
          </span>
          <span className="sm:text-3xl md:text-5xl transition-all	delay-150	  hover:ease-in-out  text-light font-medium tracking-wide	hover:border-y-2 hover:border-indigo-500 hover:mx-5 py-2	">
            asdfjklsjdfl
          </span>
        </h1>
        {/* <Button>Book now</Button> */}
      </div>
      <ToastContainer />
    </>
  );
}

export default Banner;
