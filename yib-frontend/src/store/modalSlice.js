// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";
import LoginModal from "../components/LoginPage";


const userFromLocalStorage=JSON.parse(localStorage.getItem('currentUser'));
export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    loginModal: userFromLocalStorage!=null?false:true,
    signupModal: {
      status:false,
      value:''
    },
    mobileMenu:false,
    logoutMenu:false,
  },
  reducers: {
    toggleForm: (state, action) => {
        if(action.payload[0]==='login')
        {
          state.loginModal=action.payload[1]; 
        }
        else if(action.payload[0]==='menu')
          {
            state.mobileMenu=action.payload[1]; 
          }
          else if(action.payload[0]==='menu2')
            {
              state.logoutMenu=action.payload[1]; 
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
