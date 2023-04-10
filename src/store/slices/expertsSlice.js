import { createSlice } from "@reduxjs/toolkit";

const expertsSlice= createSlice({
    name:'experts',
    initialState:{},
    reducers:{
        addExperts:(state,action)=>{
            state.value=action.payload
        },
        removeExperts:(state,action)=>{
            return {}
        }
    }

})

export const {addExperts,removeExperts}= expertsSlice.actions
export const expertsReducer= expertsSlice.reducer