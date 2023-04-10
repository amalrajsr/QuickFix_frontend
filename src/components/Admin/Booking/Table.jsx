import React, { useEffect, useState } from "react";
import { fetchBookingApi } from "../../../apis/admin";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

function Table({ bookingStatus }) {
  const [bookings, setBookings] = useState(null);
  const navigate = useNavigate();
  const experts = useSelector((state) => state.experts.value);

  useEffect(() => {
    fetchBookingApi()
      .then(({ data }) => {
        if (data.bookings) {
          setBookings(data.bookings);
        }
      })
      .catch((error) => {
        if (error.response?.data?.error?.tokenExpired) {
          localStorage.removeItem("admin");
          navigate("/admin/login");
        }
      });
  }, []);

  console.log(experts[0])
  const columns = [
    {
      name: "User",
      selector: (row) => row.user[0].name,
    },
    {
      name: "Service",
      selector: (row) => row.service,
      grow: 2,
    },
    {
      name: "Slot",
      selector: (row) => row.slot,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    bookingStatus === "pending" && {
      name: "Assign Expert",
      grow: 2,

      cell: (row) => (
        <select
          className="border-[1px] py-1 rounded-md  border-slate-300 focus:outline-slate-400 w-[200px]"
          name="cars"
          id="cars"
        >
          {experts?.map((expert) => {
            return (
         
                !expert?.isBlocked&&expert.status &&  expert.serviceDetails[0].service===row.service && (
                  <option key={expert?._id}  id={expert?._id}  value={expert?._id}>
                    {expert?.name}
                  </option>
                )
           
            
            );
          })}
        </select>
      ),
    },
    bookingStatus === "pending" && {
      name: null,
      cell: (row) => (
        <button
          className={`bg-dark hover:bg-gray-700 rounded-lg text-white px-3 py-1`}
        >
          Approve
        </button>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        fontSize: "15px",
        whiteSpace: "normal",
        wordWrap: "break-word",
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
    headRow: {
      style: {},
    },
  };
  const data = bookings?.filter((booking) => {
    return (
      booking?.status === bookingStatus && {
        id: booking._id,
        service: booking.service,
        date: booking.date.split("T")[0],
        slot: booking.slot,
        type: booking.type,
        userName: booking?.user[0]?.name,
      }
    );
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
