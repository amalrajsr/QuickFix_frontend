import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "../../validations/UserValidation";
import axios from "../../config/axios";
function ServiceMangement() {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(serviceSchema),
  });
  const onHandleSubmit = async(serviceData) => {
    console.log(serviceData);
    const service=new FormData()
    service.append('service',serviceData.service)
    service.append('image',serviceData.image)
    service.append('installationCharge1Hour',serviceData.installationCharge1Hour)
    service.append('installationChargeLatelyHours',serviceData.installationChargeLatelyHours)
    service.append('repairCharge1Hour',serviceData.repairCharge1Hour)
    service.append('repairChargeLatelyHours',serviceData.repairChargeLatelyHours)

    try{
      const {data}= await axios.post('/admin/services',service,{
        headers: {
        'Content-Type': 'multipart/form-data'
        }})
    console.log(data)
    }catch(error){
      console.log(error);
    }
  };
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
    {
      name: "year",
      selector: (row) => row.title,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },

  ];
  return (
    <>
      <Modal open={open} onClose={onCloseModal} center>
        <h3 className="text-center text-2xl">Add Service</h3>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="flex flex-col mb-3">
            <label className="mx-3">Service</label>
            <input
              type="text"
              name="service"
              className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
              {...register("service")}
            />
            <p className="mx-3 text-slate-400">{errors.service?.message}</p>
          </div>

          <div className="flex flex-col mb-3">
            <label className="mx-3">Image</label>
            <input
              type="file"
              name="image"
              className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
              accept="image/jpeg, image/png,image/jpg"
              {...register("image")}
              required
            
            />
            <p className="mx-3 text-slate-400">{errors.image?.message}</p>
          </div>

          <div className="flex flex-col md:flex-row mb-3">
            <div>
              <label className="mx-3 block">Installation Charge 1hr</label>
              <input
                type="number"
                name="installationCharge1Hour"
                className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
                {...register("installationCharge1Hour")}
              />
              <p className="mx-3 text-slate-400">
                {errors.installationCharge1Hour?.message}
              </p>
            </div>
            <div>
              <label className="mx-3 block">Lately hours</label>
              <input
                type="number"
                name="installationChargeLatelyHours"
                className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
                {...register("installationChargeLatelyHours")}
              />
              <p className="mx-3 text-slate-400">
                {errors.installationChargeLatelyHours?.message}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div>
              <label className="mx-3 block">Repair Charge 1hr</label>
              <input
                type="number"
                name="repairCharge1Hour"
                className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
                {...register("repairCharge1Hour")}
              />
              <p className="mx-3 text-slate-400">{errors.repairCharge1Hour?.message}</p>
            </div>
            <div>
              <label className="mx-3 block">Lately hours</label>
              <input
                type="number"
                name="repairChargeLatelyHours"
                className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
                {...register("repairChargeLatelyHours")}
              />
              <p className="mx-3 text-slate-400">
                {errors.repairChargeLatelyHours?.message}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button className="bg-black text-white px-5 py-1 rounded-md ">
              add
            </button>
          </div>
        </form>
      </Modal>

      <div className="w-full  mx-3">
        <div className="mx-10 mt-5">
          <span className="text-2xl">Service Management</span>
        </div>
        <div className=" w-3/4 mt-20 mx-10 overflow-x-auto">
          <div className="mx-1 flex  my-2">
            <input
              type="text"
              id="table-search"
              className="block  p-2 pl-4 outline-none focus:outline-gray-300 text-sm text-gray-900  border-gray-300 rounded-lg w-40 md:w-60 bg-gray-50 "
              placeholder="Search here"
            />
            <button
              onClick={onOpenModal}
              className="bg-slate-100 mx-auto px-2 rounded-lg"
              data-modal-target="authentication-modal"
              data-modal-toggle="authentication-modal"
            >
              add service
            </button>
          </div>

          <DataTable
            columns={columns}
            data={data}
            fixedHeader
            fixedHeaderScrollHeight="300px"
          />
        </div>
      </div>
    </>
  );
}

export default ServiceMangement;
