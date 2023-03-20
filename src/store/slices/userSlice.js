import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:'user',
    initialState:{},
    reducers:{
        addUser(state,action){
            state.value=action.payload
        },
        removeUser(){
            return {}
        }
    }
    
})
export const {addUser,removeUser}= userSlice.actions
export const userReducer=userSlice.reducer 