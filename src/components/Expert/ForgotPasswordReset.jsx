import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema } from "../../validations/Validation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../UI/Button";
import { forgotPasswordResetApi, resetPasswordApi } from "../../apis/expert";
import fireToast from "../../utils/fireToast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function ForgotPasswordReset() {
  const location = useLocation();
  const navigate=useNavigate()
  const [showPass, setshowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const expertID = location.state?.expertId || null
  // from validation using useFrom and yup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const changePassword = async (passwordData) => {
  
    if (passwordData.NewPass !== passwordData.ReNewPass) {
      setError("password mismatch");
    } else {
      setError(false);
      try {
        setLoading(true);
        const { data } = await forgotPasswordResetApi(expertID, passwordData);
        setLoading(false);
        if (data.success) {
          fireToast("success", "password changed successfully");
          reset();
          navigate('/expert/login')
        }
      } catch (error) {
        setLoading(false);
        fireToast("error", error.response?.data?.error.message);
      }
    }
  };
console.log(expertID)
  return !expertID ? (
    <Navigate to={"/expert/login"} />
  ) : (
    <form
      onSubmit={handleSubmit(changePassword)}
      className={`w-1/4 min-w-[250px] sm:min-w-[300px]  mb-10 border-[1px] border-slate-300 focus:outline-slate-300 p-5 mx-auto mt-32 flex flex-col gap-3 justify-center `}
    >
      <div className="flex flex-col">
        <label htmlFor="">New Password</label>
        <div className="flex justify-evenly  border-[1px] border-slate-300 focus:outline-slate-300 rounded-md">
          <input
            type={`${showPass ? "text" : "password"}`}
            name="NewPass"
            id="repass"
            className="py-2 rounded-md  border-none focus:border-0 focus:outline-none "
            {...register("NewPass")}
          />
          {showPass ? (
            <AiFillEyeInvisible
              onClick={() => setshowPass(false)}
              className="my-auto "
            />
          ) : (
            <AiFillEye onClick={() => setshowPass(true)} className="my-auto" />
          )}
        </div>
        {errors?.NewPass?.message && (
          <p className="text-red-600">{errors?.NewPass?.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Retype New Password</label>
        <input
          type={`${showPass ? "text" : "password"}`}
          name="ReNewPass"
          id="renewpass"
          className="py-2  border-[1px] border-slate-300 focus:outline-slate-300 rounded-md px-12 "
          {...register("ReNewPass")}
        />
        {error && <p className="text-red-600">{error}</p>}
      </div>
      <Button loading={loading} customeStyle={`my-2 mt-3`}>
        reset password
      </Button>
    </form>
  );
}

export default ForgotPasswordReset;
