import React from "react";

function Modal(props) {
  if (!props.open) return null;

  return (
    <div className="z-20 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm  flex justify-center items-center">
      <div className="bg-white p-2 rounded  m-2 md:min-w-[400px]">
        <div className="flex justify-end">
          <button className="font-semibold mr-3 mb-2 text-xl" onClick={props.onClose} >
            X
          </button>
        </div>
          <h3 className="font-semibold text-center mb-3 text-lg text-dark">{props?.heading}</h3>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
