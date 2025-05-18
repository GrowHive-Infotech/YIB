import { createSlice } from "@reduxjs/toolkit";
import {fetchJobs} from "../utils/Fetch";
import { host } from "../constants";



const loadJobs = async () => {
    const jobs = await fetchJobs();
    console.log(jobs); 
    localStorage.setItem('jobs',JSON.stringify(jobs));
    let loadingStatusFromLS=Number.parseInt(localStorage.getItem('loadingStatus'));
loadingStatusFromLS++;
localStorage.setItem('loadingStatus',JSON.parse(loadingStatusFromLS));
      console.log("jons");
};
await loadJobs();

const jobsFromLocalStorage=getParsedLocalStorageItem('jobs');
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
function getParsedLocalStorageItem(key) {
  const item = localStorage.getItem(key);
  if (item === null || item === 'undefined') {
    return null;
  }
  try {
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error parsing localStorage key "${key}":`, e);
    return null;
  }
}



export default jobsSlice.reducer;


