import React, { useEffect, useState } from "react";
import { fetchAllConversationsApi } from "../../../apis/chat";
import ChatSection from "./ChatSection";

function Chat() {
  const [users, setUsers] = useState([]);
  const [user,setUser]=useState({userDetails:null,conversations:[]})
  const [reload,setReload]=useState(false)

  useEffect(() => {
    fetchAllConversationsApi().then(({ data }) => {

      if (data.success && data.result) {
        setUsers(data.result);
        if(user.userDetails){
        const currentUser=data.result.filter((data)=>{
          return data.user._id === user.userDetails._id
        })
        
        setUser({...user,userDetails:currentUser[0].user})
      }
      }
    }).catch((error)=>{
    
    })
  },[reload]);
 
  const handleConversation= (conversations,userDetails)=>{
  setUser({userDetails:userDetails,conversations:conversations})
  setReload(!reload)
  }

  return (
    <div className="container w-11/12 mx-auto">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
         

          <ul className="overflow-auto ">
            <h2 className=" mb-3 px-2 py-2 bg-gray-100 h-full text-lg text-gray-600">Chats</h2>

            <li>
              {users?.map((data) => {
              return  <span key={data?._id} onClick={()=>handleConversation(data?.conversation,data?.user)} className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={data?.user?.avatar || 'https://res.cloudinary.com/dsw9tifez/image/upload/v1680511516/quickfix/static/profile_eil3c6.jpg'}
                    alt="username"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-gray-600">
                       {data?.user?.name}
                      </span>
                      <span className="block ml-2 text-sm text-gray-600">
                     
                      </span>
                    </div>
                    {/* <span className="block ml-2 text-sm text-gray-600">bye</span> */}
                  </div>
                </span>;
              })}
            </li>
          </ul>
        </div>
        <ChatSection reload={reload} setReload={setReload} user={user?.userDetails} conversations={user?.conversations} />
        {/* chat section ends */}
      </div>
    </div>
  );
}

export default Chat;
