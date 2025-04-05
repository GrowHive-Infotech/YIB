import React, { useState, useEffect } from "react";
import "./tech.css";
import axios from 'axios';
import BlogPost from "./BlogPost";
import { useParams } from "react-router-dom";
import InterviewPosts from "./InterviewPost";

const TechnologyDetails = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [selected, setSelected] = useState([]);
    const { techName, view } = useParams();
    const [iq, setIq] = useState([]);
    const [filteredIq, setFilteredIq] = useState([]);
    const [selectedIq, setSelectedIq] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://localhost:7287/api/posts/GetAllPosts');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        const fetchIQ = async () => {
            try {
                const response = await axios.get('https://localhost:7287/api/posts/GetAllIQ');
                setIq(response.data);
            } catch (error) {
                console.error('Error fetching interview questions:', error);
            }
        };

        fetchBlogs();
        fetchIQ();
    }, []);

    useEffect(() => {
        setFilteredBlogs(blogs.filter(blog => blog.technology === techName));
        setFilteredIq(iq.filter(item => item.technology_type === techName));
    }, [blogs, iq, techName]);

    useEffect(() => {
        if (filteredBlogs.length > 0) {
            setSelected([filteredBlogs[0]]);
        } else {
            setSelected([]);
        }

        if (filteredIq.length > 0) {
            setSelectedIq([filteredIq[0]]);
        } else {
            setSelectedIq([]);
        }
    }, [filteredBlogs, filteredIq]);

    const selectBlog = (id) => {
        const newSelection = filteredBlogs.filter(blog => blog.id === id);
        setSelected(prevSelected =>
            JSON.stringify(prevSelected) === JSON.stringify(newSelection) ? prevSelected : newSelection
        );
    };

    const selectIq = (id) => {
        const newSelection = filteredIq.filter(iq => iq.id === id);
        setSelectedIq(prevSelected =>
            JSON.stringify(prevSelected) === JSON.stringify(newSelection) ? prevSelected : newSelection
        );
    };

    return (
        <div className="technology-details-container">
            <div className="sidebar">
                <ul>
                    {view === "blogs"
                        ? filteredBlogs.map((topic) => (
                            <li key={topic.id} onClick={() => selectBlog(topic.id)}>
                                {topic.title}
                            </li>
                        ))
                        : filteredIq.map((question) => (
                            <li key={question.id} onClick={() => selectIq(question.id)}>
                                {question.question}
                            </li>
                        ))}
                </ul>
            </div>

            <div className="main-content">
                {view === "blogs" ? (
                    selected.length > 0 ? (
                        selected.map((blog) => (
                            <div key={blog.id} className="blog-post">
                                <h2>{blog.title}</h2>
                                <p>Content for {blog.technology} will be displayed here.</p>
                                <BlogPost fileName={blog.description} />
                            </div>
                        ))
                    ) : (
                        <p>No blogs found for the selected technology.</p>
                    )
                ) : (
                    selectedIq.length > 0 ? (
                        selectedIq.map((question) => (
                            <div key={question.id} className="interview-question">
                                <h2>{question.question}</h2>
                                <p><strong>Answer:</strong></p>
                                <InterviewPosts fileName={question.answer} />
                                <p><strong>Technology:</strong> {question.technology_type}</p>
                                <p><strong>Difficulty Level:</strong> {question.difficultyLevel}</p>
                            </div>
                        ))
                    ) : (
                        <p>No interview questions found for the selected technology.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default TechnologyDetails;
