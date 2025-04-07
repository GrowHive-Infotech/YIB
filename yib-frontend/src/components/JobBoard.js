import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./jobBoard.css";
import { useAuth } from "./AuthContext";
import {host} from "./constants";
const JobBoard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [resume, setResume] = useState(null);
    const [resumeUrl, setResumeUrl] = useState(null);
    const [experience, setExperience] = useState("");
    const [techStack, setTechStack] = useState("");
    const [location, setLocation] = useState("");
    const [searchByResume, setSearchByResume] = useState(true);
    const [showSearchJobsButton, setShowSearchJobsButton] = useState(false);
    const [jobMatches, setJobMatches] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showResumeConfirmation, setShowResumeConfirmation] = useState(false);
    const jobsPerPage = 10;

    const allowedLocations = ["Pune", "Indore", "Gurugram","Delhi","Chennai"];

    useEffect(() => {
        if (user?.fileUrl) {
            setResumeUrl(user.fileUrl);
        }
    }, [user]);

    const handleSearchTypeToggle = (newSearchByResume) => {
        if (newSearchByResume && user?.fileUrl) {
            setShowResumeConfirmation(true);
        } else {
            setSearchByResume(newSearchByResume);
        }
    };

    const handleResumeUpload = (event) => {
        if (!user) {
            toast.error("Please log in to upload a resume.");
            navigate("/login");
            return;
        }

        const selectedFile = event.target.files?.[0];

        if (selectedFile && selectedFile.type === "application/pdf") {
            setResume(selectedFile);
        } else {
            toast.error("Only PDF files are allowed.");
        }
    };

    const handleSubmit = async () => {
        if (searchByResume && !resume && !resumeUrl) {
            toast.error("Please select a resume to upload.");
            return;
        }

        if (!searchByResume && (!techStack || !experience || !location)) {
            toast.error("Please fill all filter fields.");
            return;
        }

        if (searchByResume) {
            if (!user) {
                toast.error("Please log in to upload a resume.");
                navigate("/login");
                return;
            }

            const formData = new FormData();
            formData.append("Resume", resume);
            formData.append("Email", user.email);
            formData.append("YOE", experience.toString());

            try {
                const response = await fetch(`${host}/api/resume/upload`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error(`Upload failed: ${response.status}`);

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
            const encodedParam = encodeURIComponent(techStack);
            let response = null;
            const queryParams = searchByResume
                ? `email=${user.email}`
                : `techStack=${encodedParam}&experience=${experience}&location=${location}`;

            const endpoint = searchByResume
                ? "match-jobs"
                : "match-nonresumejobs";

            response = await fetch(`${host}/api/resume/${endpoint}?${queryParams}`);

            if (!response.ok) throw new Error(`Job search failed: ${response.status}`);

            const data = await response.json();
            const sortedJobs = data.matched_jobs.sort(
                (a, b) => b.skill_match - a.skill_match || b.job_desc_match - a.job_desc_match
            );

            setJobMatches(sortedJobs);
        } catch (error) {
            console.error("Job search failed:", error);
            toast.error("Job search failed. Please try again.");
        }
    };

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobMatches.slice(indexOfFirstJob, indexOfLastJob);

    const handleApplyNow = (jobUrl) => {
        if (jobUrl && user) {
            window.open(jobUrl, "_blank");
        } else {
            toast.error("Please log in to apply for job.");
        }
    };

    return (
        <div className="job-board-container">
            <ToastContainer />
            <h1>Job Board</h1>

            <div className="toggle-container">
                <span>Search by Resume</span>
                <label className="minimal-switch">
                    <input
                        type="checkbox"
                        checked={searchByResume}
                        onChange={() => handleSearchTypeToggle(!searchByResume)}
                    />
                    <span className="slider"></span>
                </label>
                <span>Search by Filters</span>
            </div>

            {searchByResume ? (
                <div className="resume-section">
                    {resumeUrl && (
                        <div className="existing-resume-notice">
                            <p>You have an existing resume on file.</p>
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
                        </div>
                    )}
                    <label htmlFor="resume-upload">Upload Resume:</label>
                    <input
                        type="file"
                        id="resume-upload"
                        accept="application/pdf"
                        onChange={handleResumeUpload}
                        disabled={!user}
                    />
                    <input
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="Enter experience"
                    />
                    {!user && <p className="login-prompt">Please log in to upload a resume.</p>}
                </div>
            ) : (
                <div className="filters-section">
                    <label>Skills:</label>
                    <input
                        type="text"
                        value={techStack}
                        onChange={(e) => setTechStack(e.target.value)}
                        placeholder="Enter skills"
                    />

                    <label>Years of Experience:</label>
                    <input
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="Enter experience"
                    />

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

            {user?.fileUrl && (
                <button onClick={searchJobs} className="search-jobs-button">Search Jobs</button>
            )}

            {jobMatches.length > 0 && (
                <div className="job-results">
                    <h2>Matched Jobs</h2>
                    <div className="job-cards">
                        {currentJobs.map((job, index) => (
                            <div className="job-card" key={index}>
                                <h3>{job.job_title} at {job.company_name}</h3>
                                <p>Skill Match: {job.skill_match}% | Job Desc Match: {job.job_desc_match}%</p>
                                <button className="apply-button" onClick={() => handleApplyNow(job.job_url)}>
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>Previous</button>
                        <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={indexOfLastJob >= jobMatches.length}>Next</button>
                    </div>
                </div>
            )}

            {showResumeConfirmation && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Resume Found</h3>
                        <p>You already have a resume uploaded in our database. Would you like to use your existing resume?</p>
                        <div className="modal-buttons">
                            <button
                                onClick={() => {
                                    setSearchByResume(true);
                                    setShowResumeConfirmation(false);
                                    setShowSearchJobsButton(true);
                                }}
                                className="modal-confirm"
                            >
                                Yes, use existing resume
                            </button>
                            <button
                                onClick={() => {
                                    setSearchByResume(true);
                                    setShowResumeConfirmation(false);
                                }}
                                className="modal-cancel"
                            >
                                No, upload new resume
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobBoard;
