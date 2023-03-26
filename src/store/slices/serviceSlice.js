import { createSlice } from "@reduxjs/toolkit";

const serviceSlice= createSlice({
    name:'services',
    initialState:{},
    reducers:{
        addSerivces:(state,action)=>{
            state.value=action.payload
        }
    }
})

export const {addSerivces}= serviceSlice.actions
export const serviceReducer= serviceSlice.reducer