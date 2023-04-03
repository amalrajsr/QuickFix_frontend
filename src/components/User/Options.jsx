import { Link } from "react-router-dom"

function Options(){
    const profileOptions=[{name:'Bookings',path:'/bookings'},{name:'Payment',path:'/payment'}] //{name:'Address',path:'/address'}

 return( 
    
    profileOptions.map((option)=>{
        return  <Link className='p-5 hover:shadow-lg text-dark 'key={option.name} to={option.path}>{option.name}</Link>
          })

 )
}


export default Options