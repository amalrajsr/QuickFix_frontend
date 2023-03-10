import React from 'react'

function button(props) {
  return (
   <>
   <button className='bg-dark rounded-lg hover:bg-gray-800 text-white py-2  px-6'>
    {props.children}
   </button>
   </>
  )
}

export default button