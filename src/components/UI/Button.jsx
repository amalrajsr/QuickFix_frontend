import React from 'react'

function Button(props) {

  return (
   <>
   <button  className={`bg-dark rounded-lg hover:bg-gray-800 text-white ${props.customeStyle || '' } py-2  px-6`}>
    {props.children}
   </button>
   </>
  )
}

export default Button