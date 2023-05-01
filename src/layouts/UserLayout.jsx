import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/User/Footer";
import Navbar from "../components/User/Navbar";
import { TiMessages } from "react-icons/ti";
import {AiOutlineClose} from 'react-icons/ai'
import ChatModal from "../components/User/ChatModal";
import { useSelector } from "react-redux";
function UserLayout() {
  const [open,setOpen]=useState(false)
  const user= useSelector((state)=>state.user.value)
 
  return (
    <>
      <Navbar />
    <div>  <Outlet /></div>
      <ChatModal  open={open}/>
     {user && <div className="flex justify-end fixed bottom-10 rounded-md right-0 md:right-10 z-10">
        <button onClick={()=>setOpen(open ?false :true)} className="px-5 py-3  shadow shadow-slate-500 rounded-full bg-dark mx-5">
         {open ? <AiOutlineClose  className="text-white"/> :  <TiMessages className="text-white"/> } 
        </button>
        
      </div> }
      <Footer />
    </>
  );
}

export default UserLayout;
