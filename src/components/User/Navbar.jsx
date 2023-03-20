import React, { useState } from 'react'
import Button from '../UI/Button'
import { FaAlignJustify } from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { removeUser } from '../../store/slices/userSlice'
import { Link, NavLink } from 'react-router-dom'
import Options from './Options'
function Navbar() {
  //cloudinary logo link
  const logo='https://res.cloudinary.com/dsw9tifez/image/upload/v1679228278/quickfix/static/logo-dark_udx7tu.png'

  const dispatch=useDispatch()
  const [toggle, setToggle] = useState(false)
  const [profiletoggle,setProfileToggle]=useState(false)

  //fethcing user state from redux
  const user= useSelector((state)=>{
    return state.user
  })

const logout=()=>{

  dispatch(removeUser())
}
  return (
    <>

      <div className='shadow-md  w-full flex justify-between fixed  py-4 bg-light '>
        <div className=' px-5 my-auto md:'>
          <NavLink to='/'>
            <img src={logo} alt="quick fix logo" width={150} height={50} /> 
             </NavLink>

        </div>
        <div className='hidden md:flex md:mx-20 gap-5 navbar-right'>
         {user.value? <h3 className='text-dark font-bold py-2 text-lg' onMouseOver={()=>setProfileToggle(true)}>{user.value.name}</h3>: <>  
          <NavLink to='/login' className='flex items-center'><h3 className='text-dark font-bold  text-lg'>login</h3></NavLink>
          <NavLink to='/register'><Button>Register</Button></NavLink>
          </>}
        </div>
        <div className='md:hidden justify-end my-3 px-7' onClick={() => setToggle(!toggle)}><FaAlignJustify /></div>
      </div>

      {/* mobile screen navbar */}
      {toggle &&
        <> <div className='md:hidden w-[230px] fixed right-0 h-screen bg-[#f9fbfa]' onMouseLeave={()=>setToggle(false)}>
         { <div className={`flex ${user.value?'justify-between':'justify-end'} my-9 px-5`} onClick={() => setToggle(!toggle)}>
            {user.value && <Link to='/profile' className='text-dark text-xl '>Profile</Link>}
                           <i className="fa-solid my-auto fa-xmark fa-xl"></i>
         </div>
         }

       {/* condtionally rendering profile options for logged in user on mobile screen */}
        {user.value?<div className='flex flex-col'>
        <Options/>
       <span className='p-5 hover:shadow-lg text-dark text-xl' onClick={logout}>Logout</span>
        </div>:  <>
          <NavLink to='/login'> <div className='my-3 flex justify-center'><h3 className='text-dark font-bold text-lg' onClick={()=>setToggle(false)}>login</h3></div></NavLink>
          <NavLink to='/register'> <div className="my-1 flex justify-center px-1 " onClick={()=>setToggle(false)}><Button>Register</Button></div></NavLink> 
          </>}
           </div> </>
          
      }

      {/* condtionally rendering profile options for logged in user  */}
     {
      profiletoggle && 
      <div className='fixed w-[250px] md:w-[350px] flex flex-col right-0 h-screen bg-[#f9fbfa]' onMouseLeave={()=>setProfileToggle(false)}>
       <Link to='/profile' className='p-5 bg-[#0000] text-dark text-2xl'>Profile</Link >
        <Options/>
       <span className='p-5 hover:shadow-lg text-dark text-xl' onClick={logout}>Logout</span>
      </div>
     }
    </>

  )
}

export default Navbar