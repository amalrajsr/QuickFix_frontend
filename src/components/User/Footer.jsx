import React from "react";

function Footer({background}) {
  let footerContent = [
    "About Us",
    "Terms and Conditons",
    "FAQ",
    "Privacy Policy",
  ];
  let icons = ["fa-instagram", "fa-facebook", "fa-twitter"];
  const logo='https://res.cloudinary.com/dsw9tifez/image/upload/v1679228278/quickfix/static/logo-white_otf7yb.png'
  return (
    <>
      <div className={`${background|| 'bg-dark'} w-full mt-auto`}>
        <div className="my-10 flex justify-center w-full">
          <img src={logo} alt="quickfix logo" width={150} height={50} />
        </div>
        <div className=" mx-10 flex flex-col content-center sm:flex-row justify-between wrap	">
          {footerContent.map((data, i) => {
            return (
              <h3
                key={i}
                className="text-white text-lg text-center md:text-start"
              >
                {data}
              </h3>
            );
          })}
        </div>
        <div className="flex my-14 w-full  justify-center gap-20">
          {icons.map((icons, i) => {
            return (
              <i
                key={i}
                className={`  fa-brands ${icons} fa-2xl text-[#9ca2ae]`}
              ></i>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Footer;
