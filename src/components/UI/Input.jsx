import React from 'react'

function Input({type,name,placeholder}) {


  return (
    <>
     <input type={type} name={name} placeholder={placeholder} className='py-2 mt-5 focus:outline-slate-300 rounded-md px-10 mx-3' />
    </>
  )
}

export default Input