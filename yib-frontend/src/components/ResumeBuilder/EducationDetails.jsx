
import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus, FaUniversity } from 'react-icons/fa';
import { useSelector ,useDispatch} from 'react-redux';
import { updateResume, updateStep } from '../../store/resumeSlice';

const EducationDetails = () => {
  const mandatoryEducations = [
    { label: 'Undergraduate (UG)', institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '', gpa: '', current: false },
    { label: '12th Grade', institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '', gpa: '', current: false },
    { label: '10th Grade', institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '', gpa: '', current: false },
  ];


const currentStep=useSelector((state)=>state.resume.currentStep);
const educationDetails=useSelector((state)=>state.resume.resume.educationDetails);
// const additionalEducations=useSelector((state)=>state.resume.educationDetails.additionalEducations)
const dispatch=useDispatch();
  const stepUpdate=(mov)=>{
    if(mov=='prev')
      dispatch(updateStep(currentStep-1));
    dispatch(updateResume(['educationDetails', educations]));
  }
  const [educations, setEducations] = useState(mandatoryEducations);
  const [errors, setErrors] = useState([]);

  





const handleChange = (index, e) => {
  const { name, value, type, checked } = e.target;
  setEducations((prevEducations) =>
    prevEducations.map((edu, i) => {
      if (i !== index) return edu;
      const updatedEdu = {
        ...edu,
        [name]: type === 'checkbox' ? checked : value,
      };
      if (name === 'current') {
        updatedEdu.endDate = checked ? 'Present' : '';
      }
      console.log("Update exp : ",updatedEdu);
      return updatedEdu;
    })
  );
};


  const addEducation = () => {
    setEducations([
      ...educations,
      { label: '', institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '', gpa: '', current: false },
    ]);
  };

  const removeEducation = (index) => {
    if (index >= mandatoryEducations.length) {
      const updated = [...educations];
      updated.splice(index, 1);
      setEducations(updated);
    }
  };

   useEffect(() => {
    if (educationDetails.length>=3) {
      setEducations(educationDetails);
      
    }
  }, [educationDetails]);

  const validate = () => {
  console.log("validating");
  const newErrors = educations.map((edu, index) => {
    const err = {};
    if (!edu.institution.trim()) err.institution = 'Institution is required';
    if (!edu.degree.trim() && (index !== 1 && index !== 2)) err.degree = 'Degree is required';
    if (!edu.startDate.trim()) err.startDate = 'Start date is required';
    if (!edu.endDate.trim() && !edu.current) err.endDate = 'End date is required unless currently studying';
    if (!edu.fieldOfStudy.trim()) err.fieldOfStudy = 'Field of study is required';
    if (!edu.gpa.trim()) err.gpa = 'GPA is required';

    // Date comparison validation
    if (
      edu.startDate &&
      edu.endDate &&
      edu.endDate !== 'Present' &&
      new Date(edu.endDate) < new Date(edu.startDate)
    ) {
      err.endDate = 'End date cannot be earlier than start date';
    }

    return err;
  });

  setErrors(newErrors);
  return newErrors.every((e) => Object.keys(e).length === 0);
};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateResume(['educationDetails', educations]));
            dispatch(updateStep(currentStep + 1));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Education Details</h2>
        <p className="text-sm text-gray-500">List your academic background</p>
      </div>

      {educations.map((edu, index) => (
        <div key={index} className="border border-gray-200 p-6 rounded-lg space-y-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <FaUniversity className="text-blue-600" />
              <span>{edu.label || `Education #${index + 1}`}</span>
            </div>
            {index >= mandatoryEducations.length && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-white hover:bg-slate-700 bg-slate-800 p-2 rounded"
              >
                <FaMinus />
              </button>
            )}
          </div>

          <div className="flex flex-row gap-x-6 gap-y-4">
            <div className="w-full pr-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Institution <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="institution"
                value={edu.institution}
                onChange={(e) => handleChange(index, e)}
                className={`mb-0 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[index]?.institution ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                }`}
              />
              {errors[index]?.institution && (
                <p className="text-red-500 text-sm mt-1">{errors[index].institution}</p>
              )}
            </div>

           {index!=1 && index!=2 && <div className="w-full pr-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Degree <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleChange(index, e)}
                className={`mb-0 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[index]?.degree ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                }`}
              />
              {errors[index]?.degree && (
                <p className="text-red-500 text-sm mt-1">{errors[index].degree}</p>
              )}
            </div>}
          </div>




<div className="flex flex-row gap-x-6 gap-y-4">
            <div className="w-full pr-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Field Of Study <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fieldOfStudy"
              value={edu.fieldOfStudy}
              onChange={(e) => handleChange(index, e)}
                className={`mb-0 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[index]?.fieldOfStudy ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                }`}
              />
              {errors[index]?.fieldOfStudy && (
                <p className="text-red-500 text-sm mt-1">{errors[index].fieldOfStudy}</p>
              )}
            </div>

            <div className="w-full pr-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                GPA <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="gpa"
                value={edu.gpa}
                onChange={(e) => handleChange(index, e)}
                placeholder="e.g. 3.8"
                className={`mb-0 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[index]?.gpa ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                }`}
              />
              {errors[index]?.gpa && (
                <p className="text-red-500 text-sm mt-1">{errors[index].gpa}</p>
              )}
            </div>
          </div>




          
          <div className="flex md:flex-row flex-col md:gap-x-6 gap-y-3">
            <div className="w-full pr-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="month"
                name="startDate"
                value={edu.startDate}
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
                value={edu.endDate}
                onChange={(e) => handleChange(index, e)}
                disabled={edu.current}
                className={`mb-0 box-border w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[index]?.endDate ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                }`}
              />
              {errors[index]?.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors[index].endDate}</p>
              )}
            </div>

            {(index==0 || index >= mandatoryEducations.length) && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="current"
                checked={edu.current}
                onChange={(e) => handleChange(index, e)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">Currently Studying</label>
            </div>
          )}

          </div>

          <div className="flex flex-col pr-6 gap-x-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              name="description"
              value={edu.description}
              onChange={(e) => handleChange(index, e)}
              rows={5}
              placeholder="Achievements, honors, or coursework"
              className="mb-0 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          
        </div>
      ))}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-2 px-4 py-2 border bg-slate-800 border-white text-white rounded-md hover:bg-slate-700 transition"
        >
          <FaPlus /> Add Another Education
        </button>
      </div>


      <div className="flex justify-between pt-6 border-t border-gray-200">
         <button
          type="button"
          onClick={()=>stepUpdate('prev')}
          className="px-6 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-200"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-slate-800 text-white font-semibold rounded hover:bg-slate-700"
        >
          Next: Work Experience →
        </button>
      </div>
    </form>
  );
};

export default EducationDetails;

      