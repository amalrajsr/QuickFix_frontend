import {  useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "../../../validations/Validation";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import Modal from '../../UI/Modal'
import { addServiceApi } from "../../../apis/admin";
import { ServiceContext } from "../../../context/serviceContext";
import { useNavigate } from "react-router-dom";
function AddService() {
  const navigate=useNavigate()
  const {updateTable,setUpdateTable}= useContext(ServiceContext)

  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [largeImage, setlargeImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // state to handle modal
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = () =>{ 
    setOpen(true)
    reset()
  }
  // form validation using useForm
  const {
    register,
    handleSubmit,
    reset ,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(serviceSchema),
  });
  
  // form submit handler
  const onHandleSubmit = async (serviceData) => {
    setLoading(true);
    const service = new FormData();
    service.append("service", serviceData.service);
    service.append("file", image);
     service.append("file", largeImage);
    service.append(
      "installationCharge1Hour",
      serviceData.installationCharge1Hour
    );
    service.append(
      "installationChargeLatelyHours",
      serviceData.installationChargeLatelyHours
    );
    service.append("repairCharge1Hour", serviceData.repairCharge1Hour);
    service.append(
      "repairChargeLatelyHours",
      serviceData.repairChargeLatelyHours
    );

    // api call
    try {
      const { data } = await addServiceApi(service);

      if (data.success) {
        setLoading(false);
        toast.success("successfully added", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUpdateTable(!updateTable)
       
        onCloseModal();
        reset()
        setImage(null)
      }
    } catch (error) {
      if(error.response?.data?.error?.tokenExpired){
        localStorage.removeItem('admin')
        navigate('/admin/login')
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
      reset()
    }
  };

  // function to validate image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/;
    if (!allowedExtensions.exec(file.name)) {
      setError(true);
    } else {
    setImage(file)
     
      setError(false);
    }
  };

    // function to validate Large Image
    const handleLargeImageChange = (e) => {
      const file = e.target.files[0];
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/;
      if (!allowedExtensions.exec(file.name)) {
        setError(true);
      } else {
      setlargeImage(file)
       
        setError(false);
      }
    };
  
  return (
    <>
      
        <button
          onClick={onOpenModal}
          className="bg-slate-100 mx-auto px-2 rounded-lg"
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
        >
          add service
        </button>
      
      <Modal open={open} onClose={onCloseModal}>
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
              className="py-2
          focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
              accept="image/jpeg, image/png,image/jpg"
              onChange={handleImageChange}
              multiple
              required
            />
                    <img src={image?URL.createObjectURL(image): ''} className='w-[50px] mx-3' alt=" " />

            {error && (
              <p className="mx-3 text-slate-400">
                Only jpg | jpeg | png are allowed
              </p>
            )}
          </div>
          <div className="flex flex-col mb-3">
            <label className="mx-3">Large Image</label>
            <input
              type="file"
              name="largeImage"
              className="py-2
          focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
              accept="image/jpeg, image/png,image/jpg"
              onChange={handleLargeImageChange}
              multiple
              required
            />
                    <img src={largeImage?URL.createObjectURL(largeImage): ''} className='w-[50px] mx-3' alt=" " />

            {error && (
              <p className="mx-3 text-slate-400">
                Only jpg | jpeg | png are allowed
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row mb-3">
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

          <div className="flex flex-col sm:flex-row">
            <div>
              <label className="mx-3 block">Repair Charge 1hr</label>
              <input
                type="number"
                name="repairCharge1Hour"
                className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
                {...register("repairCharge1Hour")}
              />
              <p className="mx-3 text-slate-400">
                {errors.repairCharge1Hour?.message}
              </p>
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

export default AddService;
