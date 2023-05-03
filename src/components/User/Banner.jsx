import React from "react";
function Banner() {
  const banner =
    "https://res.cloudinary.com/dsw9tifez/image/upload/v1679220718/quickfix/static/banner1_vohlaf.jpg";
  return (
    <>
      <div
        style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover" }}
        className={` mt-16 gap-5 flex flex-col h-[300px] items-center  w-full md:h-76  justify-center `}
      >
        <span className="sm:text-xl md:text-2xl transition-all transform	delay-150	  hover:ease-in-out  text-slate-200 font-medium tracking-wide	hover:border-y-2 hover:border-indigo-500 hover:py-2 	">
          QuickFix is your one-stop solution for all your home needs. <br />
          We offer personalized assistance and quality workmanship at affordable
          prices.
        </span>
      
      </div>
    </>
  );
}

export default Banner;
