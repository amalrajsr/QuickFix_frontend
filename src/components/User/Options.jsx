import { Link } from "react-router-dom"

function Options({expert}){
    const profileOptions=expert?[{name:'Profile',path:'/expert/profile'},{name:'Works',path:'/expert/works'}] :[{name:'Bookings',path:'/bookings'},{name:'Payment',path:'/payment'}] //{name:'Address',path:'/address'}

 return( 
    
    profileOptions.map((option)=>{
        return  <Link className='p-5 hover:shadow-md text-dark 'key={option.name} to={option.path}>{option.name}</Link>
          })

 )
}


export default Options