import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaHome, FaLinkedin, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

import template3 from './template-preview/template3.png';

const Template3 = ({resumeData}) => {
  const {resumeId, personalInfo, educationDetails, experiences, skills, projects, activities } = resumeData;
  console.log("educ : ",educationDetails)
  function getCurrentPosition(experiences) {
  const currentJob = experiences.find(exp => exp.current === true);
  return currentJob ? currentJob.position : null;
}
  return (
    <>
    
    <div className="hidden md:block max-w-3xl mx-auto bg-white shadow-lg border-2 border-black  px-14  font-sans text-gray-800  mb-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wide mb-3">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <p className="uppercase text-md tracking-wider text-gray-500 mt-0">{getCurrentPosition(experiences)}</p>
      </div>

      <hr className="border-t-2 border-black mt-2" />

      {/* Contact Info */}
      <div className="mt-2 p-4 grid  md:grid-cols-3  justify-center items-center text-sm text-gray-700 mb-6 border-t-2 border-b-2 border-gray-300 gap-3">
  <p className=" items-center gap-2 m-0"><FaPhone/> {personalInfo.phone}</p>
  <p className=" items-center gap-2 m-0 "><FaHome/> {personalInfo.address}</p>
  <p className="items-center gap-2 m-0">
    <a href={`mailto:${personalInfo.email}`} className="hover:underline no-underline text-black cursor-pointer" target="_blank" rel="noopener noreferrer">
      <FaEnvelope /> {personalInfo.email}
    </a>
  </p>
  <p className="items-center gap-2 m-0">
    <a href={personalInfo.linkedin} className="hover:underline no-underline text-black cursor-pointer" target="_blank" rel="noopener noreferrer">
      <FaLinkedin /> LinkedIn
    </a>
  </p>
  <p className="items-center gap-2 m-0">
    <a href={personalInfo.github} className="hover:underline no-underline text-black cursor-pointer" target="_blank" rel="noopener noreferrer">
      <FaGithub /> GitHub
    </a>
  </p>
</div>
      


      {/* About Me */}
      <section className="mb-6">
        <h2 className="text-md font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">ABOUT ME</h2>
        <hr className="border-t-2 border-black my-2" />
        <p className="text-sm leading-relaxed">
          {personalInfo.summary}
        </p>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-md font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">EDUCATION</h2>
        <hr className="border-t-2 border-black my-2" />
       
       {educationDetails.map((edu, index) => {
        return (

       <div key={index} className="mb-0 ">
          <div className=' flex flex-row justify-between items-center w-[500px]'>
<p className="font-bold text-md py-0 my-1">{index+1}. {edu.institution}</p>
<p className="font-normal text-md py-0 my-1">{edu.startDate} - {edu.endDate}</p>
          </div>
          
          <p className="text-md text-gray-600 my-1  ">{edu.degree} {(edu.degree && edu.fieldOfStudy) ?" - " :" "} {edu.fieldOfStudy}</p>

          <p className='text-md text-gray-600 my-1 py-1'>GPA : {edu.gpa}</p>
          
          <p className="text-sm">
            {edu.description}
          </p>
        </div>);
       })}
        
        
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-md font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">EXPERIENCE</h2>
        <hr className="border-t-2 border-black my-2" />
        {experiences.map((exp, index) => {
        return (

       <div key={index} className="mb-3 ">
          <div className='py-0 my-0 flex flex-row justify-between items-center w-[500px]'>
<p className="font-bold text-md py-0 my-1">{index+1}. {exp.company}</p>
<p className="font-normal text-md py-0 my-1">{exp.startDate} - {exp.endDate}</p>
          </div>
          
          <p className="text-md text-gray-600 my-1 p-0">{exp.position} </p>

          
          <p className="text-sm my-1 py-1">
            {exp.description}
          </p>
        </div>);
       })}
        
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-md font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">SKILLS</h2>
        <hr className="border-t-2 border-black my-2" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          {skills.map((skill,index)=>{
            return (
              
                <li key={index}>{skill}</li>
              
            )
          })}
        </div>
      </section>

      {/* References */}
      <section className='py-6'>
        <h2 className="text-md font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">PROJECTS</h2>
        <hr className="border-t-2 border-black my-2" />
        {projects.map((project, index) => {
        return (

       <div key={index} className="mb-3 ">
          <div className='py-0 my-0 flex flex-row justify-between items-center w-[400px]'>
<p className="font-bold text-md py-0 my-1">{index+1}. {project.name}</p>
{project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 mr-5"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>

          {project.technologies && <div className="flex flex-wrap gap-2 mb-2 mt-3">
            {project.technologies
              .split(',')
              .map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="bg-gray-100  text-black text-[0.8rem] font-medium px-2.5 py-1.5 rounded"
                >
                  {tech.trim()}
                </span>
              ))}
          </div>}
        
          <p className="text-sm my-1 py-1">
            {project.description}
          </p>
        </div>);
       })}
      </section>



{/* References */}
      {activities[0].name && <section className='mb-6 pb-3'>
        <h2 className="text-md font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">ACTIVITIES</h2>
        <hr className="border-t-2 border-black my-2" />
        {activities.map((activity, index) => {
        return (

       <div key={index} className="mb-3 ">
          
<p className="font-bold text-md py-0 my-1">{index+1}. {activity.name}</p>
        

<p className="text-md text-gray-600 font-normal my-0 p-0 ">{activity.position} </p>
        
          <p className="text-sm my-1 py-1">
            {activity.description}
          </p>
        </div>);
       })}
      </section>

      }
      
    </div>
      

<div
      className="md:hidden relative h-[500px] w-full bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${template3})`,
      filter: 'blur(1px)',
    transition: 'filter 0.3s ease-out',
    
    
    }}
    >
      {/* Overlay */}
      <div  className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-xl md:text-2xl font-medium">
            Resume ID: {resumeId}
          </p>
        </div>
      </div>
    </div>


    </>
  );
};

export default Template3;
