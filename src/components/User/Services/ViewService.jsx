import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation,useNavigate,useParams   } from "react-router-dom";

function ViewService() {

  const {name}=useParams()
  const navigate=useNavigate()
  const services= useSelector((state)=>state.service)
  const service= services?.value.filter((data)=>{

    return data.service === name.toLocaleUpperCase()
  }) 
  useEffect(()=>{
    if(service.length<1){
      navigate('/')
     }
  })
 
  const howItWorks=[{message:'Place the Order',image:'https://housejoygroup.com/_nuxt/img/client-check.d836a01.svg'},{message:'Experts will be Assigned',image:'https://housejoygroup.com/_nuxt/img/clients-check.cb800a0.svg'},
  {message:'Our Expert will call you',image:'https://housejoygroup.com/_nuxt/img/expert-call.f7e1a7b.svg'},{message:'Our Experts at your place',image:'https://housejoygroup.com/_nuxt/img/expert-delivery.a249286.svg'},
  {message:'Complete the job',image:'https://housejoygroup.com/_nuxt/img/expert-support.3abc568.svg'}
]
  return (
    <>
    {/* banner section */}
         <div className="w-full mt-28 bg-lightpurple ">
      <div className=" containter  mt-10 flex flex-col md:flex-row md:justify-between mb-12 w-3/4 mx-auto">
        <div className="flex flex-col my-2 md:my-auto">
        <h1 className="text-center md:text-start md:mx-3 my-2 text-3xl text-dark font-bold">{service?.[0]?.service}</h1>
        <div className="flex justify-evenly mt-2">
        <div className=" bg-lightgreen w-[130px] sm:w-[180px] sm:h-[120px] mx-auto md:mx-3 flex flex-col justify-center  rounded-lg hover:shadow-xl">
          <h1 className="text-lg md:text-xl mx-auto text-center text-white ">Experts</h1>
          <h1 className="text-lg md:text-xl font-semibold mx-auto text-center text-white">50+</h1>

        </div>
        <div className=" bg-lightpink  w-[130px] sm:w-[180px] h-[80px] md:mx-3 sm:h-[120px] mx-auto  flex flex-col justify-center rounded-lg   hover:shadow-xl">
          <h1 className="text-lg md:text-xl mx-auto text-white">Jobs</h1>
          <h1 className="text-lg md:text-xl font-semibold mx-auto text-center text-white">50+</h1>
          </div>
        </div>
        </div>
        <div className="">
        <img src={service?.[0]?.largeImage} alt="" className=" w-[350px] mt-4 sm:mt-0 mx-auto sm:w-[450px] rounded-lg  h-3/4 md:h-[250px]" />
        </div>
      </div>
      </div>
   {/*  book now section */}
   <div className="  w-[250px] sm:w-[350px] md:w-1/3 h-[150px] flex md:flex-row flex-col justify-end shadow-xl mx-auto my-16">
     <button className="bg-slate-200 w-40 md:text-lg hover:bg-slate-300 hover:shadow-md mx-auto md:h-1/3 md:my-auto rounded-lg p-2 px-3">service charges</button>
     <button className="bg-dark rounded-lg md:text-lg hover:shadow-md  md:h-1/3 md:my-auto w-40 mx-auto hover:bg-gray-700 text-white p-2 my-6 ">book now</button>
   </div>

   {/* how it works section */}
   <div className="bg-lightpurple w-full mb-10">
      <h1 className="text-center text-2xl md:text-3xl font-semibold mt-4 my-3">How it works</h1>
      
        <div  className="container md:h-[250px]  grid sm:grid-cols-2 md:grid-cols-5 mx-auto">
        {howItWorks.map((data)=>{
          return(
          <div key={data.message} className=" m-auto">
          <img src={data.image} alt="place order" className="mx-auto" />
          <h1>{data.message}</h1>
        </div>)
          
        })
        }
        </div>
   </div>
    </>
  );
}

export default ViewService;
