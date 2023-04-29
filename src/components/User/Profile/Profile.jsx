import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { profileUpdateSchema } from "../../../validations/Validation";
import ClipLoader from "react-spinners/ClipLoader";
import { VscVerifiedFilled } from "react-icons/vsc";
import { updateProfile, updateProfileImage } from "../../../apis/user";
import {
  updateImage,
  updateUser,
  removeUser,
} from "../../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../../UI/Modal";
import { updateExpertProfileApi } from "../../../apis/expert";
import { removeExpert, updateExpert } from "../../../store/slices/expertSlice";
import fireToast from "../../../utils/fireToast";
import { HiArrowLongRight } from "react-icons/hi2";
import ResetPassword from "../../Expert/ResetPassword";
function Profile({ expert }) {
  const navigate = useNavigate();
  // state to handle modal
  const [open, setOpen] = useState(false);
  const [passwordModal, setpasswordModal] = useState(false);

  const onCloseModal = () => {
    setProfileImage(null);
    setOpen(false);
    setError(false);
  };
  const expertImage =
    "https://res.cloudinary.com/dsw9tifez/image/upload/v1680511516/quickfix/static/profile_eil3c6.jpg";

  // dispatch for updating redux
  const dispatch = useDispatch();
  const [error, setError] = useState({ status: false, message: null });
  const [loading, setLoading] = useState(false);
  const onOpenModal = () => setOpen(true);
  const [user, setUser] = useState({ id: null, name: null });
  const [profileImage, setProfileImage] = useState(null);
  const userData = useSelector((state) =>
    expert ? state.expert.value : state.user.value
  );

  useEffect(() => {
    setUser({ name: userData?.name }); //mobile: data.mobile
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    profileUpdateSchema
      .validate(user)
      .then(async (valid) => {
        try {
          const { data } = expert
            ? await updateExpertProfileApi(userData._id, user)
            : await updateProfile(user, userData._id);

          if (data.success) {
            expert
              ? dispatch(updateExpert(user.name))
              : dispatch(updateUser(user.name));
            fireToast("success", "successfully updated");
          }
        } catch (error) {
          if (error.response?.data?.error?.tokenExpired) {
            expert ? dispatch(removeExpert()) : dispatch(removeUser());
            localStorage.removeItem(expert ? "expert" : "user");
            navigate(expert ? "/expert/login" : "/login", {
              state: { tokenExpired: true },
            });
          }
          fireToast("error", error.response?.data?.error.message);
        }
      })
      .catch((error) => {
        fireToast("error", error?.message);
        setLoading(false);
      });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/;
    if (!allowedExtensions.exec(file.name)) {
      setError({ status: true, message: " Only jpg | jpeg | png are allowed" });
    } else {
      setProfileImage(file);

      setError({ ...error, status: false });
    }
  };

  const handleProfileChange = () => {
    if (profileImage) {
      setLoading(true);
      const image = new FormData();
      image.append("file", profileImage);
      updateProfileImage(image, userData._id)
        .then(({ data }) => {
          setLoading(false);
          onCloseModal();
          fireToast("success", "successfully updated");
          dispatch(updateImage(data.image));
          setProfileImage(null);
        })
        .catch((error) => {
          if (error.response?.data?.error?.tokenExpired) {
            localStorage.removeItem("user");
            dispatch(removeUser());
            navigate("/login", {
              state: { tokenExpired: true },
            });
          }
          setLoading(false);
          fireToast("error", error.response?.data?.error.message);
        });
    } else {
      setError({ status: true, message: "please select an image" });
    }
  };
  return (
    <>
      <div
        className={`h-[550px] mb-72 md:mb-32  ${expert ? "mt-14" : "mt-20"}`}
      >
        <div className="bg-light flex justify-center items-center h-1/3">
          <h1 className="text-3xl">My Profile</h1>
        </div>
        <div className="flex  justify-end h-2/3">
          <div className="w-full flex flex-col md:flex-row">
            {/* profile image section */}
            <div className=" w-full md:w-1/2   mt-4  md:flex item-center justify-center   ">
              <div className="h-11/12 w-3/4 md:w-1/2 mt-2  mx-auto border bg-white  rounded-sm">
                <img
                  className="rounded-full w-[175px] h-[175px] mt-2 mx-auto z-10 "
                  src={expert ? expertImage : userData.avatar}
                  alt="profile"
                  onClick={onOpenModal}
                />
                <h1 className="text-center mt-3 font-medium text-lg">
                  Welcome Back, {userData?.name}
                </h1>
                {expert ? (
                  <>
                    {" "}
                    <h1 className="text-center mt-2 font-medium text-md">
                      City: {userData?.city}
                    </h1>
                    <h1 className="text-center mt-2 font-medium text-md">
                      Service: {userData?.service}{" "}
                      <span className="text-gray-500">|</span> Total works:
                      {userData?.works?.length}
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 className="text-center mt-2 font-medium text-md">
                     Total Bookings: {userData.booking?.length}{" "}
                    </h1>
                    <p className="text-center mt-6 mb-2">
                      <button
                        onClick={onOpenModal}
                        className="py-1  px-3 rounded-md bg-dark text-white"
                      >
                        change icon
                      </button>
                    </p>
                  </>
                )}
              </div>
            </div>
            {/*  profile image section  ends*/}
            <div className="w-full mt-4 h-full  md:w-1/2  ">
              <div className=" mx-auto  md:mx-0   h-full flex flex-col border w-3/4  rounded-md ">
                <form
                  onSubmit={handleSubmit}
                  className={`w-3/4 mx-auto flex flex-col gap-3 justify-center mt-4 ${
                    expert ? "md:mt-8" : "md:mt-24"
                  }`}
                >
                  <div className="flex flex-col ">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      value={user?.name || ""}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      className="py-2 focus:border-0 focus:outline-none  border-[1px] border-slate-300 focus:outline-slate-300 rounded-md px-10 "
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="">Mobile</label>
                    <div className="border-[1px] flex border-slate-300 rounded-md focus:outline-slate-300">
                      <input
                        value={userData?.mobile || user.mobile || ""}
                        // onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                        type="text"
                        disabled
                        className="py-2 focus:border-0 focus:outline-none  rounded-md px-10 "
                      />{" "}
                      <VscVerifiedFilled className="my-auto mx-auto text-green-700 text-2xl" />
                    </div>
                  </div>
                  {expert && (
                    <div className="flex flex-col ">
                      <label htmlFor="">Email</label>
                      <div className="border-[1px] flex border-slate-300 rounded-md focus:outline-slate-300">
                        <input
                          value={userData?.email}
                          type="email"
                          disabled
                          className="py-2  focus:border-0 focus:outline-none rounded-md px-10 "
                        />
                        <VscVerifiedFilled className="my-auto mx-auto text-green-700 text-2xl" />
                      </div>
                    </div>
                  )}

                  <Button loading={loading} customeStyle={`my-2 mt-3`}>
                    update
                  </Button>

                  {expert && (
                    <p
                      onClick={() => setpasswordModal(true)}
                      className="flex justify-end cursor-pointer text-slate-500"
                    >
                      {" "}
                      <HiArrowLongRight className="mt-1 mr-1 " /> Reset Password
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        heading={"Reset Password"}
        open={passwordModal}
        onClose={() => setpasswordModal(false)}
      >
        <ResetPassword setpasswordModal={setpasswordModal} />
      </Modal>
      {!expert && (
        <>
          <Modal open={open} onClose={loading ? onOpenModal : onCloseModal}>
            <div class="flex justify-center mt-8 w-full h-full">
              <div class="rounded-lg shadow-xl bg-gray-50 ">
                <div class="m-4">
                  <label class="inline-block mb-2 text-gray-500">
                    Profile Image
                  </label>
                  {error.status && (
                    <p className="mx-3 text-red-600">{error.message}</p>
                  )}
                  <div class="flex items-center justify-center w-full">
                    <label
                      class={`flex flex-col w-full h-32 border-4 border-dashed ${
                        error.status && "border-red-600"
                      } hover:bg-gray-100 hover:border-gray-300`}
                    >
                      <div class="flex flex-col items-center justify-center pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          Select a photo
                        </p>
                      </div>
                      <input
                        onChange={handleImage}
                        type="file"
                        class="opacity-0"
                      />
                    </label>
                  </div>
                </div>
                <img
                  src={
                    profileImage
                      ? URL.createObjectURL(profileImage)
                      : userData.avatar
                  }
                  alt="profile"
                  className="mx-auto w-[100px] h-[100px]"
                />
                <div class="flex justify-center p-2 my-2 space-x-4">
                  {loading ? (
                    <span className="px-4  text-white bg-dark rounded shadow-xl">
                      <ClipLoader color="#ffff" size={20} />
                    </span>
                  ) : (
                    <button
                      onClick={handleProfileChange}
                      className="px-4  text-white bg-dark rounded shadow-xl"
                    >
                      upload
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default Profile;
