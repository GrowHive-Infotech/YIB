import React, {useState}from "react";
import "./jobBoard.css";

const JobBoard = () => {
    const [resume, setResume] = useState(null);
    const [experience, setExperience] = useState(0);
    const [techStack, setTechStack] = useState("");
    const [location, setLocation] = useState("");
    const [results, setResults] = useState([]);

    const handleResumeUpload = (event) => {
        setResume(event.target.files[0]);
    }

;

const handleSearch = () => {
    // Mock search results based on criteria 
    const mockResults = [
        { id: 1, title: "Frontend Developer", company: "TechCorp", location: "New York" },
        { id: 2, title: "Backend Engineer", company: "CodeBase", location: "San Francisco" },
        { id: 3, title: "Full Stack Developer", company: "InnovateX", location: "Remote" }];
        setResults(mockResults);
}

;

return (
    <div className="job-board-container">
        <h1>Job Board</h1>

        <div className="search-section">
            <div className="upload-resume">
                <label htmlFor="resume-upload">Upload Resume:</label>
                <input type="file" id="resume-upload" onChange={handleResumeUpload} />
            </div>

            <div className="filters">
                <label>
                    Years of Experience:
                    <input
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    />
                </label>

                <label>
                    Tech Stack:
                    <input
                        type="text"
                        value={techStack}
                        onChange={(e) => setTechStack(e.target.value)}
                    />
                </label>

                <label>
                    Job Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </label>
            </div>

            <button onClick={handleSearch} className="search-button">Search</button>
        </div>

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
}
;

export default JobBoard;
