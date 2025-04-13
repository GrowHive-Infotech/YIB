import React from 'react';
import './Template1.css';

const Template1 = ({ resumeData }) => {
  const { personalInfo, education, workExperience, skills, projects, activities } = resumeData;

  return (
    <div className="resume-template template1">
      <header className="template-header">
        <div className="name-title">
          <h1>{personalInfo.firstName} <span className="last-name">{personalInfo.lastName}</span></h1>
          {personalInfo.summary && <p className="professional-title">{personalInfo.summary.split('.')[0]}</p>}
        </div>
        
        <div className="contact-info">
          {personalInfo.email && <div className="contact-item"><span>Email:</span> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="contact-item"><span>Phone:</span> {personalInfo.phone}</div>}
          {personalInfo.address && <div className="contact-item"><span>Location:</span> {personalInfo.address}</div>}
          {personalInfo.linkedin && <div className="contact-item"><span>LinkedIn:</span> {personalInfo.linkedin}</div>}
          {personalInfo.github && <div className="contact-item"><span>GitHub:</span> {personalInfo.github}</div>}
        </div>
      </header>
      
      <div className="resume-body">
        {personalInfo.summary && (
          <section className="resume-section">
            <h2 className="section-title">PROFILE</h2>
            <div className="section-content">
              <p>{personalInfo.summary}</p>
            </div>
          </section>
        )}
        
        {workExperience.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">PROFESSIONAL EXPERIENCE</h2>
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
                    <div className="experience-description">
                      {exp.description.split('\n').map((item, i) => (
                        <p key={i}>{item}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {education.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">EDUCATION</h2>
            <div className="section-content">
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h3>{edu.institution}</h3>
                  <div className="education-meta">
                    <span>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                    <span className="date">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  {edu.gpa && <div className="gpa">GPA: {edu.gpa}</div>}
                  {edu.description && <p className="education-description">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {skills.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">SKILLS</h2>
            <div className="section-content skills-container">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )}
        
        {projects.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">PROJECTS</h2>
            <div className="section-content">
              {projects.map((project, index) => (
                <div key={index} className="project-item">
                  <h3>{project.name}</h3>
                  {project.technologies && (
                    <div className="technologies">
                      <strong>Technologies:</strong> {project.technologies}
                    </div>
                  )}
                  {project.description && <p className="project-description">{project.description}</p>}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {activities.length > 0 && activities.some(a => a.name) && (
          <section className="resume-section">
            <h2 className="section-title">ACTIVITIES</h2>
            <div className="section-content">
              {activities.filter(a => a.name).map((activity, index) => (
                <div key={index} className="activity-item">
                  <h3>{activity.name}</h3>
                  {activity.position && <div className="position">{activity.position}</div>}
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

export default Template1;