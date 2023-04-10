import React from "react";

function Button(props) {

  return props.booking ? (
    <>
      <button
        onClick={() => props.setbookingStatus(props.booking)}
        className={`${
          props.bookingStatus === props.booking && "bg-light"
        } text-center md:text-start border-[1px] rounded-md border-light hover:shadow-md  px-3 mt-5 mx-5 `}
      >
        {props.children}
      </button>
    </>
  ) : (
    <>
      <button
        className={` rounded-lg hover:bg-gray-800 text-white ${
          props.customeStyle || ""
        } py-2 bg-dark px-6`}
      >
        {props.children}
      </button>
    </>
  );
}

export default Button;
