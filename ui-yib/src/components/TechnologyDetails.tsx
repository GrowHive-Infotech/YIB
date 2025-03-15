import React, { useState } from "react";
import "./tech.css";
import BlogPost from "./BlogPost";
const TechnologyDetails = ({ match } ) => {
    const  techName  = match;
    const topics = ["Introduction", "Basics", "Advanced Topics", "Best Practices"];

    return (
        <div className="technology-details-container">
            <div className="sidebar">
                <ul>
                    {topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                    ))}
                </ul>
            </div>
            <div className="main-content">
                <h2>{techName}</h2>
                <p>Content for {techName} will be displayed here.</p>
                <BlogPost fileName="blog3.html"/>
            </div>
        </div>
    );
};
export default TechnologyDetails;