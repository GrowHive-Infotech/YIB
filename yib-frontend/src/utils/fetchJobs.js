
const fetchJobs = async () => {
    try {
        const response = await axios.get(`${host}/api/posts/GetAllPosts`);
const data = response.data;
return data;
        
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
};