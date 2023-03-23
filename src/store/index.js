import { configureStore,combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { userReducer } from "./slices/userSlice";

const persistConfig={
    key:'root',
    version:1,
    storage
}

const reducer= combineReducers({
    user:userReducer,
})

const persistedReducer= persistReducer(persistConfig,reducer)

const store=configureStore({
    reducer:persistedReducer
})


export default store
