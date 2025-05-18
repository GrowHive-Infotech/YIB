import React from 'react';
import './Template5.css';

const Template5 = ({ resumeData }) => {
  const { personalInfo, education, workExperience, skills, projects, activities } = resumeData;

  return (
    <div className="resume-template template5">
      <div className="resume-header">
        <div className="profile-photo">
          <div className="photo-placeholder">
            <span>Your Photo</span>
          </div>
        </div>
        
        <div className="header-content">
          <h1>{personalInfo.firstName} <span className="last-name">{personalInfo.lastName}</span></h1>
          {personalInfo.summary && <p className="professional-title">{personalInfo.summary.split('.')[0]}</p>}
          
          <div className="contact-info">
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
      </div>
      
      <div className="resume-body">
        <div className="left-column">
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
              <h2 className="section-title">EXPERIENCE</h2>
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
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        <div className="right-column">
          {skills.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">SKILLS</h2>
              <div className="section-content">
                <div className="skills-container">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <span className="skill-name">{skill}</span>
                      <div className="skill-meter">
                        <div className="skill-level" style={{ width: `${Math.min(100, 20 + Math.random() * 80)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
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
                      <p className="technologies">{project.technologies}</p>
                    )}
                    {project.description && <p className="project-description">{project.description}</p>}
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
                    {activity.position && <p className="position">{activity.position}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template5;