import React, { useContext, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "../../UI/Modal";
import { editServiceApi } from "../../../apis/admin";
import { ServiceContext } from "../../../context/serviceContext";
import { useNavigate } from "react-router-dom";
import fireToast from "../../../utils/fireToast";
function EditService({ services, data, toggle }) {
  const navigate = useNavigate();
  const { updateTable, setUpdateTable } = useContext(ServiceContext);
  const [error, setError] = useState(false);
  const [serviceData, setserviceData] = useState(data); // state to hold the service to be edited
  const [preview, setPreview] = useState(null); // preview image
  const [largePreview, setlargePreview] = useState(null); // preview image

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(toggle ? true : false);
  const onCloseModal = () => setOpen(false);

  // image handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/;
    if (!allowedExtensions.exec(file.name)) {
      setError(true);
    } else {
      setserviceData({ ...serviceData, image: file });
      setPreview(file);
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
      setserviceData({ ...serviceData, largeImage: file });
      setlargePreview(file);

      setError(false);
    }
  };

  // handling form submission
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    //checking if service already exists or not
    const serviceExist = services.some(
      (data) => data.service === serviceData.service.toUpperCase()
    );
    if (serviceExist) fireToast('error','service already exist')
    else {
      setLoading(true);
      const service = new FormData();
      service.append("service", serviceData?.service);
      service.append("image", serviceData?.image);
      service.append("largeImage", serviceData?.largeImage);
      service.append(
        "installationCharge1Hour",
        serviceData?.installationCharge1Hour
      );
      service.append(
        "installationChargeLatelyHours",
        serviceData?.installationChargeLatelyHours
      );
      service.append("repairCharge1Hour", serviceData?.repairCharge1Hour);
      service.append(
        "repairChargeLatelyHours",
        serviceData?.repairChargeLatelyHours
      );

      try {
        const { data } = await editServiceApi(serviceData._id, service);

        if (data.success) {
          setLoading(false);
          fireToast("success", "updated successfully");
          setUpdateTable(!updateTable);
          onCloseModal();
        }
      } catch (error) {
        setLoading(false);
        if (error.response?.data?.error?.tokenExpired) {
          localStorage.removeItem("admin");
          navigate("/admin/login");
        }
        fireToast("error", error.response?.data?.error.message);
      }
    }
  };

  return (
    <Modal open={open} onClose={onCloseModal}>
      <h3 className="text-center text-2xl">Edit Service</h3>
      <form onSubmit={onHandleSubmit} encType="multipart/form-data">
        <div className="flex flex-col mb-3">
          <label className="mx-3">Service</label>
          <input
            required
            type="text"
            name="service"
            value={serviceData.service}
            onChange={(e) =>
              setserviceData({ ...serviceData, service: e.target.value })
            }
            className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
          />
          <p className="mx-3 text-slate-400"></p>
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
          />
          <img
            src={preview ? URL.createObjectURL(preview) : serviceData.image}
            className="w-[50px] mx-3"
            alt="service"
          />
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
          />
          <img
            src={
              largePreview
                ? URL.createObjectURL(largePreview)
                : serviceData.largeImage
            }
            alt="largeImage"
            className="w-[50px] mx-3"
          />

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
              required
              type="number"
              value={serviceData.installationCharge1Hour}
              onChange={(e) =>
                setserviceData({
                  ...serviceData,
                  installationCharge1Hour: e.target.value,
                })
              }
              name="installationCharge1Hour"
              className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
            />
            <p className="mx-3 text-slate-400"></p>
          </div>
          <div>
            <label className="mx-3 block">Lately hours</label>
            <input
              required
              type="number"
              value={serviceData.installationChargeLatelyHours}
              onChange={(e) =>
                setserviceData({
                  ...serviceData,
                  installationChargeLatelyHours: e.target.value,
                })
              }
              name="installationChargeLatelyHours"
              className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
            />
            <p className="mx-3 text-slate-400"></p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div>
            <label className="mx-3 block">Repair Charge 1hr</label>
            <input
              required
              type="number"
              name="repairCharge1Hour"
              className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
              value={serviceData.repairCharge1Hour}
              onChange={(e) =>
                setserviceData({
                  ...serviceData,
                  repairCharge1Hour: e.target.value,
                })
              }
            />
            <p className="mx-3 text-slate-400"></p>
          </div>
          <div>
            <label className="mx-3 block">Lately hours</label>
            <input
              required
              type="number"
              name="repairChargeLatelyHours"
              className="py-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
              value={serviceData.repairChargeLatelyHours}
              onChange={(e) =>
                setserviceData({
                  ...serviceData,
                  repairChargeLatelyHours: e.target.value,
                })
              }
            />
            <p className="mx-3 text-slate-400"></p>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button className="bg-black text-white px-5 py-1 rounded-md ">
            {loading ? <ClipLoader color="#ffff" size={20} /> : "edit"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditService;
