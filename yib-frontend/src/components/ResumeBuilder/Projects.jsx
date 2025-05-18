import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaProjectDiagram } from 'react-icons/fa';
import './FormStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateResume, updateStep } from '../../store/resumeSlice';

const Projects = () => {
  const dispatch=useDispatch();
  const currentStep=useSelector((state)=>state.resume.currentStep)
  const projectsss=useSelector((state)=>state.resume.resume.projects);
  const [projects, setProjects] = useState(projectsss);
  const [errors, setErrors] = useState([]);
const stepUpdate=(mov)=>{
    if(mov=='prev')
      dispatch(updateStep(currentStep-1));
    dispatch(updateResume(['projects', projects]));
  }
  

  const handleChange = (index, e) => {
  const { name, value, type, checked } = e.target;
  setProjects((prevProjects) =>
    prevProjects.map((project, i) =>
      i === index
        ? { ...project, [name]: type === 'checkbox' ? checked : value }
        : project
    )
  );
};
  const addProject = () => {
    setProjects([...projects, {
      name: '',
      description: '',
      technologies: '',
      link: ''
    }]);
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
    }
  };

  useEffect(() => {
      if (projectsss) {
        setProjects(projectsss);
        
      }
    }, [projectsss]);
  

  const validate = () => {
    const newErrors = projects.map(proj => {
      const projErrors = {};
      if (!proj.name.trim()) projErrors.name = 'Project name is required';
      if (!proj.description.trim()) projErrors.description = 'Description is required';
      return projErrors;
    });
    
    setErrors(newErrors);
    return newErrors.every(err => Object.keys(err).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateStep(currentStep+1));
    dispatch(updateResume(['projects', projects]));
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Personal Projects</h2>
        <p className="text-sm text-gray-500">Showcase your personal or academic projects</p>
      </div>







{projects?.map((proj, index) => (
        <div key={index} className="border border-gray-200 p-6 rounded-lg space-y-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <FaProjectDiagram className="text-blue-600" />
              <span>Project #{index + 1}</span>
            </div>
            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-white hover:bg-slate-700 bg-slate-800"
              >
                <FaMinus />
              </button>
            )}
          </div>


















      {/* Project Name */}
      <div className="flex flex-col pr-6 gap-x-6">
      <label className="block text-sm font-semibold text-slate-700 mb-1">Project Name *</label>
        <input
          type="text"
          name="name"
          value={proj.name}
          onChange={(e) => handleChange(index, e)}
          className={`mb-0  w-full gap-x-6 px-4 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${
            errors[index]?.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors[index]?.name && (
          <span className="text-sm text-red-600 mt-1">{errors[index].name}</span>
        )}
      </div>



      {/* Description */}
      <div className="flex flex-col pr-6 gap-x-6">
      <label className="block text-sm font-semibold text-slate-700 mb-1">Description *</label>
        <textarea
          name="description"
          value={proj.description}
          onChange={(e) => handleChange(index, e)}
          rows={4}
          placeholder="Describe the project, your role, and key achievements"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors[index]?.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors[index]?.description && (
          <span className="text-sm text-red-600 mt-1">{errors[index].description}</span>
        )}
      </div>











      
      <div className="flex flex-row gap-x-6 gap-y-4">
        <div className="w-full pr-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Technologies Used</label>
          <input
            name="technologies"
            type="text"
            placeholder="e.g., React, Node.js, MongoDB"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300`}
            value={proj.technologies}
            onChange={(e) =>handleChange(index, e)}
          />
        </div>


        <div className="w-full pr-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Project Link</label>
          <input
            name="link"
            type="text"
            placeholder='"https://yourproject.com"'
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300`}
            value={proj.link}
            onChange={(e) =>handleChange(index, e)}
          />
        </div>

        
      </div>


    </div>
  ))}

  {/* Add More Button */}
  <div className="flex justify-center">
    <button
      type="button"
      onClick={addProject}
      className="flex items-center gap-2 px-4 py-2 text-white bg-slate-800 rounded-md hover:bg-slate-700"
    >
      <FaPlus /> Add Another Project
    </button>
  </div>

  {/* Navigation Buttons */}
  <div className="flex justify-between">
    <button
      type="button"
      onClick={()=>stepUpdate('prev')}
      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
    >
      ← Back
    </button>
    <button
      type="submit"
      className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700"
    >
      Next: Activities <span className="ml-1">→</span>
    </button>
  </div>
</form>

  );
};

export default Projects;