import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaBriefcase } from 'react-icons/fa';
import './FormStyles.css';

const WorkExperience = ({ data, updateData, nextStep, prevStep }) => {
  const [experiences, setExperiences] = useState(data);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setExperiences(data);
  }, [data]);

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedExperiences = [...experiences];
    
    if (type === 'checkbox') {
      updatedExperiences[index][name] = checked;
      if (checked) {
        updatedExperiences[index].endDate = 'Present';
      }
    } else {
      updatedExperiences[index][name] = value;
    }
    
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    }]);
  };

  const removeExperience = (index) => {
    if (experiences.length > 1) {
      const updatedExperiences = [...experiences];
      updatedExperiences.splice(index, 1);
      setExperiences(updatedExperiences);
    }
  };

  const validate = () => {
    const newErrors = experiences.map(exp => {
      const expErrors = {};
      if (!exp.company.trim()) expErrors.company = 'Company is required';
      if (!exp.position.trim()) expErrors.position = 'Position is required';
      if (!exp.startDate.trim()) expErrors.startDate = 'Start date is required';
      if (!exp.current && !exp.endDate.trim()) expErrors.endDate = 'End date is required';
      return expErrors;
    });
    
    setErrors(newErrors);
    return newErrors.every(err => Object.keys(err).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateData(experiences);
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card experience-form">
      <h2 className="form-title">Work Experience</h2>
      <p className="form-subtitle">List your relevant work experience</p>
      
      {experiences.map((exp, index) => (
        <div key={index} className="experience-item card">
          <div className="card-header">
            <FaBriefcase className="icon" />
            <h3>Experience #{index + 1}</h3>
            {experiences.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeExperience(index)}
                className="btn-remove"
              >
                <FaMinus />
              </button>
            )}
          </div>
          
          <div className="two-column-grid">
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleChange(index, e)}
                className={errors[index]?.company ? 'error' : ''}
              />
              {errors[index]?.company && (
                <span className="error-message">{errors[index].company}</span>
              )}
            </div>
            
            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                name="position"
                value={exp.position}
                onChange={(e) => handleChange(index, e)}
                className={errors[index]?.position ? 'error' : ''}
              />
              {errors[index]?.position && (
                <span className="error-message">{errors[index].position}</span>
              )}
            </div>
          </div>
          
          <div className="three-column-grid">
            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="month"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleChange(index, e)}
                className={errors[index]?.startDate ? 'error' : ''}
              />
              {errors[index]?.startDate && (
                <span className="error-message">{errors[index].startDate}</span>
              )}
            </div>
            
            <div className="form-group">
              <label>End Date *</label>
              <input
                type="month"
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleChange(index, e)}
                disabled={exp.current}
                className={errors[index]?.endDate ? 'error' : ''}
              />
              {errors[index]?.endDate && (
                <span className="error-message">{errors[index].endDate}</span>
              )}
            </div>
            
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="current"
                  checked={exp.current}
                  onChange={(e) => handleChange(index, e)}
                />
                I currently work here
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={exp.description}
              onChange={(e) => handleChange(index, e)}
              rows={4}
              placeholder="Describe your responsibilities and achievements"
            />
            <p className="hint">Use bullet points for better readability (e.g., • Managed team of 5 developers)</p>
          </div>
        </div>
      ))}
      
      <div className="add-more-container">
        <button 
          type="button" 
          onClick={addExperience}
          className="btn-add-more"
        >
          <FaPlus /> Add Another Experience
        </button>
      </div>
      
      <div className="form-navigation">
        <button type="button" onClick={prevStep} className="btn-secondary">
          ← Back
        </button>
        <button type="submit" className="btn-primary">
          Next: Skills <span className="arrow">→</span>
        </button>
      </div>
    </form>
  );
};

export default WorkExperience;