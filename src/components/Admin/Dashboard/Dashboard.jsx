import React from "react";

function Dashboard({total}) {
 
  return (
    <>
      <section className="text-gray-600  body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="flex flex-wrap justify-between w-11/12 -m-4 text-center">
            {[
              {
                heading: "Toal Revenue",
                value: total?.totalRevenue,
                background: "bg-[#76BBD0]",
              },
              {
                heading: "Toal Bookings",
                value: total?.totalCompletedBookings,
                background: "bg-[#9FA757]",
              },
              {
                heading: "Toal Users",
                value: total?.totalUsers,
                background: "bg-[#649484]",
              },
            ].map((data,i) => {
              return (
                <div key={data.heading} className="p-4 md:w-1/4 w-full">
                  <div
                    className={`border-2 hover:shadow-xl  ${data.background} border-gray-200 px-4 py-6 rounded-lg`}
                  >
                    <p className="leading-relaxed text-lg text-white">
                      {data.heading}
                    </p>
                    <p className="text-white"> {i===0 ?` ₹${data.value}`: data.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
