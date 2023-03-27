import React from 'react'
import {  useNavigate } from 'react-router-dom'

function SingleService({data, image, title }) {
     const service=title.toLowerCase()
      const navigate=useNavigate()
    const handleClick=()=>{
          navigate(`/services/${service}`)
    }
    return (

        <div  onClick={handleClick} className=" bg-white w-[200px] h-[150px] mx-auto  py-5 flex flex-col justify-between   hover:shadow-xl rounded-lg mt-5 mb-3 transition ease-in-out delay-5 duration-300 hover:-translate-y-1">
            <img  src={image} alt="service" className=' rounded-tr-lg rounded-tl-lg  w-[50px] h-[50px]  mx-auto'  />
            <h5  className="my-2 text-xl  tracking-tight text-center text-dark">{title}</h5>
        </div>
    )
}

export default SingleService