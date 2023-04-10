import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import Options from '../User/Options'
import { removeExpert } from '../../store/slices/expertSlice'
function NavBar() {
  const navigate=useNavigate()
   const [profileToggle,setProfileToggle]=useState(false)
    const logo='https://res.cloudinary.com/dsw9tifez/image/upload/v1679228278/quickfix/static/logo-white_otf7yb.png'
    const dispatch=useDispatch()
    const expert=useSelector((state)=>state.expert.value)
    const logout= ()=>{
      localStorage.removeItem('expert')
      dispatch(removeExpert())
      navigate('/expert/login')
    }
  return (
    <div className='fixed flex justify-between top-0 w-full bg-expertBlue z-20 py-3 shadow-sm'>
       
       <NavLink to="/">
            <img  src={logo} alt="quick fix logo" className='mx-3' width={120} height={50} />
          </NavLink>
         <div>
           <button onMouseOver={()=>setProfileToggle(true)} className='mr-10 text-white'> {expert?.name}</button>
         </div>
       {profileToggle &&
         <div onMouseLeave={()=>setProfileToggle(false)} class="fixed flex flex-col right-5 top-12 z-30 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
           
          <Options expert={true}/>
          <button
            className="p-5 text-start text-dark"
            onClick={logout}
          >
            Logout
          </button>
   
         </div>}
    </div>
  )
}

export default NavBar
