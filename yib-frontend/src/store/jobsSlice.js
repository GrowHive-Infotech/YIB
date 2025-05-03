import { createSlice } from "@reduxjs/toolkit";
import {fetchJobs} from "../utils/Fetch";
import { host } from "../constants";



const loadJobs = async () => {
    const jobs = await fetchJobs();
    console.log(jobs); 
    localStorage.setItem('jobs',JSON.stringify(jobs));
};
await loadJobs();

const jobsFromLocalStorage=JSON.parse(localStorage.getItem('jobs'));
console.log("jobs frm ls : ",jobsFromLocalStorage)
export const jobsSlice=createSlice({
    name:'jobs',
    initialState:{
        jobs:jobsFromLocalStorage,
        skills:[]
    },
    reducers:{
        addSkills:(state,action)=>{
            // console.log("sugnup slcie")
            state.skills=action.payload;
            localStorage.setItem('skills',JSON.stringify(action.payload));
        },
        removeSkills:(state,action)=>{
            // console.log("login sclie");
            state.skills=null;
            localStorage.setItem('skills',JSON.stringify(null));
        },
    }
})

export const {addSkills,removeSkills} =jobsSlice.actions;



export default jobsSlice.reducer;


