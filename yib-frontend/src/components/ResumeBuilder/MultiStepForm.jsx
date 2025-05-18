




















import React, { useEffect, useState } from 'react';
import PersonalInfo from './PersonalInfo';
import EducationDetails from './EducationDetails';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import Projects from './Projects';
import Activities from './Activities';
import ProgressBar from './ProgressBar';
import TemplateSelector from './TemplateSelector';
import './resume-builder.css';
import { useDispatch, useSelector } from "react-redux";
import { clearResume, updateResume } from '../../store/resumeSlice';

function MultiStepForm() {

  const resumeID=useSelector((state)=>state.resume.resume.resumeId);
  const submittedStatus=useSelector((state)=>state.resume.resume.submitted);
  // const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(
    {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      summary: '',
      linkedin: '',
      github: '',
      portfolio: '',
      photo:''
    },
    education: [{
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: '',
      currently:false
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
  const [submitted, setSubmitted] = useState(submittedStatus);
  const [resumeId, setResumeId] = useState(resumeID);

  // const [resume,setResume]
  const resumeData=useSelector((state)=>state.resume.resume);
  const dispatch=useDispatch();
  const submitForm = async () => {
    try {
      // Mock API call - replace with actual API call

      console.log('Form submitted:', resumeData);
      setResumeId('resume-' + Date.now());
      console.log("resume id : ",Date.now())
      dispatch(updateResume(['resumeId',Date.now()]));
      dispatch(updateResume(['submitted',true]));
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };
useEffect(()=>{
// dispatch(clearResume(null));
},[])
  const step=useSelector((state)=>state.resume.currentStep)

  return (
    <div className="resume-builder-app">
      {!submitted ? (
        <div className="form-container">
          <ProgressBar currentStep={step} totalSteps={6} />
          
          <div className="form-content">
            {step === 1 && (
              <PersonalInfo 
              />
            )}
            
            {step === 2 && (
              <EducationDetails    
              />
            )}
            
            {step === 3 && (
              <WorkExperience/>
            )}
            
            {step === 4 && (
              <Skills 
                
              />
            )}
            
            {step === 5 && (
              <Projects 
                
              />
            )}
            
            {step === 6 && (
              <Activities 
                submitForm={submitForm}
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
