import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:'user',
    initialState:{},
    reducers:{
        addUser(state,action){
            state.value=action.payload
        },
        updateUser(state,action){
            state.value.name=action.payload
        },
        updateImage(state,action){

            state.value.avatar=action.payload
        },
        removeUser(){
            return {}
        }
    }
    
})
export const {addUser,removeUser,updateImage,updateUser}= userSlice.actions
export const userReducer=userSlice.reducer 