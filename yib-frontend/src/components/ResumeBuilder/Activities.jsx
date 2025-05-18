import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaUsers } from 'react-icons/fa';
import './FormStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateResume, updateStep } from '../../store/resumeSlice';

const Activities = ({submitForm}) => {
  const currentStep=useSelector((state)=>state.resume.currentStep);
  const activitiesss=useSelector((state)=>state.resume.resume.activities);
  const [activities, setActivities] = useState(activitiesss);
  const [errors, setErrors] = useState([]);

  
const handleChange = (index, e) => {
  const { name, value, type, checked } = e.target;
  setActivities((prevActivities) =>
    prevActivities.map((activity, i) =>
      i === index
        ? { ...activity, [name]: type === 'checkbox' ? checked : value }
        : activity
    )
  );
};

 const stepUpdate=(mov)=>{
    if(mov=='prev')
      dispatch(updateStep(currentStep-1));
    dispatch(updateResume(['activities', activities]));
  }

  useEffect(() => {
      if (activitiesss) {
        setActivities(activitiesss);
        
      }
    }, [activitiesss]);
  
  const dispatch=useDispatch();

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
dispatch(updateResume(['activities', activities]));      
submitForm();
    }
  };

  

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md space-y-6">
  <h2 className="text-2xl font-semibold text-gray-800">Extracurricular Activities</h2>
  <p className="text-sm text-gray-600">Add your volunteer work, clubs, or other activities (optional)</p>

  {activities.map((act, index) => (
    <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 font-medium">
          <FaUsers className="text-lg" />
          <h3 className="text-lg font-semibold">Activity #{index + 1}</h3>
        </div>
        {activities.length > 1 && (
          <button
            type="button"
            onClick={() => removeActivity(index)}
            className="text-white hover:bg-slate-700 bg-slate-700 "
          >
            <FaMinus />
          </button>
        )}
      </div>

      {/* Activity Name */}
      <div className="flex flex-col pr-6 gap-x-6">
      <label className="block text-sm font-semibold text-slate-700 mb-1">Activity Name</label>
        <input
          type="text"
          name="name"
          value={act.name}
          onChange={(e) => handleChange(index, e)}
          placeholder="e.g., Volunteer at Animal Shelter"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Position/Role */}
      <div className="flex flex-col pr-6 gap-x-6">
      <label className="block text-sm font-semibold text-slate-700 mb-1">Position/Role</label>
        <input
          type="text"
          name="position"
          value={act.position}
          onChange={(e) => handleChange(index, e)}
          placeholder="e.g., Team Leader, Volunteer"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col pr-6 gap-x-6">
      <label className="block text-sm font-semibold text-slate-700 mb-1"> Description {act.name.trim() && <span className="text-red-600"></span>}
        </label>
        <textarea
          name="description"
          value={act.description}
          onChange={(e) => handleChange(index, e)}
          rows={5}
          placeholder="Describe your role and contributions"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors[index]?.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        
          <span className={`text-sm mt-1  ${errors[index]?.description ?'text-red-600':'invisible'} `}>{errors[index]?.description}</span>
        
      </div>













      











    </div>
  ))}

  {/* Add More Button */}
  <div className="flex justify-center">
    <button
      type="button"
      onClick={addActivity}
      className="flex items-center gap-2 px-4 py-2 text-white bg-slate-800 rounded-md hover:bg-slate-700"
    >
      <FaPlus /> Add Another Activity
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
      Submit & Preview Resume
    </button>
  </div>
</form>

  );
};

export default Activities;