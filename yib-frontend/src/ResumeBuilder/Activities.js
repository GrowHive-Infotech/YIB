import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaUsers } from 'react-icons/fa';
import './FormStyles.css';

const Activities = ({ data, updateData, submitForm, prevStep }) => {
  const [activities, setActivities] = useState(data);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setActivities(data);
  }, [data]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedActivities = [...activities];
    updatedActivities[index][name] = value;
    setActivities(updatedActivities);
  };

  const addActivity = () => {
    setActivities([...activities, {
      name: '',
      description: '',
      position: ''
    }]);
  };

  const removeActivity = (index) => {
    if (activities.length > 1) {
      const updatedActivities = [...activities];
      updatedActivities.splice(index, 1);
      setActivities(updatedActivities);
    }
  };

  const validate = () => {
    const newErrors = activities.map(act => {
      const actErrors = {};
      if (act.name.trim() && !act.description.trim()) {
        actErrors.description = 'Description is required if activity name is provided';
      }
      return actErrors;
    });
    
    setErrors(newErrors);
    return newErrors.every(err => Object.keys(err).length === 0);
  };

  const handleSubmit = (e) => {
    console.log('submited');
    e.preventDefault();
    if (validate()) {
      updateData(activities);
      submitForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card activities-form">
      <h2 className="form-title">Extracurricular Activities</h2>
      <p className="form-subtitle">Add your volunteer work, clubs, or other activities (optional)</p>
      
      {activities.map((act, index) => (
        <div key={index} className="activity-item card">
          <div className="card-header">
            <FaUsers className="icon" />
            <h3>Activity #{index + 1}</h3>
            {activities.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeActivity(index)}
                className="btn-remove"
              >
                <FaMinus />
              </button>
            )}
          </div>
          
          <div className="form-group">
            <label>Activity Name</label>
            <input
              type="text"
              name="name"
              value={act.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., Volunteer at Animal Shelter"
            />
          </div>
          
          <div className="form-group">
            <label>Position/Role</label>
            <input
              type="text"
              name="position"
              value={act.position}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., Team Leader, Volunteer"
            />
          </div>
          
          <div className="form-group">
            <label>Description {act.name.trim() && '*'}</label>
            <textarea
              name="description"
              value={act.description}
              onChange={(e) => handleChange(index, e)}
              rows={3}
              className={errors[index]?.description ? 'error' : ''}
              placeholder="Describe your role and contributions"
            />
            {errors[index]?.description && (
              <span className="error-message">{errors[index].description}</span>
            )}
          </div>
        </div>
      ))}
      
      <div className="add-more-container">
        <button 
          type="button" 
          onClick={addActivity}
          className="btn-add-more"
        >
          <FaPlus /> Add Another Activity
        </button>
      </div>
      
      <div className="form-navigation">
        <button type="button" onClick={prevStep} className="btn-secondary">
          ← Back
        </button>
        <button type="submit" className="btn-primary">
          Submit & Preview Resume
        </button>
      </div>
    </form>
  );
};

export default Activities;