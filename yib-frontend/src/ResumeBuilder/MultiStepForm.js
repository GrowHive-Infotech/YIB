import React, { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import EducationDetails from './EducationDetails';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import Projects from './Projects';
import Activities from './Activities';
import ProgressBar from './ProgressBar';
import TemplateSelector from './TemplateSelector';
import './resume-builder.css';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      summary: '',
      linkedin: '',
      github: '',
      portfolio: ''
    },
    education: [{
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: ''
    }],
    workExperience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    }],
    skills: [],
    projects: [{
      name: '',
      description: '',
      technologies: '',
      link: ''
    }],
    activities: [{
      name: '',
      description: '',
      position: ''
    }]
  });
  const [submitted, setSubmitted] = useState(false);
  const [resumeId, setResumeId] = useState(null);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateFormData = (type, data) => {
    setFormData(prev => ({
      ...prev,
      [type]: data
    }));
  };

  const submitForm = async () => {
    try {
      // Mock API call - replace with actual API call
      console.log('Form submitted:', formData);
      setResumeId('resume-' + Date.now());
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="resume-builder-app">
      {!submitted ? (
        <div className="form-container">
          <ProgressBar currentStep={step} totalSteps={6} />
          
          <div className="form-content">
            {step === 1 && (
              <PersonalInfo 
                data={formData.personalInfo}
                updateData={(data) => updateFormData('personalInfo', data)}
                nextStep={nextStep}
              />
            )}
            
            {step === 2 && (
              <EducationDetails 
                data={formData.education}
                updateData={(data) => updateFormData('education', data)}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            
            {step === 3 && (
              <WorkExperience 
                data={formData.workExperience}
                updateData={(data) => updateFormData('workExperience', data)}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            
            {step === 4 && (
              <Skills 
                data={formData.skills}
                updateData={(data) => updateFormData('skills', data)}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            
            {step === 5 && (
              <Projects 
                data={formData.projects}
                updateData={(data) => updateFormData('projects', data)}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            
            {step === 6 && (
              <Activities 
                data={formData.activities}
                updateData={(data) => updateFormData('activities', data)}
                submitForm={submitForm}
                prevStep={prevStep}
              />
            )}
          </div>
        </div>
      ) : (
        <TemplateSelector resumeData={formData} resumeId={resumeId} />
      )}
    </div>
  );
}

export default MultiStepForm;