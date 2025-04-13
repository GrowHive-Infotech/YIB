// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";
import LoginModal from "../components/LoginPage";

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    loginModal: false,
    signupModal: {
      status:false,
      value:''
    }
  },
  reducers: {
    toggleForm: (state, action) => {
        if(action.payload[0]==='login')
        {
          state.loginModal=action.payload[1]; 
        }
    else
    {
      state.signupModal.value = action.payload[0];
      state.signupModal.status = action.payload[1];
    }
    
    
    },
    
  },
});

export const { toggleForm } = modalSlice.actions;
export default modalSlice.reducer; // Ensure you're exporting the reducer
