import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import authReducer from './authSlice'
import blogsSlice from "./blogsSlice";
import  jobsSlice  from "./jobsSlice";
import resumeSlice  from "./resumeSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer, 
    auth:authReducer,
    jobs:jobsSlice,
    blogs:blogsSlice,
    resume:resumeSlice
  },
});
