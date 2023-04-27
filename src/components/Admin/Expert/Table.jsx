import React, { useEffect, useState } from "react";
import { blockUnblockExpertApi, fetchExpertApi } from "../../../apis/admin";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { addExperts } from "../../../store/slices/expertsSlice";
import confirmToast from "../../../utils/confirmToast";
import fireToast from "../../../utils/fireToast";

function Table({fetchExperts}) {
  const navigate = useNavigate();
  const [experts, setExperts] = useState([]);
  const dispatch=useDispatch()
  useEffect(() => {
    getExperts();
  }, [fetchExperts]);

  const getExperts = () => {
    fetchExpertApi()
      .then(({ data }) => {
        setExperts(data.result);
        // dispatch(addExperts(data.result))
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.data?.error?.tokenExpired) {
          localStorage.removeItem("admin");
          navigate("/admin/login");
        }
      });
  };

  const blockExpert = async (id) => {
    try{
    const { data } = await blockUnblockExpertApi(id);

    if (data.success) {
      getExperts();
    }
  }catch(error){
    fireToast('error',error.response?.data?.error?.message)
  }
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", 
        fontSize: "15px",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        textColor: "gray",
        backgroundColor: "#F9FAFB",
      },
    },
    cells: {
      style: {},
    },
  };

  // data table cloumns
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      grow:2

    },
    {
      name: "email",
      selector: (row) => row.email,
      grow:4
    },
    {
      name: "mobile",
      selector: (row) => row.mobile,
      grow:2

    },
    {
      name: "service",
      selector: (row) => row.service,
      grow:3

    },
    {
      name: "city",
      selector: (row) => row.city,
      grow:2
     

    },
    {
      name: null,
      cell: (row) => (
        <button
          className={`${
            row.isBlocked ? "bg-green-400" : "bg-red-500"
          } rounded-lg text-white px-3 py-1`}
          onClick={() => confirmToast(()=>blockExpert(row.id))}
        >
          {row.isBlocked ? "unblock" : "block"}
        </button>
      ),
      grow:3,

    },

  ];
  const data = experts?.map((expert) => {
    return {
      expert: expert,
      id: expert?._id,
      name: expert?.name,
      email: expert?.email,
      mobile: expert?.mobile,
      service:expert?.serviceDetails[0].service,
      city:expert?.city[0].place,
      isBlocked: expert.isBlocked,
    };
  });
  return (
    <DataTable
      columns={columns}
      data={data}
      fixedHeader
      fixedHeaderScrollHeight="450px"
      customStyles={customStyles}
    />
  );
}

export default Table;
