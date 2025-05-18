import React from 'react';
import './Template4.css';

const Template4 = ({ resumeData }) => {
  const { personalInfo, education, workExperience, skills, projects, activities } = resumeData;

  return (
    <div className="resume-template template4">
      <div className="left-column">
        <div className="profile-section">
          <h1>{personalInfo.firstName} <span className="last-name">{personalInfo.lastName}</span></h1>
          {personalInfo.summary && <p className="professional-title">{personalInfo.summary.split('.')[0]}</p>}
        </div>
        
        <div className="contact-section">
          <h2 className="section-title">CONTACT</h2>
          {personalInfo.email && <div className="contact-item">{personalInfo.email}</div>}
          {personalInfo.phone && <div className="contact-item">{personalInfo.phone}</div>}
          {personalInfo.address && <div className="contact-item">{personalInfo.address}</div>}
          {personalInfo.linkedin && <div className="contact-item">{personalInfo.linkedin}</div>}
          {personalInfo.github && <div className="contact-item">{personalInfo.github}</div>}
        </div>
        
        {skills.length > 0 && (
          <div className="skills-section">
            <h2 className="section-title">SKILLS</h2>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-name">{skill}</span>
                  <div className="skill-level">
                    <div className="skill-dot filled"></div>
                    <div className="skill-dot filled"></div>
                    <div className="skill-dot filled"></div>
                    <div className="skill-dot"></div>
                    <div className="skill-dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="right-column">
        {personalInfo.summary && (
          <div className="summary-section">
            <h2 className="section-title">PROFILE</h2>
            <p>{personalInfo.summary}</p>
          </div>
        )}
        
        {workExperience.length > 0 && (
          <div className="experience-section">
            <h2 className="section-title">EXPERIENCE</h2>
            {workExperience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h3>{exp.position}</h3>
                  <div className="experience-meta">
                    <span className="company">{exp.company}</span>
                    <span className="date">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                </div>
                {exp.description && (
                  <ul className="experience-description">
                    {exp.description.split('\n').filter(item => item.trim()).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        
        {education.length > 0 && (
          <div className="education-section">
            <h2 className="section-title">EDUCATION</h2>
            {education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.institution}</h3>
                <div className="education-meta">
                  <span>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                  <span className="date">{edu.startDate} - {edu.endDate}</span>
                </div>
                {edu.gpa && <div className="gpa">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}
        
        {projects.length > 0 && (
          <div className="projects-section">
            <h2 className="section-title">PROJECTS</h2>
            {projects.map((project, index) => (
              <div key={index} className="project-item">
                <h3>{project.name}</h3>
                {project.technologies && (
                  <p className="technologies"><strong>Technologies:</strong> {project.technologies}</p>
                )}
                {project.description && <p className="project-description">{project.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {activities.length > 0 && activities.some(a => a.name) && (
          <div className="activities-section">
            <h2 className="section-title">ACTIVITIES</h2>
            {activities.filter(a => a.name).map((activity, index) => (
              <div key={index} className="activity-item">
                <h3>{activity.name}</h3>
                {activity.position && <p className="position">{activity.position}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template4;