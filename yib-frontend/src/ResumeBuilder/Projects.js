import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaProjectDiagram } from 'react-icons/fa';
import './FormStyles.css';

const Projects = ({ data, updateData, nextStep, prevStep }) => {
  const [projects, setProjects] = useState(data);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setProjects(data);
  }, [data]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...projects];
    updatedProjects[index][name] = value;
    setProjects(updatedProjects);
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
      updateData(projects);
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card projects-form">
      <h2 className="form-title">Personal Projects</h2>
      <p className="form-subtitle">Showcase your personal or academic projects</p>
      
      {projects.map((proj, index) => (
        <div key={index} className="project-item card">
          <div className="card-header">
            <FaProjectDiagram className="icon" />
            <h3>Project #{index + 1}</h3>
            {projects.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeProject(index)}
                className="btn-remove"
              >
                <FaMinus />
              </button>
            )}
          </div>
          
          <div className="form-group">
            <label>Project Name *</label>
            <input
              type="text"
              name="name"
              value={proj.name}
              onChange={(e) => handleChange(index, e)}
              className={errors[index]?.name ? 'error' : ''}
            />
            {errors[index]?.name && (
              <span className="error-message">{errors[index].name}</span>
            )}
          </div>
          
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={proj.description}
              onChange={(e) => handleChange(index, e)}
              rows={3}
              className={errors[index]?.description ? 'error' : ''}
              placeholder="Describe the project, your role, and key achievements"
            />
            {errors[index]?.description && (
              <span className="error-message">{errors[index].description}</span>
            )}
          </div>
          
          <div className="two-column-grid">
            <div className="form-group">
              <label>Technologies Used</label>
              <input
                type="text"
                name="technologies"
                value={proj.technologies}
                onChange={(e) => handleChange(index, e)}
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>
            
            <div className="form-group">
              <label>Project Link</label>
              <input
                type="url"
                name="link"
                value={proj.link}
                onChange={(e) => handleChange(index, e)}
                placeholder="https://yourproject.com"
              />
            </div>
          </div>
        </div>
      ))}
      
      <div className="add-more-container">
        <button 
          type="button" 
          onClick={addProject}
          className="btn-add-more"
        >
          <FaPlus /> Add Another Project
        </button>
      </div>
      
      <div className="form-navigation">
        <button type="button" onClick={prevStep} className="btn-secondary">
          ← Back
        </button>
        <button type="submit" className="btn-primary">
          Next: Activities <span className="arrow">→</span>
        </button>
      </div>
    </form>
  );
};

export default Projects;