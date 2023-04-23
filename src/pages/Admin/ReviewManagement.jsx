import React, { useState } from "react";
import Review from "../../components/Admin/Review";

function ReviewManagement() {
    const [fetchReviews,setfetchReviews]=useState(false)
  return (
    <div className="w-full  mx-3">
      <div className="mx-10 mt-5">
        <span className="text-2xl">Review Management</span>
      </div>
      <div className=" w-3/4 mt-12 mx-10 overflow-x-auto"></div>
      <Review  fetchReviews={fetchReviews} setfetchReviews={setfetchReviews} />
    </div>
  );
}

export default ReviewManagement;
