import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaBriefcase } from 'react-icons/fa';
import './FormStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateResume, updateStep } from '../../store/resumeSlice';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';


const WorkExperience = () => {
  const expericencesss=useSelector((state)=>state.resume.resume.experiences);
  const currentStep=useSelector((state)=>state.resume.currentStep);
  const dispatch=useDispatch();
  const [experiences, setExperiences] = useState(expericencesss);
  const [errors, setErrors] = useState([]);
 const stepUpdate=(mov)=>{
    if(mov=='prev')
      dispatch(updateStep(currentStep-1));
    dispatch(updateResume(['experiences', experiences]));
  }
  

  const handleDateChange = (index, date, field) => {
  const updatedExperiences = [...experiences];
  updatedExperiences[index][field] = date;
  setExperiences(updatedExperiences);
};
 

const handleChange = (index, e) => {
  const { name, value, type, checked } = e.target;
  setExperiences(prevExperiences =>
    prevExperiences.map((exp, i) => {
      if (i !== index) return exp;
      const updatedExp = {
        ...exp,
        [name]: type === 'checkbox' ? checked : value,
      };
      if (name === 'current') {
        updatedExp.endDate = checked ? 'Present' : '';
      }
      console.log("Update exp : ",updatedExp);
      return updatedExp;
    })
  );
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

      if (
      exp.startDate &&
      exp.endDate &&
      exp.endDate !== 'Present' &&
      new Date(exp.endDate) < new Date(exp.startDate)
    ) {
      expErrors.endDate = 'End date cannot be earlier than start date';
    }
      return expErrors;
    });
    
    setErrors(newErrors);
    return newErrors.every(err => Object.keys(err).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateResume(['experiences',experiences]));
      dispatch(updateStep(currentStep+1));
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Work Experience</h2>
      <p className="text-gray-600">List your relevant work experience</p>
      
      {experiences.map((exp, index) => (
        <div key={index} className="p-6 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FaBriefcase className="text-xl text-blue-600" />
              <h3 className="text-lg font-medium">Experience #{index + 1}</h3>
            </div>
            {experiences.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeExperience(index)}
                className="text-white hover:bg-slate-700 bg-slate-800" 
              >
                <FaMinus />
              </button>
            )}
          </div>





          <div className="flex flex-row gap-x-6 gap-y-4">
  <div className="w-full flex flex-col pr-6">
    <label htmlFor={`company-${index}`} className="block text-sm font-semibold text-slate-700 mb-1">Company *</label>
    <input
      id={`company-${index}`}
      type="text"
      name="company"
      value={exp.company}
      onChange={(e) => handleChange(index, e)}
      className={`mb-0 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
        errors[index]?.company ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    <p className="h-5 mt-1 text-sm text-red-600">{errors[index]?.company || ''}</p>
  </div>

  <div className="w-full flex flex-col pr-6">
    <label htmlFor={`position-${index}`} className="block text-sm font-semibold text-slate-700 mb-1">Position *</label>
    <input
      id={`position-${index}`}
      type="text"
      name="position"
      value={exp.position}
      onChange={(e) => handleChange(index, e)}
      className={`mb-0 box-border w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
        errors[index]?.position ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    <p className="h-5 mt-1 text-sm text-red-600">{errors[index]?.position || ''}</p>
  </div>
</div>


         











<div className="flex md:flex-row flex-col md:gap-x-6 gap-y-3 md:items-center">
            <div className="w-full pr-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="month"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleChange(index, e)}
                className={`mb-0 box-border w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[index]?.startDate ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                }`}
              />
              {errors[index]?.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors[index].startDate}</p>
              )}
            </div>

            <div className="w-full pr-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="month"
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleChange(index, e)}
                disabled={exp.current}
                className={`mb-0 box-border w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[index]?.endDate ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                }`}
              />
              {errors[index]?.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors[index].endDate}</p>
              )}
            </div>

            <div className="w-full flex md:items-center md:align-bottom items-end pt-5 ">
  <input
  id={`current-${index}`}
  type="checkbox"
  name="current"
  checked={exp.current}
                  onChange={(e) => handleChange(index, e)}

  className="mb-0 box-border mr-2"
/>
<label htmlFor={`current-${index}`} className="text-sm text-gray-700">
  I currently work here
</label>
</div>

          </div>

      <div className="mt-4 flex flex-col pr-6 gap-x-6">
      <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              id={`description-${index}`}
              name="description"
              value={exp.description}
              onChange={(e) => handleChange(index, e)}
              rows={4}
              placeholder="Describe your responsibilities and achievements"
          className={'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300'}
            />
            <p className="mt-2 text-sm text-gray-500">Use bullet points for better readability (e.g., • Managed team of 5 developers)</p>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button 
          type="button" 
          onClick={addExperience}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
        >
          <FaPlus /> Add Another Experience
        </button>
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={()=>stepUpdate('prev')} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
          ← Back
        </button>
        <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700">
          Next: Skills <span className="ml-2">→</span>
        </button>
      </div>
    </form>
  );
};

export default WorkExperience;