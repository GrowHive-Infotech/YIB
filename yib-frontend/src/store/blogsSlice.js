import { createSlice } from "@reduxjs/toolkit";
import {fetchBlogs} from "../utils/Fetch";



const loadBlogs = async () => {
    const blogs = await fetchBlogs();
    console.log(blogs); 
    localStorage.setItem('blogs',JSON.stringify(blogs));
    const uniqueTechnologies = [
        ...new Set(blogs.map(blog => blog.technology))
      ];
      
      localStorage.setItem('topics',JSON.stringify(uniqueTechnologies));
};
await loadBlogs();

const blogsFromLocalStorage=JSON.parse(localStorage.getItem('blogs'));
const topicsFromLocalStorage=JSON.parse(localStorage.getItem('topics'));


export const blogsSlice=createSlice({
    name:'blogs',
    initialState:{
        blogs:blogsFromLocalStorage,
        topics:topicsFromLocalStorage    },
    reducers:{
        
    }
})


// export const {login,signup,logout} =authSlice.actions;

export default blogsSlice.reducer;


