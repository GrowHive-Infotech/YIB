// import React, { useState, useEffect } from "react";
// import TechnologyDetails from "./TechnologyDetails";
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
// import "./tech.css";

// const TechnologiesPage = () => {
//     const [viewMode, setViewMode] = useState("blogs"); // 'blogs' or 'interviewQuestions'
//     const [technologies, setTechnologies] = useState<Technology[]>([]) // State to store fetched technologies
//     const [loading, setLoading] = useState(true); // State to handle loading state
//     const [error, setError] = useState(null); // State to handle errors

//      interface Technology {
//         id: string;         // UUID stored as a string
//         name: string;
//         count: number;      // Ensuring count is a number
//     }

//     // Fetch technologies from the backend API
//     useEffect(() => {
//         const fetchTechnologies = async () => {
//             try {
//                 const response = await fetch("https://localhost:7287/api/jobs/Technologies"); // Replace with your API endpoint
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch technologies");
//                 }
//                 const data = await response.json();
//                 // Extract only the 'name' field
//                 setTechnologies(data);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTechnologies();
//     }, []);

//     const toggleViewMode = () => {
//         setViewMode(viewMode === "blogs" ? "interviewQuestions" : "blogs");
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="technologies-container">
//             <div className="toggle-container">
//                 <label className="toggle-label">
//                     {viewMode === "blogs" ? "Blogs" : "Interview Questions"}
//                 </label>
//                 <div className="toggle-switch" onClick={toggleViewMode}>
//                     <div className={`slider ${viewMode}`}></div>
//                 </div>
//             </div>

//             <div className="content">
//                 <h1>Technologies</h1>
//                 <p>
//                     Explore our {viewMode === "blogs" ? "informative blogs" : "comprehensive interview questions"} on the following technologies:
//                 </p>
//                 <ul>
//                     {technologies.map((tech) => (
//                         <li key={tech.id}> 
//                             <Link to={`/${viewMode == "Blogs" ? "technology" : "interview"}/${tech.name}/${viewMode}`}>{tech.name}</Link>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default TechnologiesPage;