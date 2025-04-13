import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Template images (replace with your actual template images)
// import template1Image from '../templates/template1.jpg';
// import template2Image from '../templates/template2.jpg';
// import template3Image from '../templates/template3.jpg';
// import template4Image from '../templates/template4.jpg';
// import template5Image from '../templates/template5.jpg';

const ResumePreview = () => {
  const location = useLocation();
  const resumeData = location.state?.resumeData;
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

//   const templates = [
//     { id: 1, name: 'Modern Blue', image: template1Image },
//     { id: 2, name: 'Professional Dark', image: template2Image },
//     { id: 3, name: 'Creative Color', image: template3Image },
//     { id: 4, name: 'Minimalist', image: template4Image },
//     { id: 5, name: 'Elegant', image: template5Image }
//   ];

const templates=[]

  const handleDownload = () => {
    if (!resumeData) return;
    
    setIsGenerating(true);
    
    // Generate PDF from the preview content
    const input = document.getElementById('resume-preview');
    
    html2canvas(input, {
      scale: 2,
      logging: false,
      useCORS: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`);
      setIsGenerating(false);
    });
  };

  if (!resumeData) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">
          No resume data found. Please fill out the form first.
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center">Resume Preview</h2>
              <p className="text-center mb-0">Select a template and download your resume</p>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <div id="resume-preview" className="preview-container border p-4 mb-4">
                    {/* Dynamic preview based on selected template */}
                    <h3 className="text-center">{resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}</h3>
                    <p className="text-center">
                      {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.linkedin && `LinkedIn: ${resumeData.personalInfo.linkedin}`}
                    </p>
                    
                    <h5 className="mt-4 border-bottom">Professional Summary</h5>
                    <p>{resumeData.personalInfo.summary}</p>
                    
                    {resumeData.education.length > 0 && (
                      <>
                        <h5 className="mt-4 border-bottom">Education</h5>
                        {resumeData.education.map((edu, index) => (
                          <div key={index} className="mb-3">
                            <h6>{edu.degree} - {edu.institution}</h6>
                            <p>{edu.fieldOfStudy && `${edu.fieldOfStudy} | `}{edu.startDate} - {edu.endDate || 'Present'}{edu.gpa && ` | GPA: ${edu.gpa}`}</p>
                            {edu.description && <p>{edu.description}</p>}
                          </div>
                        ))}
                      </>
                    )}
                    
                    {resumeData.workExperience.length > 0 && (
                      <>
                        <h5 className="mt-4 border-bottom">Work Experience</h5>
                        {resumeData.workExperience.map((exp, index) => (
                          <div key={index} className="mb-3">
                            <h6>{exp.position} at {exp.company}</h6>
                            <p>{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</p>
                            {exp.description && <p>{exp.description}</p>}
                            {exp.responsibilities.length > 0 && (
                              <ul>
                                {exp.responsibilities.map((resp, i) => (
                                  <li key={i}>{resp}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                    
                    {resumeData.skills.length > 0 && (
                      <>
                        <h5 className="mt-4 border-bottom">Skills</h5>
                        <div className="d-flex flex-wrap">
                          {resumeData.skills.map((skill, index) => (
                            <span key={index} className="badge bg-secondary me-2 mb-2">
                              {skill.name} {skill.level && `(${skill.level})`}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                    
                    {resumeData.projects.length > 0 && (
                      <>
                        <h5 className="mt-4 border-bottom">Projects</h5>
                        {resumeData.projects.map((project, index) => (
                          <div key={index} className="mb-3">
                            <h6>{project.name}</h6>
                            <p>{project.description}</p>
                            {project.technologies && <p>Technologies: {project.technologies}</p>}
                          </div>
                        ))}
                      </>
                    )}
                    
                    {resumeData.activities.length > 0 && (
                      <>
                        <h5 className="mt-4 border-bottom">Activities</h5>
                        {resumeData.activities.map((activity, index) => (
                          <div key={index} className="mb-3">
                            <h6>{activity.title}</h6>
                            <p>{activity.description}</p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <h4>Select Template</h4>
                  <div className="template-selector">
                    {templates.map(template => (
                      <div 
                        key={template.id}
                        className={`template-card mb-3 p-2 ${selectedTemplate === template.id ? 'selected border-primary' : 'border-light'}`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <img 
                          src={template.image} 
                          alt={template.name} 
                          className="img-fluid rounded border"
                          style={{ cursor: 'pointer' }}
                        />
                        <div className="template-name text-center mt-2">{template.name}</div>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="btn btn-primary btn-lg w-100 mt-3"
                    onClick={handleDownload}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Generating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-download me-2"></i> Download Resume
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;