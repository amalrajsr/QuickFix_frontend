import React, { useEffect, useState } from "react";
import { assignExpertApi, fetchBookingApi } from "../../../apis/admin";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
function Table({ bookingStatus }) {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState(null);
  const [fetchBooking,setFetchBooking]=useState(false)
  const [expert, setExpert] = useState(""); // state to handle expert
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
  }, [fetchBooking]);

  const assignExpert = async (bookingId) => {
    if (expert.length > 0) {
      setLoading(true);
      try {
        const { data } = await assignExpertApi(bookingId, expert);
        
        setLoading(false);
        if (data.success) {
          setFetchBooking(!fetchBooking)
          toast.success("updated successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  console.log(bookings);

  const columns = [
    bookingStatus === "active" && {
      name: "Expert",
      selector: (row) => row.expert[0]?.name,
    },
    {
      name: "User",
      selector: (row) => row.user[0].name,
    },
    {
      name: "Service",
      selector: (row) => row.service,
      grow: 3,
    },
    {
      name: "Slot",
      selector: (row) => row.slot,
      grow: 2,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      grow:2
    },
    {
      name: "Estimated Charge",
      selector: (row) => <span>₹ {row.estimatedCharge}</span> ,
      grow: 4,
    },

    bookingStatus === "pending" && {
      name: "Assign Expert",
      grow: 3,

      cell: (row) => (
        <select
          className="border-[1px] py-1 rounded-md  border-slate-300 focus:outline-slate-400 w-[200px]"
          name="expert"
          id="expert"
          value={expert}
          onChange={(e) => setExpert(e.target.value)}
        >
          <option value="">Select an expert</option>
          {experts?.map((expert) => {
            return (
              !expert?.isBlocked &&
              expert.serviceDetails[0].service === row.service && (
                <option key={expert?._id} id={expert?._id} value={expert?._id}>
                  {expert?.name}
                </option>
              )
            );
          })}
        </select>
      ),
    },
    
    bookingStatus === "active" && {
      name: "Total",
      selector: (row) => <span>₹ {row.totalCharge}</span> ,
      grow: 2,
    },
    bookingStatus==='active' &&{
      name: "Payment",
      selector: (row) => <span>{row.payment ?'completed':'pending'}</span>,
      grow: 2,
    },
    bookingStatus==='pending' &&
     {
      name: null,
      cell: (row) => (
        <button
          disabled={loading}
          onClick={() => assignExpert(row._id)}
          className={`bg-dark hover:bg-gray-700 rounded-lg text-white px-3 py-1`}
        >
          {loading ? <ClipLoader /> : "Approve"}
        </button>
      ),
      grow: 3,
    }

  ];
  const data = bookings?.filter((booking) => {
    return (
      booking?.status === bookingStatus && {
        service: booking.service,
        date: booking.date.split("T")[0],
        slot: booking.slot,
        type: booking.type,
        estimatedCharge: booking.estimatedCharge,
        userName: booking?.user[0]?.name,
        expertName: booking?.expert[0]?.name,
        _id: booking._id,
        totalCharge: booking?.totalCharge,
        payment: booking?.payment,
        status:booking.status
      }
    );
  });

  console.log(data)

  const customStyles = {
    width: "750px",
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

  return (
    <DataTable
      className="min-w-[900px]"
      columns={columns}
      data={data}
      fixedHeader
      fixedHeaderScrollHeight="450px"
      customStyles={customStyles}
    />
  );
}

export default Table;
