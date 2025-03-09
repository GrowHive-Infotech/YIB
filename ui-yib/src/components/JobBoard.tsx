import React, { useState, useEffect } from "react";
import "./jobBoard.css";

const JobBoard = () => {
    const [resume, setResume] = useState<File | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const [experience, setExperience] = useState(0);
    const [techStack, setTechStack] = useState("");
    const [location, setLocation] = useState("");
    const [searchByResume, setSearchByResume] = useState(true);
    const [showSearchJobsButton, setShowSearchJobsButton] = useState(false);
    const [jobMatches, setJobMatches] = useState<any[]>([]);

    const email = "shivanilodhi74@gmail.com"; // Replace with actual user email
    const allowedLocations = ["New York", "San Francisco", "Austin"];

    useEffect(() => {
        console.log("Resume state updated:", resume);
    }, [resume]);

    const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];

            if (selectedFile.type !== "application/pdf") {
                alert("Only PDF files are allowed.");
                return;
            }

            setResume(selectedFile);
        }
    };

    const handleSubmit = async () => {
        if (searchByResume && !resume) {
            alert("Please select a resume to upload.");
            return;
        }

        if (!searchByResume && (!techStack || experience <= 0 || !location)) {
            alert("Please fill all filter fields.");
            return;
        }

        if (searchByResume) {
            const formData = new FormData();
            formData.append("Resume", resume!);
            formData.append("Email", email);

            try {
                const response = await fetch("https://localhost:7287/api/resume/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Upload failed: ${response.status}`);
                }

                const data = await response.json();
                if (data.url) {
                    setResumeUrl(data.url);
                    setShowSearchJobsButton(true);
                    alert("Resume uploaded successfully!");
                } else {
                    throw new Error("No URL returned from the server.");
                }
            } catch (error) {
                console.error("Upload failed:", error);
                alert("Resume upload failed. Please try again.");
            }
        } else {
            console.log("Filters applied:", { techStack, experience, location });
            alert("Filters applied successfully!");
        }
    };

    const searchJobs = async () => {
        try {
            const response = await fetch(`https://localhost:7287/api/resume/match-jobs?email=${email}`);

            if (!response.ok) {
                throw new Error(`Job search failed: ${response.status}`);
            }

            const data = await response.json();
            setJobMatches(data.matched_jobs);
        } catch (error) {
            console.error("Job search failed:", error);
            alert("Job search failed. Please try again.");
        }
    };

    return (
        <div className="job-board-container">
            <h1>Job Board</h1>

            <div className="toggle-switch">
                <span>Search by Resume</span>
                <label className="switch">
                    <input type="checkbox" checked={searchByResume} onChange={() => setSearchByResume(!searchByResume)} />
                    <span className="slider round"></span>
                </label>
                <span>Search by Filters</span>
            </div>

            {searchByResume ? (
                <div className="resume-section">
                    <label htmlFor="resume-upload">Upload Resume:</label>
                    <input type="file" id="resume-upload" accept="application/pdf" onChange={handleResumeUpload} />
                    {resumeUrl ? (
                        <p>Resume Uploaded: <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                    ) : (
                        <p>No Resume Found</p>
                    )}
                </div>
            ) : (
                <div className="filters-section">
                    <label>Skills:</label>
                    <input type="text" value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="Enter skills" />

                    <label>Years of Experience:</label>
                    <input type="number" value={experience} onChange={(e) => setExperience(Number(e.target.value))} placeholder="Enter experience" />

                    <label>Preferred Location:</label>
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="">Select Location</option>
                        {allowedLocations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
            )}

            <button onClick={handleSubmit} className="submit-button">Submit</button>

            {showSearchJobsButton && (
                <button onClick={searchJobs} className="search-jobs-button">Search Jobs</button>
            )}

            {jobMatches.length > 0 && (
                <div className="job-results">
                    <h2>Matched Jobs</h2>
                    <ul>
                        {jobMatches.map((job, index) => (
                            <li key={index}>
                                <strong>{job.job_title}</strong> at {job.company}
                                <p>Skill Match: {job.skill_match}% | Job Desc Match: {job.job_desc_match}%</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default JobBoard;
