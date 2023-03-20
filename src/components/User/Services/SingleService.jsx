import React from 'react'

function SingleService({ image, title }) {
    return (

        <div className=" bg-white shadow-lg hover:shadow-xl rounded-lg mt-3 transition ease-in-out delay-5 duration-300 hover:-translate-y-1">
            <img  src={image} alt="service" className=' rounded-tr-lg rounded-tl-lg  w-[100px] h-[100px]  mx-auto'  />
            <h5 className="mb-2 text-xl my-2 tracking-tight text-center text-dark">{title}</h5>
        </div>

    )
}

export default SingleService