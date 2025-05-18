import { createSlice } from "@reduxjs/toolkit";
import {fetchBlogs} from "../utils/Fetch";

// console.log("loading status from ")


const loadBlogs = async () => {
    const blogs = await fetchBlogs();
    console.log(blogs); 
    localStorage.setItem('blogs',JSON.stringify(blogs));
    let uniqueTechnologies=[]
    uniqueTechnologies = [
        ...new Set(blogs?.map(blog => blog?.technology))
      ];
      
      localStorage.setItem('topics',JSON.stringify(uniqueTechnologies));
      
let loadingStatusFromLS=Number.parseInt(localStorage.getItem('loadingStatus'));
loadingStatusFromLS++;
localStorage.setItem('loadingStatus',JSON.parse(loadingStatusFromLS));
      console.log("blogs");
};
await loadBlogs();


const blogsFromLocalStorage=getParsedLocalStorageItem('blogs');
const topicsFromLocalStorage=getParsedLocalStorageItem('blogs');


export const blogsSlice=createSlice({
    name:'blogs',
    initialState:{
        blogs:blogsFromLocalStorage,
        topics:topicsFromLocalStorage    },
    reducers:{
        
    }
})


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


// export const {login,signup,logout} =authSlice.actions;

export default blogsSlice.reducer;


