import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null
    },
    reducers:{
        signup:(state,action)=>{
            console.log("sugnup slcie")
            state.user=action.payload;
            localStorage.setItem('currentUser',JSON.stringify(action.payload));
        },
        login:(state,action)=>{
            console.log("login sclie");
            state.user=action.payload;
            localStorage.setItem('currentUser',JSON.stringify(action.payload));
        },
        
        logout:(state,action)=>{
            console.log("logout from authslice")
            state.user=null;
            localStorage.setItem('currentUser',null);
        }
    }
})


export const {login,signup,logout} =authSlice.actions;

export default authSlice.reducer;


