import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLoginSchema, otpSchema } from "../../validations/Validation";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/userSlice";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginApi, loginOtpApi, resendOtpApi } from "../../apis/user";
import fireToast from "../../utils/fireToast";
function Login() {
  const token = localStorage.getItem("user");
  const [otp, setOtp] = useState(false);
  const [resend, setResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
  // cheking if any token expired message is passed thorugh useNavigate
  useEffect(() => {
    if (location.state?.tokenExpired) {
      fireToast("warn", "Token expired Please login to continue");
    }
  }, []);

  console.log(process.env.REACT_APP_SOCKET_URL)
  console.log('env')
  // changing schema based on condition
  const schema = otp ? otpSchema : userLoginSchema;

  // from validation using useFrom and yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = async (userData) => {
    setUser(userData);
    setLoading(true);
    if (!userData.otp) {
      try {
        const { data } = await loginApi(userData);
        setLoading(false);
        if (data.success) {
          setOtp(true);
        }
      } catch (error) {
        console.log(error)
        setLoading(false);
        fireToast("error", error.response?.data?.error.message);
      }
    } else {
      try {
        const { data } = await loginOtpApi(userData);
        setLoading(false);
        if (data.user && data.token) {
          localStorage.setItem("user", data.token);
          dispatch(addUser(data.user));
          navigate(location.state?.from || "/");
        }
      } catch (error) {
        setLoading(false);
        fireToast("error", error.response?.data?.error.message);
      }
    }
  };

  const resendOtp = async () => {
    try {
      setResend(true);
      const { data } = await resendOtpApi(user);
      if (data.success) {
        fireToast("success", `new otp has send to ${user.mobile}`);
      }
      setTimeout(() => {
        setResend(false);
      }, 15000);
    } catch (error) {
      fireToast("error", error.response?.data?.error.message);
    }
  };
  return token ? (
    <Navigate to={"/"} />
  ) : (
    <>
      <div className=" mt-32  mb-10  flex items-center justify-center ">
        <div className="bg-light h-full py-5 md:p-10 md:w-[375px] md:shadow-md  rounded-l-lg">
          <h3 className="font-bold text-3xl text-center mt-5 my-2 ">
            Login here
          </h3>
          <form
            onSubmit={handleSubmit(onHandleSubmit)}
            className="my-auto mx-auto text-center "
          >
            <input
            disabled={otp}
              type="number"
              name={"mobile"}
              placeholder={"mobile number"}
              className="py-2 mt-5 focus:outline-slate-300 rounded-md px-10 mx-3"
              {...register("mobile")}
            />
            {otp && (
              <input
                type="number"
                name={"otp"}
                placeholder={"Enter your OTP"}
                className="py-2 mt-5 focus:outline-slate-300 rounded-md px-10 mx-3"
                {...register("otp")}
              />
            )}
            <p className="text-slate-400">{errors.mobile?.message}</p>
            <div className="mt-6">
              {loading ? (
                <button
                  disabled
                  className="bg-dark rounded-lg hover:bg-gray-800 text-white py-2  px-6"
                >
                  <ClipLoader color="#ffff" size={20} />
                </button>
              ) : (
                <Button>{otp ? "Verify OTP" : "Send OTP"}</Button>
              )}{" "}
            </div>
          </form>
          {otp && (
            <div className="mt-6">
              <button
                disabled={resend}
                onClick={resendOtp}
                className={`${
                  resend ? "text-gray-400" : "text-dark"
                } font-bold text-center block mx-auto `}
              >
                resend OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
