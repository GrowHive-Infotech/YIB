import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import authReducer from './authSlice'
import blogsSlice from "./blogsSlice";
import  jobsSlice  from "./jobsSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer, 
    auth:authReducer,
    jobs:jobsSlice,
    blogs:blogsSlice
  },
});
