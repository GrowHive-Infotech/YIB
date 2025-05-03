import axios from "axios";
import {host} from "../constants";
export const fetchBlogs = async () => {
    try {
        const response = await axios.get(`${host}/api/posts/GetAllPosts`);
const data = response.data;
return data;
        
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
};


export const fetchJobs = async () => {
    try {
        const response = await axios.get(`${host}/api/jobs`);
const data = response.data;
return data;
        
    } catch (error) {
        console.error('Error fetching Jobs:', error);
    }
};


