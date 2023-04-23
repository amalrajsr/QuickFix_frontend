import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../UI/Button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { passwordSchema } from "../../validations/Validation";
import { resetPasswordApi } from "../../apis/expert";
import { useSelector } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import fireToast from "../../utils/fireToast";
function ResetPassword({ setpasswordModal }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPass, setshowPass] = useState({
    currentPass: false,
    newPass: false,
  });
  const expert = useSelector((state) => state.expert.value);
  // from validation using useFrom and yup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const changePassword = async (passwordData) => {
    if (passwordData.NewPass !== passwordData.ReNewPass) {
      setError("password mismatch");
    } else if (passwordData.currentPass === passwordData.NewPass) {
      setError("new password cannot be the old password");
    } else {
      setError(false);
      try {
        setLoading(true);
        const { data } = await resetPasswordApi(expert?._id, passwordData);
        setLoading(false);
        if (data.success) {
          fireToast("success", "password changed successfully");
          reset();
          setpasswordModal(false);
          
        }
      } catch (error) {
        setLoading(false);
        fireToast("error", error.response?.data?.error.message);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(changePassword)}
      className={`w-3/4 mx-auto flex flex-col gap-3 justify-center mt-4`}
    >
      <div className="flex flex-col">
        <label htmlFor="">Current Password</label>
        <div className="flex border-[1px] border-slate-300 focus:outline-slate-300 rounded-md">
          <input
            type={`${showPass.currentPass ? "text" : "password"}`}
            name="currentPass"
            id="pass"
            className="py-2 border-none focus:border-0 focus:outline-none rounded-md  px-10 "
            {...register("currentPass")}
          />
          {showPass?.currentPass ? (
            <AiFillEyeInvisible
              onClick={() => setshowPass({ ...showPass, currentPass: false })}
              className="my-auto"
            />
          ) : (
            <AiFillEye
              onClick={() => setshowPass({ ...showPass, currentPass: true })}
              className="my-auto"
            />
          )}
        </div>
        {errors?.currentPass?.message && (
          <p className="text-red-600">{errors?.currentPass?.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="">New Password</label>
        <div className="flex border-[1px] border-slate-300 focus:outline-slate-300 rounded-md">
          <input
            type={`${showPass.newPass ? "text" : "password"}`}
            name="NewPass"
            id="repass"
            className="py-2 rounded-md px-10 border-none focus:border-0 focus:outline-none "
            {...register("NewPass")}
          />
          {showPass?.newPass ? (
            <AiFillEyeInvisible
              onClick={() => setshowPass({ ...showPass, newPass: false })}
              className="my-auto"
            />
          ) : (
            <AiFillEye
              onClick={() => setshowPass({ ...showPass, newPass: true })}
              className="my-auto"
            />
          )}
        </div>
        {errors?.NewPass?.message && (
          <p className="text-red-600">{errors?.NewPass?.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Retype New Password</label>
        <input
          type={`${showPass.newPass ? "text" : "password"}`}
          name="ReNewPass"
          id="renewpass"
          className="py-2  border-[1px] border-slate-300 focus:outline-slate-300 rounded-md px-10 "
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

export default ResetPassword;
