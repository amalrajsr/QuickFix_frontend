import React, { useEffect, useState } from "react";
import { deleteReviewApi, fetchReviewsApi } from "../../apis/admin";
import confirmToast from "../../utils/confirmToast";
import { AiFillDelete } from "react-icons/ai";
import fireToast from "../../utils/fireToast";
function Review({fetchReviews,setfetchReviews}) {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetchReviewsApi().then(({ data }) => {
      if (data.success && data.reviews) {
        setReviews(data.reviews);
      }
    });
  }, [fetchReviews]);

 

  const deleteReview =  (reviewId) => {
    
    deleteReviewApi(reviewId).then(({data})=>{
        if(data.success){
         fireToast('success','review deleted successfully')
         setfetchReviews(!fetchReviews)
        }
    }).catch((error)=>{
        fireToast('error',error.response?.data?.error.message)

    })
  };
  return (
    <table className="md:min-w-full overflow-x-scroll mt-10 text-sm text-left text-gray-500 ">
      <thead className="text-xs  text-gray-700 uppercase bg-gray-50  ">
        {["USER", "SERVICE", "DATE", "REVIEW"].map((heading) => {
          return (
            <th scope="col" className="text-lg px-4 md:px-2 py-3">
              {heading}
            </th>
          );
        })}

        <th scope="col" className="text-lg md:px-4 py-3"></th>
      </thead>
      <tbody>
        {reviews.map((review) => {
          return (
            <tr
              className="bg-white border-b  hover:bg-gray-100"
              key={review?._id}
            >
              <th
                scope="row"
                className="md:px-4 py-4 text-md font-medium text-gray-900 whitespace-nowrap"
              >
                {review?.user.name}
              </th>
              <td className="md:px-4 py-4">{review?.service.service}</td>
              <td className="md:px-4 py-4">{review?.date.split("T")[0]}</td>
              <td className="md:px-4 py-4">
                <p className="break-words">{review?.review}</p>
              </td>
              <td className="md:px-4 py-4">
                <AiFillDelete
                  onClick={() => confirmToast(() => deleteReview(review._id))}
                  className="text-red-700 text-xl"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Review;
