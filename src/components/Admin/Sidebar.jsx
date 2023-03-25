import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TbCategory } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineRateReview } from "react-icons/md";

function Sidebar() {
  const navigate=useNavigate()
  const options = [
    { name: "Users", icon: <FaUser />,path:'/admin/users' },
    { name: "Experts", icon: <GrUserWorker /> ,path:'/admin/experts'},
    { name: "Services", icon: <TbCategory />,path:'/admin/services' },
    { name: "Reviews", icon: <MdOutlineRateReview /> ,path:'/admin/reviews'},
  ];
   
  const handleLogout=async()=>{
   
    localStorage.removeItem('admin')
    navigate('/admin/login')
  }
  return (
    <>
      <aside
        id="separator-sidebar"
        className=" w-16 md:w-52 h-screen "
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col justify-between px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2">
          <li>
              <NavLink to={'/admin/dashboard'} className="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100   group">
              <i className="fa-sharp fa-solid fa-house "></i>
                <span className="ml-3 text-lg hidden md:block">Dashboard</span>
              </NavLink>
            </li>
            {options.map((option) => {
               return(
              <li key={option.name}>
                <NavLink to={option.path} className=" flex items-center p-2 my-5 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 ">
                 {option.icon} 
                  <span className="ml-3 text-lg hidden md:block">{option.name}</span>
                </NavLink>
              </li>)
            })}
          </ul>
          <ul className="pt-4 mt-10 space-y-2 border-t border-gray-200 ">
            <li>
              <div onClick={handleLogout} className="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100   group">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span className="ml-4 text-lg hidden md:block" >Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
