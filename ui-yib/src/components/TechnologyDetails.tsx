import React, { useState, useEffect, useMemo } from "react";
import "./tech.css";
import axios from 'axios';
import BlogPost from "./BlogPost";
import { useParams } from "react-router-dom";
import InterviewPosts from "./InterviewPost";

const TechnologyDetails = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [selected, Setselected] = useState<Blog[]>([]);
    const { techName,view } = useParams();
    console.log(useParams());
    const [iq, setiq] = useState<InterviewQuestion[]>([]);
    const [filterediq, setfilterediq] = useState<InterviewQuestion[]>([]);
    const [selectediq, Setselectediq] = useState<InterviewQuestion[]>([]);
     
     interface InterviewQuestion {
        id: string;  // UUID stored as string
        question: string;
        answer: string;
        technologyId: string;  // UUID stored as string
        difficultyLevel: string;
        createdAt: Date;
        technology_type: string;

    }


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

        const fetchIQ = async () => {
            try {
                const response = await axios.get('https://localhost:7287/api/posts/GetAllIQ');
                setiq(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
        fetchIQ();
    }, []);

    useEffect(() => {
        setFilteredBlogs(blogs.filter(blog => blog.technology === techName));
        setfilterediq(iq.filter(iq => iq.technology_type === techName))
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

        if (filterediq.length > 0) {
            Setselectediq([filterediq[0]]);
        } else {
            Setselectediq([]);
        }
    }, [filteredBlogs, filterediq]);

    const selectblog = (Id: string) => {
        Setselected(prevSelected => {
            const newSelection = filteredBlogs.filter(x => x.id === Id);
            return JSON.stringify(prevSelected) === JSON.stringify(newSelection) ? prevSelected : newSelection;
        });
    };

    const selectiq = (Id: string) => {
        Setselectediq(prevSelected => {
            const newSelection = filterediq.filter(x => x.id === Id);
            return JSON.stringify(prevSelected) === JSON.stringify(newSelection) ? prevSelected : newSelection;
        });
    };

    return (
        <div className="technology-details-container">
            <div className="sidebar">
                <ul>
                    {view === "blogs"
                        ? filteredBlogs.map((topic) => (
                            <li key={topic.id} onClick={() => selectblog(topic.id)}>
                                {topic.title}
                            </li>
                        ))
                        : filterediq.map((question) => (
                            <li key={question.id} onClick={() => selectiq(question.id)}>
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
                        selectediq.length > 0 ? (
                            selectediq.map((question) => (
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
