import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaCode } from 'react-icons/fa';
import './FormStyles.css';

const Skills = ({ data, updateData, nextStep, prevStep }) => {
  const [skills, setSkills] = useState(data);
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setSkills(data);
  }, [data]);

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
    updateData(skills);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="form-card skills-form">
      <h2 className="form-title">Skills</h2>
      <p className="form-subtitle">Add your relevant skills and technologies</p>
      
      <div className="skills-input-container">
        <div className="form-group">
          <label>Add Skill</label>
          <div className="input-with-button">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., JavaScript, React, Project Management"
            />
            <button 
              type="button" 
              onClick={addSkill}
              className="btn-add-skill"
            >
              <FaPlus /> Add
            </button>
          </div>
          {error && <span className="error-message">{error}</span>}
        </div>
      </div>
      
      <div className="skills-list">
        {skills.length > 0 ? (
          <ul>
            {skills.map((skill, index) => (
              <li key={index} className="skill-item">
                <span>{skill}</span>
                <button 
                  type="button" 
                  onClick={() => removeSkill(index)}
                  className="btn-remove-skill"
                >
                  <FaMinus />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <FaCode className="empty-icon" />
            <p>No skills added yet</p>
          </div>
        )}
      </div>
      
      <div className="form-navigation">
        <button type="button" onClick={prevStep} className="btn-secondary">
          ← Back
        </button>
        <button type="submit" className="btn-primary">
          Next: Projects <span className="arrow">→</span>
        </button>
      </div>
    </form>
  );
};

export default Skills;