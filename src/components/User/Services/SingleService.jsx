import React from 'react'

function SingleService({ image, title }) {
    return (

        <div className=" bg-white  px-10 py-5  hover:shadow-xl rounded-lg mt-3 transition ease-in-out delay-5 duration-300 hover:-translate-y-1">
            <img  src={image} alt="service" className=' rounded-tr-lg rounded-tl-lg  w-[50px] h-[50px]  mx-auto'  />
            <h5 className="my-2 text-xl  tracking-tight text-center text-dark">{title}</h5>
        </div>

    )
}

export default SingleService