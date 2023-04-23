import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { fetchCount } from "../../../apis/admin";
function PIeChart({ type }) {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    fetchCount().then(({data})=>{
      if(data.success && data.result){
        setDetails(data.result)
      }
    })
  }, []);

  const whichDetail= type==='service' ? details?.serviceDetails : details?.bookingDetails
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    labels: whichDetail?.map((data)=>{
      return data._id || data.service
    }),
    datasets: [
      {
        data: whichDetail?.map((data)=>{
          return data.count || data.bookings
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}

export default PIeChart;
