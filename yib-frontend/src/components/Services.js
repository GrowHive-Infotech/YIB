import React from "react";
import "./services.css";

const ServicesPage = () => {
    const services = [
        {
            title: "Interview Questions",
            description:
                "Explore a wide range of interview questions tailored for various technologies and experience levels to help you prepare effectively.",
            icon: "🎯",
        },
        {
            title: "Blogs",
            description:
                "Stay updated with the latest trends, insights, and tutorials across different technologies through our well-researched blogs.",
            icon: "📝",
        },
        {
            title: "Job Applications",
            description:
                "Find your dream job! Apply to various job postings and take a step forward in your career journey.",
            icon: "💼",
        },
    ];

    const upcomingServices = [
        {
            title: "Resume Maker",
            description:
                "Create a professional resume effortlessly using our user-friendly resume builder.",
            icon: "📄",
        },
        {
            title: "Salary Comparison Tool",
            description:
                "Compare salaries across industries and roles to make informed career decisions.",
            icon: "💰",
        },
        {
            title: "Skill Assessment Tests",
            description:
                "Evaluate your skills with our assessment tests and identify areas for improvement.",
            icon: "📊",
        },
    ];

    return (
        <div className="services-container">
            <h1>Our Services</h1>

            <div className="services-section">
                {services.map((service, index) => (
                    <div key={index} className="service-card">
                        <span className="service-icon">{service.icon}</span>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>

            <h2>Upcoming Services</h2>
            <div className="services-section">
                {upcomingServices.map((service, index) => (
                    <div key={index} className="service-card">
                        <span className="service-icon">{service.icon}</span>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;
