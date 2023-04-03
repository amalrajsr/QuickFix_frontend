import React from "react";
import Banner from "../../components/User/Banner";
import TrendingServices from "../../components/User/Services/TrendingServices";
import Services from "../../components/User/Services/Services";
import {GrStatusGood} from 'react-icons/gr'
function Home() {
  const banner='https://assets.taskrabbit.com/v3/assets/homepage/tasker1-desktop.jpg'
  return (
    <>
      <Banner />
      <TrendingServices />
      <Services />
      <div className="w-full  flex-col md:flex-row h-[450px] flex my-5">
        <div className="flex justify-center   w-full h-full md:w-1/2 bg-[#F9FAFB]">
          <div className="my-24 text-center">
            <h1 className="text-2xl  text-dark font-bold">Everyday life made easier</h1>
            <h3 className="my-4 text-lg font-semibold w-3/4 mx-auto text-dark">When life gets busy, you don’t have to tackle it alone. Get <br /> time back for what you love without breaking the bank.</h3>
            <span className="my-3 inline-flex gap-3 text-lg font-semibold w-3/4 justify-center text-dark"><span className="mt-1"><GrStatusGood/></span> Choose your Expert by reviews, skills, and price</span>
            <span className="my-3 inline-flex gap-3 text-lg font-semibold w-3/4 justify-center text-dark"><span className="mt-1"><GrStatusGood/></span> Schedule when it works for you — as early as today</span>

          </div>
        </div>
        <div style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover" }} className="w-full h-full md:w-1/2"></div>
      </div>
    </>
  );
}

export default Home;
