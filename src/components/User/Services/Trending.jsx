import React from 'react'

function Trending({image,title}) {
  return (
    
            <div>
              <img src={image} className='w-[50px] sm:w-[80px] sm:h-[80px] transition ease-in-out delay-5 duration-300 hover:-translate-y-1 mx-auto'  alt="trending" />
              <h3 className='text-md sm:text-xl text-dark font-bold text-center'>{title}</h3>
            </div>
    
  )
}

export default Trending