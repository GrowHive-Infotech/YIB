import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSkills } from '../../../store/jobsSlice';
import { add } from 'date-fns';

const JobSearchBox = () => {
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [showResumeInput, setShowResumeInput] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);

  const handleSkillSearch = () => {
    setShowSkillInput(true);
    setShowResumeInput(false);
  };

  const handleResumeSearch = () => {
    setShowResumeInput(true);
    setShowSkillInput(false);
  };

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setSkillInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  // const allJobs=useSelector((state)=>state.jobs.jobs);
const dispatch=useDispatch();
  

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      setResumeFile(file);
    } else {
      alert("Please upload a valid PDF or Word document.");
    }
  };

  const handleResumeJobSearch = () => {
    console.log("Searching jobs based on resume:", resumeFile.name);
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-md mx-auto mt-10 px-6 py-6 bg-slate-50 shadow-lg rounded-xl text-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Find your Job</h2>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handleSkillSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
        >
          On Basis of Skills
        </button>
        <button
          onClick={handleResumeSearch}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
        >
          On Basis of Resume
        </button>
      </div>

      {/* Skill Input Section */}
      {showSkillInput && (
        <div className="w-full max-w-sm flex flex-col gap-4">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a skill and press Enter"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      
        {skills.length > 0 && (
          <div className="flex flex-wrap justify-start gap-3 w-full">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-800 text-white py-2 px-4 rounded-full"
              >
                <span className="text-sm">{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="px-2 py-1 flex items-center justify-center bg-white text-black rounded-full hover:bg-red-500 hover:text-white transition"
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      
        {skills.length > 0 && (
          <Link
            to={`/jobs/skills`}
            onClick={()=>{
              dispatch(addSkills(skills));
            }}
            className="mt-1 no-underline bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-10 rounded-lg transition-colors duration-200 self-center"
          >
            Search Job
          </Link>
        )}
      </div>
      
      
      
      )}

      {/* Resume Upload Section */}
      {showResumeInput && (
        <div className="w-full max-w-sm mt-4 flex flex-col items-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            className="w-full text-sm border border-gray-300 rounded-lg py-2 px-3 file:bg-green-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
          />
          {resumeFile && (
            <>
              <p className="mt-3 text-sm text-gray-700">Uploaded: {resumeFile.name}</p>
              <button
                onClick={handleResumeJobSearch}
                className="mt-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-10 rounded-lg transition-colors duration-200"
            >
                Search Job
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default JobSearchBox;
