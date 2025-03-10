import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./jobBoard.css";

const JobBoard = () => {
    const [resume, setResume] = useState<File | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const [experience, setExperience] = useState<number>(0);
    const [techStack, setTechStack] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [searchByResume, setSearchByResume] = useState<boolean>(true);
    const [showSearchJobsButton, setShowSearchJobsButton] = useState<boolean>(false);
    const [jobMatches, setJobMatches] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const jobsPerPage = 10;

    const email = "shivanilodhi74@gmail.com";
    const allowedLocations = ["New York", "San Francisco", "Austin"];

    const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];

            if (selectedFile.type !== "application/pdf") {
                toast.error("Only PDF files are allowed.");
                return;
            }

            setResume(selectedFile);
        }
    };

    const handleSubmit = async () => {
        if (searchByResume && !resume) {
            toast.error("Please select a resume to upload.");
            return;
        }

        if (!searchByResume && (!techStack || experience <= 0 || !location)) {
            toast.error("Please fill all filter fields.");
            return;
        }

        if (searchByResume) {
            const formData = new FormData();
            formData.append("Resume", resume);
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
                    toast.success("Resume uploaded successfully!");
                } else {
                    throw new Error("No URL returned from the server.");
                }
            } catch (error) {
                console.error("Upload failed:", error);
                toast.error("Resume upload failed. Please try again.");
            }
        } else {
            searchJobs();
        }
    };

    const searchJobs = async () => {
        try {
            const queryParams = searchByResume ? `email=${email}` : `techStack=${techStack}&experience=${experience}&location=${location}`;
            const response = await fetch(`https://localhost:7287/api/resume/match-jobs?${queryParams}`);

            if (!response.ok) {
                throw new Error(`Job search failed: ${response.status}`);
            }

            const data = await response.json();
            setJobMatches(data.matched_jobs.sort((a, b) => b.skill_match - a.skill_match || b.job_desc_match - a.job_desc_match));
        } catch (error) {
            console.error("Job search failed:", error);
            toast.error("Job search failed. Please try again.");
        }
    };

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobMatches.slice(indexOfFirstJob, indexOfLastJob);

    return (
        <div className="job-board-container">
            <ToastContainer />
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
                    {resumeUrl && <p>Resume Uploaded: <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>}
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

            {showSearchJobsButton && <button onClick={searchJobs} className="search-jobs-button">Search Jobs</button>}

            {jobMatches.length > 0 && (
                <div className="job-results">
                    <h2>Matched Jobs</h2>
                    <div className="job-cards">
                        {currentJobs.map((job, index) => (
                            <div className="job-card" key={index}>
                                <h3>{job.job_title} at {job.company_name}</h3>
                                <p>Skill Match: {job.skill_match}% | Job Desc Match: {job.job_desc_match}%</p>
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>Previous</button>
                        <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={indexOfLastJob >= jobMatches.length}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobBoard;