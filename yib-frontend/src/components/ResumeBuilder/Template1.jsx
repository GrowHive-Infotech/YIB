
import React from 'react';
import { FaPhone, FaEnvelope, FaHome, FaLinkedin, FaGithub } from 'react-icons/fa';

import { FaExternalLinkAlt } from 'react-icons/fa';
const Template1 = ({ resumeData }) => {
    const {resumeId, personalInfo, educationDetails, experiences, skills, projects, activities } = resumeData;
    console.log(activities);
    // const profilePic='https://images.pexels.com/photos/30327991/pexels-photo-30327991/free-photo-of-historic-fort-in-okzitanien-france.jpeg';
  return (<>

<div className="hidden md:block min-h-screen bg-gray-100 p-4 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg flex overflow-hidden">
        {/* Sidebar */}
        <div className="lg:w-1/3 w-[40%] bg-indigo-900 text-white p-6">
          <div className="flex flex-col items-center">
            <img
              src={personalInfo.photo}

              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h1 className="text-xl font-bold text-center">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-sm text-center mt-1">{personalInfo.role}</p>
          </div>

{personalInfo.summary && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-3">Profile</h2>
              <p className="text-white text-sm font-light leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}


          <div className="mt-6">
            <h2 className="text-lg font-semibold border-b border-white pb-1 mb-2 text-white">Contact</h2>
            
            <ul className="space-y-4 text-sm text-white ">
    {personalInfo.phone && (
      <li className="flex items-center gap-3">
        <FaPhone className="" />
        <span>{personalInfo.phone}</span>
      </li>
    )}
    {personalInfo.email && (
      <li className="flex items-center gap-3">
        <FaEnvelope className="" />
        <span>{personalInfo.email}</span>
      </li>
    )}
    {personalInfo.address && (
      <li className="flex items-center gap-3">
        <FaHome className="" />
        <span>{personalInfo.address}</span>
      </li>
    )}
    {personalInfo.linkedin && (
      <li className="flex items-center gap-3">
        <FaLinkedin className="" />
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline no-underline  text-white hover:text-white"
        >
          {personalInfo.linkedin}
        </a>
      </li>
    )}
    {personalInfo.github && (
      <li className="flex items-center gap-3">
        <FaGithub className="text-white" />
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline no-underline text-white hover:text-white"
        >
          {personalInfo.github}
        </a>
      </li>
    )}
  </ul>
          </div>












{educationDetails && educationDetails.length > 0 && (
  <div className="mt-6">
    <h2 className="text-lg font-semibold border-b border-white pb-1 mb-2">Education</h2>
    {educationDetails.map((edu, index) => {
      const heading = index === 0 ? 'Undergraduate' : index === 1 ? '12th Grade' : index === 2 ? '10th Grade' : `Education #${index + 1}`;
      return (
        <div key={index} className="mb-6 ">
          <h3 className="text-md font-normal text-white m-2">{index+1}. {heading}</h3>
          <div className="flex justify-between items-center ml-4">
            <p className="text-sm font-normal m-0">{edu.institution}</p>
            <p className="text-sm mr-2 text-white font-light m-0">{edu.startDate} - {edu.endDate}</p>
          </div>
          <div className="flex justify-between items-end mt-2 ml-4 ">

          {edu.degree &&   <p className="text-xs p-0 text-white m-0">{edu.degree} {edu.fieldOfStudy && <> - </>} {edu.fieldOfStudy}</p>}
          {edu.gpa && <p className="text-xs  p-0 mr-2 text-white m-0">GPA: {edu.gpa}</p>}
             </div>
          
        </div>
      );
    })}
  </div>
)}


          {skills && skills.length > 0 && (
  <section className="mt-6">
    <h2 className="textlg font-semibold text-white mb-4">Skills</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="px-2 py-1.5 flex items-center justify-center  bg-blue-100 text-black rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
        >
          {skill}
        </div>
      ))}
    </div>
  </section>
)}


          
        </div>

        {/* Main Content */}
        <div className="lg:w-2/3 w-[60%] p-6">
        
{experiences && experiences.length > 0 && (
  <section className="mb-5">
    <h2 className="text-2xl font-semibold text-indigo-800 mb-3">Work Experience</h2>
    {experiences.map((exp, index) => (
      <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm mb-3">
        <h3 className="text-lg font-bold text-gray-800 mb-0">
          {index + 1}. {exp.company}
        </h3>
        <p className="text-sm text-gray-600 mb-1 ml-5 mt-1">
          {exp.position} | {exp.startDate} - {exp.endDate}
        </p>
        {exp.description && (
          <ul className="list-disc list-inside text-sm text-gray-700 leading-6 mt-2">
            {exp.description.split('\n').map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </section>
)}


{projects && projects.length > 0 && (
  <section className="mb-5">
    <h2 className="text-2xl font-semibold text-indigo-800 mb-4 mt-0">Projects</h2>
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-gray-900 m-0">
              {index + 1}. {project.name}
            </h3>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 mr-5"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
          {/* <p className="text-sm font-semibold text-gray-800 mb-2">Technologies:</p> */}
          <div className="flex flex-wrap gap-2 mb-2 mt-3">
            {project.technologies
              .split(',')
              .map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="bg-indigo-100  text-indigo-800 text-[0.8rem] font-medium px-2.5 py-1.5 rounded"
                >
                  {tech.trim()}
                </span>
              ))}
          </div>
          {/* <p className="text-sm font-semibold text-gray-800 mb-2">Description</p> */}
          <p className="text-sm text-gray-700 leading-relaxed m-0 mt-3">
            {project.description}
          </p>
        </div>
      ))}
    </div>
  </section>
)}



          {activities && activities.length > 0 && activities.some(a => a.name) && (
  <section className="mb-6">
    <h2 className="text-2xl font-semibold text-indigo-800 mb-3">Activities</h2>
    {activities.map((activity, index) => (
      <div
        key={index}
        className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm mb-3"
      >
        <h3 className="text-lg font-bold text-gray-800 m-0">
          {index + 1}. {activity.name}
        </h3>
        {activity.position && (
          <p className="text-sm text-gray-600 italic m-0 ml-1 mt-1">{activity.position}</p>
        )}
        {activity.description && (
          <p className="text-sm text-gray-700 mt-2 leading-relaxed">
            {activity.description}
          </p>
        )}
      </div>
    ))}
  </section>
)}




        </div>
      </div>
    </div>



    <div className="h-[600px] flex flex-col justify-center items-center  md:hidden">
  <div className="w-3/4 max-w-xs bg-white shadow-lg rounded-md overflow-hidden ">
    <img
    style={{filter: 'blur(3px)',
    transition: 'filter 0.3s ease-out',}}
      src={personalInfo.photo}
      alt="Resume Preview"
      className="w-full h-auto object-cover "
    />
  </div>
  <p className="mt-2 text-center text-gray-800 font-medium ">
    {personalInfo.firstName} {personalInfo.lastName} - {resumeId}
  </p>
</div>

    </>
  );
};

export default Template1;

