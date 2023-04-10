import React, { useState } from "react";
import Modal from "../../UI/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ClipLoader from "react-spinners/ClipLoader";
import { expertRegisterSchema } from "../../../validations/Validation";
import { useSelector } from "react-redux";
import { addExpert } from "../../../apis/admin";
import { toast } from "react-toastify";
function AddExpert({fetchExperts,setfetchExperts}) {
  // state to handle modal
  const [open, setOpen] = useState(false);
  const onCloseModal = () => {
    reset()
    setOpen(false)};
  const onOpenModal = () => setOpen(true);
  const [loading, setLoading] = useState(false);
  const services = useSelector((state) => state.service.value); // fetching services from redux
  const locations=useSelector((state) => state.location.value); // fetching locations from redux
  // form validation using useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(expertRegisterSchema),
  });

  const onHandleSubmit =async (expertData) => {
    
    console.log(expertData)
    setLoading(true)
    
    try{
     const {data}=await addExpert(expertData)
      setLoading(false)
      if(data.success && data.result){
                 onCloseModal()
                 reset()
                 setfetchExperts(!fetchExperts)
          toast.success("Added successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

      }

    }catch(error){
      setLoading(false)
      toast.error(error.response?.data?.error.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });    }
    
  };
console.log(errors)
  return (
    <>
      <button
        onClick={onOpenModal}
        className="bg-slate-100 mx-auto px-2 rounded-lg"
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
      >
        add expert
      </button>

      <Modal open={open} onClose={loading?onOpenModal: onCloseModal}>
        <h3 className="text-center text-2xl">Add expert</h3>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="flex flex-col mb-3">
            <label className="mx-3">Name</label>
            <input
              type="text"
              name="name"
              className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
              {...register("name")}
            />
            <p className="mx-3 text-slate-400">{errors.name?.message}</p>
          </div>

          <div className="flex flex-col mb-3">
            <label className="mx-3 block">email</label>
            <input
              type="email"
              name="email"
              className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
              {...register("email")}
            />
            <p className="mx-3 text-slate-400">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col mb-3">
            <label className="mx-3 block">mobile</label>
            <input
              type="number"
              name="mobile"
              className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
              {...register("mobile")}
            />
            <p className="mx-3 text-slate-400">{errors.mobile?.message}</p>
          </div>
          <div className="flex flex-col mb-3">
            <label className="mx-3 block">Service</label>

            <select
              {...register("service")}
              id="service"
              name="service"
              onChange={(e)=>console.log(e.target.value)}
              className=" py-2  w-auto mx-2  border-slate-300 focus:outline-slate-300   text-gray-700 bg-white border rounded-md "
            >
              {services.map((service) => {
                return (
                  !service.isDeleted && (
                    <option key={service._id} id={service._id} value={service._id}>
                      {service.service}
                    </option>
                  )
                );
              })}
            </select>
            <p className="mx-3 text-slate-400">{errors.service?.message}</p>
          </div>
          <div className="flex flex-col mb-3">
            <label className="mx-3 block">City</label>

            <select
              {...register("city")}
              id="item"
              name="city"
              className=" py-2  w-auto mx-2  border-slate-300 focus:outline-slate-300   text-gray-700 bg-white border rounded-md "
            >
              {locations.map((location) => {
                return (
                  !location.isBlocked && (
                    <option key={location._id} value={location.place}>
                      {location.place}
                    </option>
                  )
                );
              })}
            </select>
            <p className="mx-3 text-slate-400">{errors.service?.message}</p>
          </div>

          <div className="flex justify-center mt-5">
            <button
           
              disabled={loading}
              className="bg-black text-white px-5 py-1 rounded-md "
            >
              {loading ? <ClipLoader color="#ffff" size={20} /> : "add"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddExpert;
