import React, { useState } from 'react'
import logo from '../../../assets/navbar-logo.png'
import Button from '../../UI/Button'
import { FaAlignJustify } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
function Navbar() {
  const [toggle, setToggle] = useState(false)
  return (
    <>

      <div className='shadow-md  w-full flex justify-between   py-4 bg-light '>
        <div className=' px-5 my-auto md:'>
          <NavLink to='/'><img src={logo} alt="quick fix logo" width={150} height={50} />  </NavLink>

        </div>
        <div className='hidden md:flex md:mx-20 gap-5 navbar-right'>
          <NavLink to='/login' className='flex items-center'><h3 className='text-dark font-bold  text-lg'>login</h3></NavLink>
          <NavLink to='/register'><Button>Register</Button></NavLink>
        </div>
        <div className='md:hidden justify-end my-3 px-7' onClick={() => setToggle(!toggle)}><FaAlignJustify /></div>
      </div>

      {toggle &&
        <> <div className='md:hidden w-[230px] absolute right-0 h-screen bg-[#f9fbfa]'>
          <div className='flex justify-end my-9 px-5' onClick={() => setToggle(!toggle)}><i className="fa-solid fa-xmark fa-xl"></i></div>
          <NavLink to='/login'> <div className='my-3 flex justify-center'><h3 className='text-dark font-bold text-lg'>login</h3></div></NavLink>
          <NavLink to='/register'> <div className="my-1 flex justify-center px-1 "><Button>Register</Button></div></NavLink>  </div> </>

      }

    </>

  )
}

export default Navbar