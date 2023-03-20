import { Link } from "react-router-dom"

function Options(){
    const profileOptions=[{name:'Address',path:'/address'},{name:'Bookings',path:'/booking'},{name:'Payment',path:'/payment'}]

 return( 
    
    profileOptions.map((option)=>{
        return  <Link className='p-5 hover:shadow-lg text-dark text-xl' to={option.path}>{option.name}</Link>
          })

 )
}


export default Options