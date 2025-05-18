import { createSlice } from "@reduxjs/toolkit";

export const resumeSlice=createSlice({
    name:'resume',
    initialState:{
        resume: {
            resumeId:'',
            submitted:false,
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
      photo:'',
      filename:''
    },
    educationDetails: 
    
      [{
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: '',
      currently:false
    }]
    ,
    experiences: [{
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
  },
        currentStep:1
    },
    reducers:{
                updateResume:(state,action)=>{
            let param=action.payload[0];
            state.resume[param]=action.payload[1];
            
        },
        updateStep:(state,action)=>{
            state.currentStep=action.payload;
        },
        clearResume:(state,action)=>{
            state.currentStep=1;
            state.resume={
            resumeId:'',
            submitted:false,
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
      photo:'',
      filename:''
    },
    educationDetails: 
    
      [{
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: '',
      currently:false
    }]
    ,
    experiences: [{
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
  }
        }
    }
})


export const {updateResume,updateStep,clearResume} =resumeSlice.actions;

export default resumeSlice.reducer;


