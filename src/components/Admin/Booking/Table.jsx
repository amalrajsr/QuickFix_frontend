import React, { useEffect, useState } from "react";
import {
  assignExpertApi,
  changeExpertApi,
  fetchBookingApi,
  fetchExpertApi,
} from "../../../apis/admin";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import fireToast from "../../../utils/fireToast";
function Table({ bookingStatus }) {
  const [pending, setPending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState(null);
  const [fetchBooking, setFetchBooking] = useState(false);
  const [expert, setExpert] = useState(""); // state to handle expert
  const [experts, setExperts] = useState([]); // state to store experts
  const navigate = useNavigate();



  useEffect(() => {
    fetchExpertApi().then(({ data }) => {
      if (data.result) {
        setExperts(data.result)
      }
    });
  }, []);

  useEffect(() => {
    fetchBookingApi()
      .then(({ data }) => {
        setPending(false)
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
          setFetchBooking(!fetchBooking);
          fireToast("success", "updated successfully");
        }
      } catch (error) {
        fireToast("error", error.response?.data?.error.message);

        setLoading(false);
      }
    }
  };

  const changeExpert = async (e, bookingId, oldExpert) => {
    try {
      setLoading(true);
      const { data } = await changeExpertApi(bookingId, {
        newExpert: e.target.value,
        oldExpert,
      });

      setLoading(false);
      if (data.success) {
        setFetchBooking(!fetchBooking);
        fireToast("success", "updated successfully");
      }
    } catch (error) {
      fireToast("error", error.response?.data?.error.message);

      setLoading(false);
    }
  };


  const columns = [
    ["active", "completed"].includes(bookingStatus) && {
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
      grow: 3,
    },
    {
      name: "Estimated Charge",
      selector: (row) => <span>₹ {row.estimatedCharge}</span>,
      grow: 4,
    },
    (bookingStatus === "pending" || bookingStatus === "active") && {
      name: bookingStatus === "pending" ? "Assign Expert" : "Change Expert",
      grow: 4,

      cell: (row) => (
        <select
          className="border-[1px] py-1 rounded-md  border-slate-300 focus:outline-slate-400 w-[200px]"
          name="expert"
          id="expert"
          value={expert}
          onChange={(e) =>
            bookingStatus === "active"
              ? changeExpert(e, row._id, row.expert[0]?._id)
              : setExpert(e.target.value)
          }
        >
          <option value="">
            {bookingStatus === "active"
              ? row.expert[0]?.name
              : "Select an expert"}
          </option>
          {experts?.map((expert) => {
            return (
              !expert?.isBlocked && expert.name !== row.expert[0]?.name &&
              expert.serviceDetails[0].service === row.service &&
              expert.city[0].pincode === row.address?.zipcode &&
              expert?.works?.every(
                (work) => new Date(work.date).getTime() !== new Date(row.date).getTime() // checking avalilable worker
              ) && (
                <option key={expert?._id} id={expert?._id} value={expert?._id}>
                  {expert?.name}
                </option>
              )
            );
          })}
        </select>
      ),
    },

    ["active", "completed"].includes(bookingStatus) && {
      name: "Total Charge",
      selector: (row) => <span>₹ {row?.totalCharge}</span>,
      grow: 3,
    },
    bookingStatus === "active" && {
      name: "Payment",
      selector: (row) => <span>{row.payment ? "completed" : "pending"}</span>,
      grow: 2,
    },
     bookingStatus==='pending' &&{
      name: null,
      cell: (row) => (
        <button
          disabled={loading}
          onClick={() => assignExpert(row._id)}
          className={`bg-dark hover:bg-gray-700 z-20 rounded-lg text-white px-3 py-1`}
        >
          {loading ? <ClipLoader /> : "Approve"}
        </button>
      ),
      grow: 3,
    },
    
  ];


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
  const data = bookings?.filter((booking) => {
    return (
      booking?.status === bookingStatus && {
        service: booking.service,
        date: booking.date,
        slot: booking.slot,
        type: booking.type,
        estimatedCharge: booking.estimatedCharge,
        userName: booking?.user[0]?.name,
        expertName: booking?.expert[0]?.name,
        _id: booking._id,
        totalCharge: booking?.totalCharge,
        payment: booking?.payment,
        status: booking.status,
      }
    );
  });
  return (
    <DataTable
      className="min-w-[900px]"
      columns={columns}
      data={data}
      progressPending={pending}
      progressComponent={<BeatLoader />}
      fixedHeader
      fixedHeaderScrollHeight="450px"
      customStyles={customStyles}
      pagination
     
    />
  );
}

export default Table;
