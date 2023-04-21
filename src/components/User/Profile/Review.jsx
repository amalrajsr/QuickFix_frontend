import React, { useState } from "react";
import Button from "../../UI/Button";
import { AiFillDelete } from "react-icons/ai";
import {
  addReviewApi,
  deleteReviewApi,
  updateReviewApi,
} from "../../../apis/user";
import fireToast from "../../../utils/fireToast";
import confirmToast from "../../../utils/confirmToast";
function Review({ booking, closeModal, reviewMessage, reviewId,fetchBooking,setFetchBooking }) {
  const [review, setReview] = useState({
    message: reviewMessage || "",
    error: false,
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const regexPattern = /^[^<>\{\}[\]#%&|\\^~=+]*$/;

    if (regexPattern.test(review.message)) {
      try {
        setLoading(true);
        const { data } = reviewId
          ? await updateReviewApi(reviewId, review.message)
          : await addReviewApi({
              user: booking.user,
              service: booking.service,
              review: review.message,
              booking: booking._id,
            });

        setLoading(false);
        if (data.success) {
          setFetchBooking(!fetchBooking)
          fireToast(
            "success",
            reviewId
              ? "Review updated successfully"
              : "Review added successfully"
          );
          closeModal(false);
        }
      } catch (error) {
        fireToast("error", error.response?.data?.error.message);
        closeModal(false);
      }
    } else {
      setReview({ ...review, error: true });
    }
  };

  const deleteReview = async () => {
    try {
      const { data } = await deleteReviewApi(reviewId);
      if (data.success) {
        fireToast("success",'review deleted successfully');
        setFetchBooking(!fetchBooking)

      }
    } catch (error) {
      fireToast("error", error.response?.data?.error.message);
    }
  };
  return (
    <>
      <form className="my-2" onSubmit={handleSubmit}>
        <textarea
          rows={5}
          value={review.message}
          onChange={(e) => setReview({ message: e.target.value, error: false })}
          className="bg-light border-[1px] w-full border-slate-300 rounded-md outline-none"
          name=""
          id=""
        ></textarea>
        {review.error && (
          <p className="text-red-500">Cannot contain special characters</p>
        )}

        <div className="flex mx-2">
          <Button
            loading={loading}
            customeStyle={"py-[3px] px-[6px]  my-2 block mx-auto"}
          >
            {reviewMessage ? "Update review" : " Add review"}
          </Button>
          {reviewMessage && (
            <p className="flex justify-end" onClick={()=>confirmToast(deleteReview) }>
              <AiFillDelete className="text-red-700 my-auto text-2xl " />
            </p>
          )}
        </div>
      </form>
    </>
  );
}

export default Review;
