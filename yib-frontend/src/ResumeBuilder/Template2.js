import React from 'react';
import './Template2.css';

const Template2 = ({ resumeData }) => {
  const { personalInfo, education, workExperience, skills, projects, activities } = resumeData;

  return (
    <div className="resume-template template2">
      <div className="resume-header">
        <div className="name-title">
          <h1>{personalInfo.firstName} <span className="last-name">{personalInfo.lastName}</span></h1>
          {personalInfo.summary && <p className="professional-summary">{personalInfo.summary}</p>}
        </div>
        
        <div className="contact-details">
          <div className="contact-column">
            {personalInfo.email && <div className="contact-item">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="contact-item">{personalInfo.phone}</div>}
          </div>
          <div className="contact-column">
            {personalInfo.address && <div className="contact-item">{personalInfo.address}</div>}
            {personalInfo.linkedin && <div className="contact-item">{personalInfo.linkedin}</div>}
          </div>
        </div>
      </div>
      
      <div className="resume-columns">
        <div className="left-column">
          {workExperience.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">EXPERIENCE</h2>
              {workExperience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h3 className="job-title">{exp.position}</h3>
                  <div className="job-meta">
                    <span className="company">{exp.company}</span>
                    <span className="date">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.description && (
                    <div className="job-description">
                      {exp.description.split('\n').map((item, i) => (
                        <p key={i}>{item}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
          
          {education.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">EDUCATION</h2>
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h3 className="degree">{edu.degree}</h3>
                  <div className="education-meta">
                    <span className="institution">{edu.institution}</span>
                    <span className="date">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  {edu.fieldOfStudy && <p className="field-of-study">{edu.fieldOfStudy}</p>}
                  {edu.gpa && <p className="gpa">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
        
        <div className="right-column">
          {skills.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">SKILLS</h2>
              <div className="skills-container">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-dot"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {projects.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">PROJECTS</h2>
              {projects.map((project, index) => (
                <div key={index} className="project-item">
                  <h3 className="project-name">{project.name}</h3>
                  {project.technologies && (
                    <p className="technologies">{project.technologies}</p>
                  )}
                  {project.description && <p className="project-description">{project.description}</p>}
                </div>
              ))}
            </section>
          )}
          
          {activities.length > 0 && activities.some(a => a.name) && (
            <section className="resume-section">
              <h2 className="section-title">ACTIVITIES</h2>
              {activities.filter(a => a.name).map((activity, index) => (
                <div key={index} className="activity-item">
                  <h3 className="activity-name">{activity.name}</h3>
                  {activity.position && <p className="activity-position">{activity.position}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template2;