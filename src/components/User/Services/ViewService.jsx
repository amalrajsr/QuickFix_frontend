import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../UI/Modal";
import ServiceCharge from "../../Admin/Service/ServiceCharge";
import {
  fetchExpertsByService,
  fetchReviewsByServiceApi,
} from "../../../apis/user";
import ReactStars from "react-rating-stars-component";

function ViewService() {
  const [count, setCount] = useState({ experts: 0, workscompelted: 0 });
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetchExpertsByService(service[0]._id, service[0].service).then(
      ({ data }) => {
        setCount({ experts: data.experts, workscompelted: data.works });
      }
    );
  }, []);

  // modal handler
  const [open, setOpen] = useState(false);
  const { name } = useParams();
  const navigate = useNavigate();
  // fetching service from redux
  const services = useSelector((state) => state.service);

  // to fetch single service from an array of services
  const service = services?.value.filter((data) => {
    return data.service === name.toLocaleUpperCase() && !data.isDeleted;
  });

  // navigates to home if route is unknown
  useEffect(() => {
    if (service.length < 1) {
      navigate("/");
    }
  });

  const howItWorks = [
    {
      message: "Place the Order",
      image:
        "https://res.cloudinary.com/dsw9tifez/image/upload/v1681399840/quickfix/static/client-check.6c4fbfd_nxyoqk.svg",
    },
    {
      message: "Experts will be Assigned",
      image:
        "https://res.cloudinary.com/dsw9tifez/image/upload/v1681399859/quickfix/static/clients-check.e5dd40e_oqr3gs.svg",
    },
    {
      message: "Our Expert will call you",
      image:
        "https://res.cloudinary.com/dsw9tifez/image/upload/v1681399879/quickfix/static/expert-call.d20448c_uatx5y.svg",
    },
    {
      message: "Our Experts at your place",
      image:
        "https://res.cloudinary.com/dsw9tifez/image/upload/v1681399897/quickfix/static/expert-delivery.903404f_nkml8q.svg",
    },
    {
      message: "Complete the job",
      image:
        "https://res.cloudinary.com/dsw9tifez/image/upload/v1681399910/quickfix/static/expert-support.84879b9_trwtij.svg",
    },
  ];

  // modal handler
  const onOpenModal = () => setOpen(true);

  // book now
  const handeBookNow = () => {
    navigate("/booking", { state: { data: service[0] } });
  };

  //fetching latest 4 reviews
  useEffect(() => {
    fetchReviewsByServiceApi(service[0]?._id).then(({ data }) => {
      if (data.reviews) {
        setReviews(data.reviews);
      }
    });
  }, []);
  return (
    <>
      {/* banner section */}
      <div className="w-full mt-16 bg-lightpurple ">
        <div className=" containter  mt-10 flex flex-col md:flex-row md:justify-between mb-12 w-3/4 mx-auto">
          <div className="flex flex-col my-2 md:my-auto">
            <h1 className="text-center md:text-start md:mx-3 my-2 text-3xl text-dark font-bold">
              {service?.[0]?.service}
            </h1>
            <div className="flex justify-evenly mt-2">
              <div className=" bg-lightgreen w-[130px] sm:w-[150px] sm:h-[100px] mx-auto md:mx-3 flex flex-col justify-center  rounded-lg hover:shadow-xl">
                <h1 className="text-lg md:text-xl mx-auto text-center text-white ">
                  Experts
                </h1>
                <h1 className="text-lg md:text-xl font-semibold mx-auto text-center text-white">
                  {count.experts < 2 ? count.experts : `${count.experts - 1}+`}
                </h1>
              </div>
              <div className=" bg-lightpink  w-[130px] sm:w-[150px] h-[80px] md:mx-3 sm:h-[100px] mx-auto  flex flex-col justify-center rounded-lg   hover:shadow-xl">
                <h1 className="text-lg md:text-xl mx-auto text-white">Jobs</h1>
                <h1 className="text-lg md:text-xl font-semibold mx-auto text-center text-white">
                  {count.workscompelted < 2
                    ? count.workscompelted
                    : `${count.workscompelted - 1}+`}
                </h1>
              </div>
            </div>
          </div>
          <div className="">
            <img
              src={service?.[0]?.largeImage}
              alt=""
              className=" w-[350px] mt-4 sm:mt-0 mx-auto sm:w-[450px] rounded-lg  h-3/4 md:h-[250px]"
            />
          </div>
        </div>
      </div>
      {/*  book now section */}
      <div className=" bg-white w-[250px] sm:w-[350px] md:w-1/3 h-[150px] flex md:flex-row flex-col justify-end shadow-xl mx-auto my-16">
        <button
          className="bg-slate-200 w-40 md:text-lg hover:bg-slate-300 hover:shadow-md mx-auto md:h-1/3 md:my-auto rounded-lg p-2 px-3"
          data-modal-target="staticModal"
          data-modal-toggle="staticModal"
          onClick={onOpenModal}
        >
          service charges
        </button>
        <button
          className="bg-dark rounded-lg md:text-lg hover:shadow-md  md:h-1/3 md:my-auto w-40 mx-auto hover:bg-gray-700 text-white p-2 my-6 "
          onClick={handeBookNow}
        >
          book now
        </button>
      </div>

      {/* how it works section */}
      <div className="bg-lightpurple w-full mb-10">
        <h1 className="text-center text-2xl md:text-3xl font-semibold mt-4 my-3">
          How it works
        </h1>

        <div className="container md:h-[250px]  grid sm:grid-cols-2 md:grid-cols-5 mx-auto">
          {howItWorks.map((data) => {
            return (
              <div key={data.message} className=" m-auto">
                <img src={data.image} alt="place order" className="mx-auto" />
                <h1>{data.message}</h1>
              </div>
            );
          })}
        </div>
      </div>
      {/* review section */}
      {reviews.length > 0 && (
        <section class="text-gray-600 body-font rounded-xl">
          <div class="container px-5 mb-10 mx-auto">
            <h1 class="text-3xl font-medium title-font text-dark mb-12 text-center">
              Customer Stories
            </h1>
            <div class="flex flex-wrap -m-4">
              {reviews.map((data) => {
                return (
                  <div class="p-4 md:w-1/3 w-full">
                    <div class="h-full bg-gray-100 p-8 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="block w-5 h-5 text-gray-400 mb-4"
                        viewBox="0 0 975.036 975.036"
                      >
                        <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                      </svg>
                      <p class="leading-relaxed  break-words mb-6">
                        {data.review}
                      </p>
                      <p class="inline-flex items-center">
                        <img
                          alt="testimonial"
                          src={
                            data.user.avatar || "https://dummyimage.com/106x106"
                          }
                          class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                        />
                        <span class="flex-grow flex flex-col pl-4">
                          <span class="title-font font-medium text-gray-900">
                            {data.user.name}
                          </span>
                          <span class="text-gray-500 text-sm">
                            {data.date.split("T")[0]}
                          </span>
                          {data.rating > 0 && (
                            <ReactStars
                              count={5}
                              edit={false}
                              size={24}
                              activeColor="#ffd700"
                              value={data.rating}
                            />
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ServiceCharge charge={service[0]} />
      </Modal>
    </>
  );
}

export default ViewService;
