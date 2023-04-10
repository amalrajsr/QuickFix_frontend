import { createSlice } from "@reduxjs/toolkit";

const locationSlice= createSlice({
    name:'locations',
    initialState:{},
    reducers:{
        addlocations:(state,action)=>{
            state.value=action.payload
        },
        removeLocations:(state,action)=>{
            return {}
        }
    }
})

export const {addlocations}= locationSlice.actions
export const locationReducer= locationSlice.reducer