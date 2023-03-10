import React from 'react'
import image1 from  '../../../assets/trending/trending.png'
import image2 from '../../../assets/trending/smart-tv-trending.png'
import image3 from  '../../../assets/trending/fridge-trending.png'
import Trending from './Trending'

function TrendingServices() {
  return (
    <div className='mt-10'>
        <h3 className='md:text-3xl text-2xl text-dark font-bold text-center mb-10'>Trending Services</h3>
        <div className="flex flex-wrap gap-3 justify-evenly my-3">
        <Trending image={image1} title={'Electrician'}/>
        <Trending image={image2} title={'Smart TV'}/>
        <Trending image={image3} title={'Washing Machine'}/>
        {/* <Trending image={image1} title={'Electrician'}/> */}
        </div>
    </div>
  )
}

export default TrendingServices