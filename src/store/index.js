import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { userReducer } from "./slices/userSlice";
import { serviceReducer } from "./slices/serviceSlice";
import { locationReducer } from "./slices/locationSlice";
import { expertReducer } from "./slices/expertSlice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  user: userReducer,
  service: serviceReducer,
  location: locationReducer,
  expert: expertReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
