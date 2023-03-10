import React from 'react'
import banner from '../../../assets/carpender.png'
function Banner() {
  return (
    <>
    <div className=' px-2 mt-6 flex items-center  flex-shrink justify-center'>
        <img src={banner} alt="banner" className='  shadow-md md:rounded-xl  md:w-[1200] h-[200px] md:h-full'/>
    </div>
    </>
  )
} 
 
export default Banner