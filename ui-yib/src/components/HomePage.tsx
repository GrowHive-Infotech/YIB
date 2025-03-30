import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./HomePage.css";

const HomePage: React.FC = () => {
    const [blogs, setBlogs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [interviewQuestions, setInterviewQuestions] = useState([]);
    const Blogs = "blogs";
    const IQ = "Iq";
    useEffect(() => {
        // Fetch blogs
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://localhost:7287/api/posts/GetAllPosts'); // Replace with your API endpoint
                setBlogs(response.data.slice(0, 10)); // Limit to 10 items
                console.log(blogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        // Fetch jobs
        const fetchJobs = async () => {
            try {
                const response = await axios.get('https://localhost:7287/api/jobs'); // Replace with your API endpoint
                setJobs(response.data.slice(0, 10));
                console.log(jobs);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        // Fetch interview questions
        const fetchInterviewQuestions = async () => {
            try {
                const response = await axios.get('https://localhost:7287/api/posts/GetAllIQ'); // Replace with your API endpoint
                setInterviewQuestions(response.data.slice(0, 10));
                console.log(interviewQuestions);
            } catch (error) {
                console.error('Error fetching interview questions:', error);
            }
        };

        // Call all API functions
        fetchBlogs();
        fetchJobs();
        fetchInterviewQuestions();
    }, []);

    const handleApplyNow = (jobUrl: string) => {
        if (jobUrl) {
            window.open(jobUrl, '_blank'); // Opens in new tab
            // OR window.location.href = jobUrl; // Opens in current tab
        } else {
        }
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <div className="hero-section">
                <h1>Welcome to YourInterviewBuddy</h1>
                <p>Your one-stop solution for interview preparation, job hunting, and career growth.</p>
                <Link to={'/tech'}>
                    <button className="cta-button">Get Started</button>
                </Link>
            </div>

            {/* Top Blogs Section */}
            <div className="section">
                <h2>Top Blogs</h2>
                <div className="card-container">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="card">
                            <img src={blog.image} alt={blog.title} className="card-image" />
                            <div className="card-content">
                                <h3>{blog.title}</h3>
                                <p>{blog.excerpt}</p>
                                <Link to={`technology/${blog.technology}/${Blogs}`}>
                                    <button className="read-more">Read More</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Jobs Section */}
            <div className="section">
                <h2>Top Jobs Posted</h2>
                <div className="card-container">
                    {jobs.map((job) => (
                        <div key={job.id} className="card">
                            <div className="card-content">
                                <h3>{job.jobTitle}</h3>
                                <p>{job.company} - {job.location}</p>
                                <h4>Experience Required:{job.experienceRequired} years</h4>
                                <button className="apply-button" onClick={() => handleApplyNow(job.jobUrl)}>Apply Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Interview Questions Section */}
            <div className="section">
                <h2>Top Interview Questions</h2>
                <div className="card-container">
                    {interviewQuestions.map((question) => (
                        <div key={question.id} className="card">
                            <div className="card-content">
                                <h3>{question.question}</h3>
                                <p><strong>Category:</strong> {question.TechnologyId}</p>
                                <p><strong>Difficulty:</strong> {question.difficultyLevel}</p>
                                <Link to={`interview/${question.technology_type}/${IQ}`}>
                                    <button className="practice-button">Practice</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Carousel Section */}
            <div className="home_carousel">
                <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={5000}>
                    <div>
                        <img src="/images/update1.jpg" alt="Update 1" />
                        <p className="legend">Update 1: New Feature Released</p>
                    </div>
                    <div>
                        <img src="/images/update2.jpg" alt="Update 2" />
                        <p className="legend">Update 2: Blog Section Improved</p>
                    </div>
                    <div>
                        <img src="/images/update3.jpg" alt="Update 3" />
                        <p className="legend">Update 3: New Job Postings Available</p>
                    </div>
                </Carousel>
            </div>

            {/* Call-to-Action Section */}
            <div className="cta-section">
                <h2>Ready to Ace Your Interviews?</h2>
                <p>Join thousands of users who have successfully landed their dream jobs with YourInterviewBuddy.</p>
                <button className="cta-button">Sign Up Now</button>
            </div>
        </div>
    );
};

export default HomePage;