import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { userSchema } from "../../../validations/Validation";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { updateProfile, updateProfileImage } from "../../../apis/user";
import { updateImage, updateUser } from "../../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../../UI/Modal";
function Profile() {
  const navigate = useNavigate();
  // state to handle modal
  const [open, setOpen] = useState(false);
  const onCloseModal = () => {
    setProfileImage(null);
    setOpen(false);
    setError(false);
  };

  // dispatch for updating redux
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const onOpenModal = () => setOpen(true);
  const [user, setUser] = useState({ id: null, name: null, mobile: null });
  const [profileImage, setProfileImage] = useState(null);
  const data = useSelector((state) => state.user.value);
  useEffect(() => {
    setUser({ name: data.name }); //mobile: data.mobile
  }, []);

  const handleSubmit = (e) => {
    console.log('jlll')
    e.preventDefault();
    userSchema
      .validate(user)
      .then((valid) => {
        // if(!user.mobile !==data.mobile){

        // }
        updateProfile(user, data._id).then(({ data }) => {
          console.log(data)
          if(data.success){
            dispatch(updateUser(user.name))
            toast.success("successfully updated", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });
      })
      .catch((error) => {
        if(error.response?.data?.error?.tokenExpired){
          localStorage.removeItem('user')
          navigate('/login')
        }
        setLoading(false);
        toast.error(error.response?.data?.error.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/;
    if (!allowedExtensions.exec(file.name)) {
      setError(true);
    } else {
      setProfileImage(file);

      setError(false);
    }
  };

  const handleProfileChange = () => {
    setLoading(true);
    if (profileImage) {
      const image = new FormData();
      image.append("file", profileImage);
      updateProfileImage(image, data._id)
        .then(({ data }) => {

          setLoading(false);
          onCloseModal();
          toast.success("successfully updated", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch(updateImage(data.image));
          setProfileImage(null);
        })
        .catch((error) => {
          if (error.response?.data?.error?.tokenExpired) {
            localStorage.removeItem("admin");
            navigate("/admin/login");
          }
          setLoading(false);
          toast.error(error.response?.data?.error.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };

  return (
    <>
      <div className=" my-32 mx-auto bg-gradient-to-r from-[#e4f3fb] from-26% to-[#f0f5f7] h-full to-51% flex flex-col shadow-lg w-3/4 md:w-1/2 rounded-xl">
        <div className="h-[150px] border rounded-t-xl text-center">
          <h1 className="text-2xl m-3 mx-auto text-dark font-semibold">
            PROFILE
          </h1>
        </div>
        <div className="h-2/3 border bg-white rounded-b-xl">
          <img
            className="rounded-full w-[175px] h-[175px]  mx-auto z-10 -translate-y-20"
            src={data.avatar}
            alt="profile"
            onClick={onOpenModal}
          />
          <form
            onSubmit={handleSubmit}
            className="w-3/4 mx-auto flex flex-col  justify-center gap-3 -translate-y-12"
          >
            <div className="flex flex-col ">
              <label htmlFor="">Name</label>
              <input
                type="text"
                value={user?.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="py-2  border-[1px] border-slate-300 focus:outline-slate-300 rounded-md px-10 "
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="">Mobile</label>
              <input
                value={user?.mobile || data.mobile || ""}
                // onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                type="text"
                disabled
                className="py-2  border-[1px] border-slate-300 focus:outline-slate-300 rounded-md px-10 "
              />
            </div>
            {loading ? (
                <span className="px-4  text-white bg-dark rounded shadow-xl">
                  <ClipLoader color="#ffff" size={20} />
                </span>
              ) :(            <Button customeStyle={`h-1/2 mt-6`}>update</Button>
              )}
          </form>
        </div>
      </div>
      <Modal open={open} onClose={loading ? onOpenModal : onCloseModal}>
        <div class="flex justify-center mt-8 w-full h-full">
          <div class="rounded-lg shadow-xl bg-gray-50 ">
            <div class="m-4">
              <label class="inline-block mb-2 text-gray-500">
                Profile Image
              </label>
              {error && (
                <p className="mx-3 text-red-600">
                  Only jpg | jpeg | png are allowed
                </p>
              )}
              <div class="flex items-center justify-center w-full">
                <label
                  class={`flex flex-col w-full h-32 border-4 border-dashed ${
                    error && "border-red-600"
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
                  <input onChange={handleImage} type="file" class="opacity-0" />
                </label>
              </div>
            </div>
            <img
              src={
                profileImage ? URL.createObjectURL(profileImage) : data.avatar
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
  );
}

export default Profile;
