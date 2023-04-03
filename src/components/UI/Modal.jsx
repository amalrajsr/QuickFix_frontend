import React  from "react";

function Modall(props) {

  

    if (!props.open) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-2 rounded  m-5">
          <div className="flex justify-end">
          <button className="font-semibold mr-3 mb-2 text-xl" onClick={props.onClose}>X</button>
          </div> 
           {props.children}
        </div>
      </div>
    );
  
}

export default Modall
