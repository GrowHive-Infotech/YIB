import React from 'react';
import './Template3.css';

const Template3 = ({ resumeData }) => {
  const { personalInfo, education, workExperience, skills, projects, activities } = resumeData;

  return (
    <div className="resume-template template3">
      <div className="resume-header">
        <div className="name-title">
          <h1>{personalInfo.firstName} <span className="last-name">{personalInfo.lastName}</span></h1>
          {personalInfo.summary && <p className="professional-title">{personalInfo.summary.split('.')[0]}</p>}
        </div>
        
        <div className="contact-info">
          {personalInfo.email && <div className="contact-item">{personalInfo.email}</div>}
          {personalInfo.phone && <div className="contact-item">{personalInfo.phone}</div>}
          {personalInfo.address && <div className="contact-item">{personalInfo.address}</div>}
          {(personalInfo.linkedin || personalInfo.github) && (
            <div className="social-links">
              {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
              {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
            </div>
          )}
        </div>
      </div>
      
      <div className="resume-body">
        {workExperience.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">
              <span>WORK EXPERIENCE</span>
            </h2>
            <div className="section-content">
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
          </section>
        )}
        
        {education.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">
              <span>EDUCATION</span>
            </h2>
            <div className="section-content">
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
          </section>
        )}
        
        <div className="two-column-section">
          {skills.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">
                <span>SKILLS</span>
              </h2>
              <div className="section-content">
                <div className="skills-container">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-bar">
                        <div className="skill-progress"></div>
                      </div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          
          {projects.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">
                <span>PROJECTS</span>
              </h2>
              <div className="section-content">
                {projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <h3>{project.name}</h3>
                    {project.technologies && (
                      <p className="technologies">{project.technologies}</p>
                    )}
                    {project.description && <p>{project.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {activities.length > 0 && activities.some(a => a.name) && (
          <section className="resume-section">
            <h2 className="section-title">
              <span>ACTIVITIES</span>
            </h2>
            <div className="section-content">
              {activities.filter(a => a.name).map((activity, index) => (
                <div key={index} className="activity-item">
                  <h3>{activity.name}</h3>
                  {activity.position && <p className="position">{activity.position}</p>}
                  {activity.description && <p>{activity.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Template3;