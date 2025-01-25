import React, { useState } from "react";
import TechnologyDetails from "./TechnologyDetails";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./tech.css";

const TechnologiesPage = () => {
    const [viewMode, setViewMode] = useState("blogs"); // 'blogs' or 'interviewQuestions'

    const toggleViewMode = () => {
        setViewMode(viewMode === "blogs" ? "interviewQuestions" : "blogs");
    };

    const technologies = [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "Java",
        "C++",
        "Machine Learning",
        "Data Structures and Algorithms",
        "SQL",
        "AWS",
        "Docker",
        "Kubernetes",
    ];

    return (
       
            <div className="technologies-container">
                <div className="toggle-container">
                    <label className="toggle-label">
                        {viewMode === "blogs" ? "Blogs" : "Interview Questions"}
                    </label>
                    <div className="toggle-slider" onClick={toggleViewMode}>
                        <div className={`slider-thumb ${viewMode}`}></div>
                    </div>
                </div>

                <div className="content">
                    <h1>Technologies</h1>
                    <p>
                        Explore our {viewMode === "blogs" ? "informative blogs" : "comprehensive interview questions"} on the following technologies:
                    </p>
                    <ul>
                        {technologies.map((tech) => (
                            <li key={tech}>
                                <Link to={`/technology/${tech}`}>{tech}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
      
    );
};

export default TechnologiesPage;