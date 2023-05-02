import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: false,
  reducers: {
    updateBooking(state) {
      state.isBooleanValue = !state.isBooleanValue;
    },
  },
});

export const { updateBooking } = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;

