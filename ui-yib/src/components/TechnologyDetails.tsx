import React, { useState, useEffect, useMemo } from "react";
import "./tech.css";
import axios from 'axios';
import BlogPost from "./BlogPost";
import { useParams } from "react-router-dom";

const TechnologyDetails = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [selected, Setselected] = useState<Blog[]>([]);
    const { techName } = useParams();

    interface Blog {
        id: string;
        title: string;
        description: string;
        author: string;
        createday: string;
        updateday: string;
        lastUpdatedBy: string | null;
        likes: number;
        tags: string[];
        technology: string;
    }
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://localhost:7287/api/posts/GetAllPosts');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        setFilteredBlogs(blogs.filter(blog => blog.technology === techName));
    }, [blogs, techName]);


    useEffect(() => {
        console.log("Updated blogs:", blogs,techName);
    }, [blogs]);

    useEffect(() => {
        if (filteredBlogs.length > 0) {
            Setselected([filteredBlogs[0]]);
        } else {
            Setselected([]);
        }
    }, [filteredBlogs]);

    const selectblog = (Id: string) => {
        Setselected(prevSelected => {
            const newSelection = filteredBlogs.filter(x => x.id === Id);
            return JSON.stringify(prevSelected) === JSON.stringify(newSelection) ? prevSelected : newSelection;
        });
    };

    return (
        <div className="technology-details-container">
            <div className="sidebar">
                <ul>
                    {filteredBlogs.map((topic) => (
                        <li key={topic.id} onClick={() => selectblog(topic.id)}>{topic.title}</li>
                    ))}
                </ul>
            </div>
            <div className="main-content">
                {selected.length > 0 ? (
                    selected.map((blog) => (
                        <div key={blog.id} className="blog-post">
                            <h2>{blog.title}</h2>
                            <p>Content for {blog.technology} will be displayed here.</p>
                            <BlogPost fileName={blog.description} />
                        </div>
                    ))
                ) : (
                    <p>No blogs found for the selected technology.</p>
                )}
            </div>
        </div>
    );
};

export default TechnologyDetails;
