import React from 'react'
import SingleService from './SingleService'
import plumbing from '../../../assets/plumbing.jpeg'
function Services() {
  return (
    <div className='bg-light p-8 my-12'>
      <div className='p-5 px-10'>
        <h3 className='text-3xl font-extrabold text-center md:text-justify text-dark'>Services</h3>
        <h5 className='text-dark  text-xl text-center md:text-justify my-2'>With all of our expert services and closings,we blend aesthetics and originality into our construction</h5>
      </div>
        <div className='flex justify-evenly gap-3 flex-wrap'>
        <SingleService image={plumbing} title={'plubming'}/>
        <SingleService image={plumbing} title={'plubming'}/>
        <SingleService image={plumbing} title={'plubming'}/>
        <SingleService image={plumbing} title={'plubming'}/>
        </div>

    </div>
  )
}

export default Services