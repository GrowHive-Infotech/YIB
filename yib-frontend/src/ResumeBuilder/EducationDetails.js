import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaUniversity } from 'react-icons/fa';
import './FormStyles.css';

const EducationDetails = ({ data, updateData, nextStep, prevStep }) => {
  const [educations, setEducations] = useState(data);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setEducations(data);
  }, [data]);

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedEducations = [...educations];
    
    if (type === 'checkbox') {
      updatedEducations[index][name] = checked;
    } else {
      updatedEducations[index][name] = value;
    }
    
    setEducations(updatedEducations);
  };

  const addEducation = () => {
    setEducations([...educations, {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: ''
    }]);
  };

  const removeEducation = (index) => {
    if (educations.length > 1) {
      const updatedEducations = [...educations];
      updatedEducations.splice(index, 1);
      setEducations(updatedEducations);
    }
  };

  const validate = () => {
    const newErrors = educations.map(edu => {
      const eduErrors = {};
      if (!edu.institution.trim()) eduErrors.institution = 'Institution is required';
      if (!edu.degree.trim()) eduErrors.degree = 'Degree is required';
      if (!edu.startDate.trim()) eduErrors.startDate = 'Start date is required';
      return eduErrors;
    });
    
    setErrors(newErrors);
    return newErrors.every(err => Object.keys(err).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateData(educations);
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card education-form">
      <h2 className="form-title">Education Details</h2>
      <p className="form-subtitle">Add all your educational qualifications</p>
      
      {educations.map((edu, index) => (
        <div key={index} className="education-item card">
          <div className="card-header">
            <FaUniversity className="icon" />
            <h3>Education #{index + 1}</h3>
            {educations.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeEducation(index)}
                className="btn-remove"
              >
                <FaMinus />
              </button>
            )}
          </div>
          
          <div className="two-column-grid">
            <div className="form-group">
              <label>Institution *</label>
              <input
                type="text"
                name="institution"
                value={edu.institution}
                onChange={(e) => handleChange(index, e)}
                className={errors[index]?.institution ? 'error' : ''}
              />
              {errors[index]?.institution && (
                <span className="error-message">{errors[index].institution}</span>
              )}
            </div>
            
            <div className="form-group">
              <label>Degree *</label>
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleChange(index, e)}
                className={errors[index]?.degree ? 'error' : ''}
              />
              {errors[index]?.degree && (
                <span className="error-message">{errors[index].degree}</span>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label>Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={edu.fieldOfStudy}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          
          <div className="three-column-grid">
            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="month"
                name="startDate"
                value={edu.startDate}
                onChange={(e) => handleChange(index, e)}
                className={errors[index]?.startDate ? 'error' : ''}
              />
              {errors[index]?.startDate && (
                <span className="error-message">{errors[index].startDate}</span>
              )}
            </div>
            
            <div className="form-group">
              <label>End Date (or expected)</label>
              <input
                type="month"
                name="endDate"
                value={edu.endDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            
            <div className="form-group">
              <label>GPA</label>
              <input
                type="text"
                name="gpa"
                value={edu.gpa}
                onChange={(e) => handleChange(index, e)}
                placeholder="4.0"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={edu.description}
              onChange={(e) => handleChange(index, e)}
              rows={3}
              placeholder="Achievements, honors, or relevant coursework"
            />
          </div>
        </div>
      ))}
      
      <div className="add-more-container">
        <button 
          type="button" 
          onClick={addEducation}
          className="btn-add-more"
        >
          <FaPlus /> Add Another Education
        </button>
      </div>
      
      <div className="form-navigation">
        <button type="button" onClick={prevStep} className="btn-secondary">
          ← Back
        </button>
        <button type="submit" className="btn-primary">
          Next: Work Experience <span className="arrow">→</span>
        </button>
      </div>
    </form>
  );
};

export default EducationDetails;