import { createSlice } from "@reduxjs/toolkit";

const expertSlice= createSlice({
    name:'expert',
    initialState:{},
    reducers:{
        addExpert(state,action){
            state.value=action.payload
        },
        updateExpert(state,action){
            state.value.name=action.payload
        },
       
        removeExpert(){
            return {}
        }
    }
    
})
export const {addExpert,removeExpert,updateExpert}= expertSlice.actions
export const expertReducer=expertSlice.reducer 