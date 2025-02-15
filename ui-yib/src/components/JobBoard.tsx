import React, { useState, useEffect } from "react";
import "./jobBoard.css";

const JobBoard = () => {
    const [resume, setResume] = useState<File | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const [experience, setExperience] = useState(0);
    const [techStack, setTechStack] = useState("");
    const [location, setLocation] = useState("");
    const [results, setResults] = useState([]);
    const [searchByResume, setSearchByResume] = useState(true);
    const userId = "550e8400-e29b-41d4-a716-446655440000"; // Replace with actual user ID

    //useEffect(() => {
    //    // Fetch user's resume if available
    //    fetch(`http://localhost:5000/api/resume/${userId}`)
    //        .then(response => response.json())
    //        .then(data => {
    //            if (data.resumeUrl) setResumeUrl(data.resumeUrl);
    //        })
    //        .catch(() => setResumeUrl(null));
    //}, []);

    const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];

            // Ensure it's a PDF
            if (selectedFile.type !== "application/pdf") {
                alert("Only PDF files are allowed.");
                return;
            }

            setResume(selectedFile);

            const formData = new FormData();
            formData.append("file", selectedFile); // Ensure this matches your backend field name
            formData.append("userId", userId);

            try {
                const response = await fetch("http://localhost:7287/api/resume/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Upload failed: ${response.status}`);
                }

                const data = await response.json();
                if (data.url) {
                    setResumeUrl(data.url);
                    alert("Resume uploaded successfully!");
                } else {
                    throw new Error("No URL returned from the server.");
                }
            } catch (error) {
                console.error("Upload failed:", error);
                alert("Resume upload failed. Please try again.");
            }
        }
    };


    const handleSearch = () => {
        // Mock search results based on criteria
        const mockResults = [
            { id: 1, title: "Frontend Developer", company: "TechCorp", location: "New York" },
            { id: 2, title: "Backend Engineer", company: "CodeBase", location: "San Francisco" },
            { id: 3, title: "Full Stack Developer", company: "InnovateX", location: "Remote" }
        ];
        setResults(mockResults);
    };

    return (
        <div className="job-board-container">
            <h1>Job Board</h1>

            {/* Search Mode Toggle */}
            <div className="toggle-switch">
                <span>Search by Resume</span>
                <label className="switch">
                    <input type="checkbox" checked={searchByResume} onChange={() => setSearchByResume(!searchByResume)} />
                    <span className="slider round"></span>
                </label>
                <span>Search by Filters</span>
            </div>

            {/* Resume Upload & Display */}
            <div className="resume-section">
                <label htmlFor="resume-upload">Upload Resume:</label>
                <input type="file" id="resume-upload" accept="application/pdf" onChange={handleResumeUpload} />
                {resumeUrl ? (
                    <p>Resume Uploaded: <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                ) : (
                    <p>No Resume Found</p>
                )}
            </div>

            {/* Search Filters (Only Show if NOT Searching by Resume) */}
            {!searchByResume && (
                <div className="filters">
                    <label>
                        Years of Experience:
                        <input type="number" value={experience} onChange={(e) => setExperience(Number(e.target.value))} />
                    </label>

                    <label>
                        Tech Stack:
                        <input type="text" value={techStack} onChange={(e) => setTechStack(e.target.value)} />
                    </label>

                    <label>
                        Job Location:
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </label>
                </div>
            )}

            {/* Search Button */}
            <button onClick={handleSearch} className="search-button">Search</button>

            {/* Job Results */}
            <div className="results-section">
                {results.length > 0 ? (
                    <div className="results-grid">
                        {results.map((job) => (
                            <div key={job.id} className="job-card">
                                <h3>{job.title}</h3>
                                <p>{job.company}</p>
                                <p>{job.location}</p>
                                <button className="apply-button">Apply</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No results found. Please search to see jobs.</p>
                )}
            </div>
        </div>
    );
};

export default JobBoard;
