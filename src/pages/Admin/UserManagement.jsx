import React, { useEffect, useState } from "react";

import { blockUserApi, getusersApi } from "../../apis/admin";
import confirmToast from "../../utils/confirmToast";
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [blockStatus, setBlockStatus] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, [blockStatus]);
console.log('sdfs');
  const fetchUsers = async () => {
    const { data } = await  getusersApi()
    setUsers(data.users);
  };

  const blockUblockUser = async (id) => {
    const { data } = await blockUserApi(id)
    data?.updated && setBlockStatus(!blockStatus);
  };

  return (
    <div className="w-full">
      <div className="mx-10 mt-5">
        <span className="text-2xl">User Management</span>
      </div>
      <div className=" w-3/4 mt-20 mx-10 overflow-x-auto">
        <div className="mx-1 my-5">
        
          {/* <input
            type="text"
            id="table-search"
            className="block p-2 pl-4 outline-none focus:outline-gray-300 text-sm text-gray-900  border-gray-300 rounded-lg w-60 bg-gray-50 "
            placeholder="Search user"
          /> */}
        </div>
        <table className="w-full  text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="text-lg md:px-4 py-3">
                USER
              </th>
              <th scope="col" className="text-lg md:px-4 py-3">
                CONTACT
              </th>
              <th scope="col" className="text-lg md:px-4 py-3">
                BOOKINGS
              </th>
              <th scope="col" className="text-lg md:px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr
                  className="bg-white border-b  hover:bg-gray-100"
                  key={user._id}
                >
                  <th
                    scope="row"
                    className="md:px-4 py-4 text-md font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.name}
                  </th>
                  <td className="md:px-4 py-4">{user.mobile}</td>
                  <td className="md:px-4 py-4">{user.booking.length}</td>
                  <td className="md:px-4 py-4">
                    <button
                      className={`${
                        user.isBlocked ? "bg-green-400" : "bg-red-500"
                      } rounded-lg text-white px-3 py-1`}
                      onClick={() => confirmToast(()=> blockUblockUser(user._id))}
                    >
                      {user.isBlocked ? "unblock" : "block"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav
          className="flex items-center justify-start my-4"
          aria-label="Table navigation"
        >
          {/* <ul className="inline-flex items-center -space-x-px">
            <li>
              <button className="block px-2 py-1 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                <span className="sr-only">Previous</span>
                <svg className="w-5 h-5"  aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" ></path>
                </svg>
              </button>
            </li>
            <li>
              <button className="px-2 py-1 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                1
              </button>
            </li>
            <li>
              <button className="px-2 py-1 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                2
              </button>
            </li>

            <li>
              <button className="block px-2 py-1 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul> */}
        </nav>
      </div>
    </div>
  );
}

export default UserManagement;
