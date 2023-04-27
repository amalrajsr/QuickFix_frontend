import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { expertSchema } from "../../validations/Validation";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { expertLoginApi } from "../../apis/expert";
import "react-toastify/dist/ReactToastify.css";
import { addExpert } from "../../store/slices/expertSlice";
import fireToast from "../../utils/fireToast";
import {HiArrowLongRight} from 'react-icons/hi2'
function ExpertLogin() {
  const token = localStorage.getItem("expert");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setshowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(expertSchema),
  });

  const onHandleSubmit = async (expert) => {
    setLoading(true);
    try {
      const { data } = await expertLoginApi(expert);
      setLoading(false);
     
      if (data.token && data.expert) {
        localStorage.setItem("expert", data.token);
        dispatch(addExpert(data.expert));
        navigate("/expert/profile");
      }
    } catch (error) {
      setLoading(false);
      fireToast("error", error.response?.data?.error.message);
    }
  };
  const banner =
    "https://res.cloudinary.com/dsw9tifez/image/upload/v1680704435/hero_landing-fdeb7ef8f1a4361ec76f75d007d79546_o0hv9r.jpg";
  return token ? (
    <Navigate to={"/expert/profile"} />
  ) : (
    <div className=" mt-20 mb-5  flex items-center  justify-center p-10">
      <div className="border-[1px] rounded-lg  md:h-[400px] border-slate-300 signup-container shadow-md md:shadow-none bg-light flex md:w-[800px]  w-[375px]">
        <div className="bg-white shadow-lg h-full p-10 w-full  md:shadow-md md:w-2/4 rounded-l-lg">
          <h3 className="font-semibold text-2xl text-center mt-2 mb-3 my-2 ">
            Expert Login
          </h3>
          <form
            onSubmit={handleSubmit(onHandleSubmit)}
            className="my-auto mx-auto text-center mt-12"
          >
            <div>
              <label className="text-start w-full block" htmlFor="">
                Email
              </label>
              <input
                type={"email"}
                name={"email"}
                placeholder={"email"}
                className={
                  " py-[6px]  w-full border-[1px] border-slate-300 focus:outline-slate-300 rounded-md px-10 "
                }
                {...register("email")}
              />
            </div>
            <p className="text-slate-400">{errors.email?.message}</p>
            <div>
              <label className="text-start w-full mt-2 block" htmlFor="">
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name={"password"}
                placeholder={"password"}
                className={
                  " py-[6px]  w-full border-[1px] border-slate-300 focus:outline-slate-300 rounded-md px-10 "
                }
                {...register("password")}
              />
            </div>
            <div className="mt-1  flex gap-6">
              <div>
                <input
                  onChange={() => setshowPass(!showPass)}
                  type="checkbox"
                  className="ml-1"
                />
                <span className="hidden sm:inline">show</span>{" "}
              </div>
              <p className="text-slate-400">{errors.password?.message}</p>
              
            </div>

            <div className="mt-3">
              {loading ? (
                <button
                  disabled
                  className="bg-dark rounded-lg hover:bg-gray-800 text-white py-2  px-6"
                >
                  <ClipLoader color="#ffff" size={20} />
                </button>
              ) : (
                <Button customeStyle={"bg-expertblue"}>Login</Button>
              )}

<p onClick={(()=>navigate('/expert/forgot-password'))} className="flex justify-center mt-3 cursor-pointer text-dark">
                <HiArrowLongRight className="mt-1 mr-1 " /> Forgot Password
              </p>
            </div>
          </form>
        </div>
        <div
          style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover" }}
          className="bg-[#fdfcfc] hidden md:flex md:justify-center items-center	 shadow-lg 	  w-2/4 rounded-r-lg  "
        ></div>
      </div>
    </div>
  );
}

export default ExpertLogin;
