import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaCode } from 'react-icons/fa';
import './FormStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateResume, updateStep } from '../../store/resumeSlice';

const Skills = () => {

  const skillsss=useSelector((state)=>state.resume.resume.skills);
  const [skills, setSkills] = useState(skillsss|| []);
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState('');
const currentStep=useSelector((state)=>state.resume.currentStep);
  const dispatch=useDispatch();
  const stepUpdate=(mov)=>{
    if(mov=='prev')
      dispatch(updateStep(currentStep-1));
    dispatch(updateResume(['skills', skills]));
  }

  

  const addSkill = () => {
    if (newSkill.trim()) {
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
        setNewSkill('');
        setError('');
      } else {
        setError('This skill already exists');
      }
    } else {
      setError('Skill cannot be empty');
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateResume(['skills', skills]));
                dispatch(updateStep(currentStep + 1));
  };

 useEffect(() => {
    if (skillsss) {
      setSkills(skillsss);
      
    }
  }, [skillsss]);


  

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
    <h2 className="text-2xl font-semibold text-slate-800">Skills</h2>
    <p className="text-slate-600">Add your relevant skills and technologies</p>

    {/* Skill Input Section */}
<div className="space-y-2">
  <label className="block text-sm font-medium text-slate-700">Add Skill</label>
  <div className="border-box flex items-center gap-x-2">
    <input
      type="text"
      value={newSkill}
      onChange={(e) => setNewSkill(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleKeyPress(e)}
      placeholder="e.g., JavaScript, React, Project Management"
      className="mb-0 h-6 flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div
      // type="button"
      onClick={addSkill}
      className="cursor-pointer h-6 flex items-center gap-1 px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700"
    >
      <FaPlus /> Add
    </div>
  </div>
  {error && (
    <span className="text-sm text-red-600 min-h-[1.25rem]">{error}</span>
  )}
</div>


    {/* Skills List */}
    <div>
      {skills.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="flex items-center gap-2 pl-3 pr-2 py-1 bg-slate-800 text-white rounded-md text-md"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="m-1 px-2 py-1 text-black hover:bg-white bg-white rounded-md"
                aria-label={`Remove ${skill}`}
              >
                <FaMinus size={10}/>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center text-slate-500 mt-4">
          <FaCode className="text-3xl mb-2" />
          <p>No skills added yet</p>
        </div>
      )}
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between pt-4">
      <button
        type="button"
        onClick={()=>stepUpdate("prev")}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
      >
        ← Back
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 flex items-center gap-2"
      >
        Next: Projects <span>→</span>
      </button>
    </div>
  </form>
  );
};

export default Skills;