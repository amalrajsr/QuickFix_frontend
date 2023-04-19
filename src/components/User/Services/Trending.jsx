import React from 'react'

function Trending({image,title,key}) {
  return (
    
            <div key={key}>
              <img src={image} className=' backdrop-blur-lg w-[50px] h-[50px] transition ease-in-out delay-5 duration-300 hover:-translate-y-1 mx-auto'  alt="trending" />
              <h3 className='text-md sm:text-xl text-dark font-bold text-center'>{title}</h3>
            </div>
    
  )
}

export default Trending