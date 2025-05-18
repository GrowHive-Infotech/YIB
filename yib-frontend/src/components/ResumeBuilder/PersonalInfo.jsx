

import React, { useState, useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateResume, updateStep } from '../../store/resumeSlice';

const PersonalInfo = () => {
  const dispatch = useDispatch();

  
  console.log("Printing")
  const personalInformation = useSelector((state) => state.resume.resume.personalInfo);
   
  const [personalInfoData, setPersonalInfoData] = useState(personalInformation || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    linkedin: '',
    github: '',
    portfolio: '',
    photo: '',
    filename:''
  });
  const [photoPreview, setPhotoPreview] = useState(personalInfoData.photo || '');
const fileInputRef = useRef(null);

const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setPersonalInfoData((prev) => ({ ...prev, photo: reader.result,filename:file.name }));
      };
      reader.readAsDataURL(file);
    }
  };
  const [errors, setErrors] = useState({});

  // Update local state when personalInformation changes
  useEffect(() => {
    if (personalInformation) {
      setPersonalInfoData(personalInformation);
      
    }
  }, [personalInformation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfoData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!personalInfoData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!personalInfoData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!personalInfoData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfoData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!personalInfoData.linkedin.trim()) newErrors.linkedin = 'Linkedin is required';
    if (!personalInfoData.github.trim()) newErrors.github = 'Github is required';
    if (!personalInfoData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!personalInfoData.summary.trim()) newErrors.summary = 'Summary is required';
    if (!personalInfoData.photo) newErrors.photo = 'Photo is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const currentStep = useSelector((state) => state.resume.currentStep);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateResume(['personalInfo', personalInfoData]));
      dispatch(updateStep(currentStep + 1));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-3">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">👤 Personal Information</h2>

      {/* First Name and Last Name */}
      <div className="flex flex-row gap-x-6 gap-y-4">
        <div className="w-full pr-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">First Name *</label>
          <input
            name="firstName"
            type="text"
            className={`mb-0 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.firstName ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
            }`}
            value={personalInfoData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div className="w-full pr-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Last Name *</label>
          <input
            name="lastName"
            type="text"
            className={`mb-0 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.lastName ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
            }`}
            value={personalInfoData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email and Phone */}
      <div className="flex flex-row gap-x-6 gap-y-4">
        <div className="w-full pr-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email *</label>
          <input
            name="email"
            type="email"
            className={`mb-0 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
            }`}
            value={personalInfoData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="w-full pr-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Phone *</label>
          <input
            name="phone"
            type="tel"
            className={`mb-0 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.phone ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
            }`}
            value={personalInfoData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Address */}
      <div className="flex flex-col pr-6 gap-x-6">
        <label className="block text-sm font-semibold text-slate-700 mb-1">Address</label>
        <input
          name="address"
          type="text"
          className="mb-0 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={personalInfoData.address}
          onChange={handleChange}
        />
      </div>

      {/* LinkedIn, GitHub, Portfolio */}
      <div className="flex md:flex-row flex-col md:gap-6 gap-y-5">
        <div className="flex flex-col pr-6 gap-x-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">LinkedIn *</label>
          <input
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            className="w-full mb-0 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={personalInfoData.linkedin}
            onChange={handleChange}
          />
          {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>}
        </div>
        <div className="flex flex-col pr-6 gap-x-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">GitHub *</label>
          <input
            name="github"
            type="url"
            placeholder="https://github.com/yourusername"
            className="mb-0 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={personalInfoData.github}
            onChange={handleChange}
          />
          {errors.github && <p className="text-red-500 text-sm mt-1">{errors.github}</p>}
        </div>
        <div className="flex flex-col pr-6 gap-x-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Portfolio</label>
          <input
            name="portfolio"
            type="url"
            placeholder="https://yourportfolio.com"
            className="mb-0 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={personalInfoData.portfolio}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="flex flex-col pr-6 gap-x-6">
        <label className="block text-sm font-semibold text-slate-700 mb-1">Summary *</label>
        <textarea
          name="summary"
          rows={4}
          className={`mb-0 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.summary ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
          }`}
          value={personalInfoData.summary}
          onChange={handleChange}
        />
        {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
        <p className="text-xs text-gray-500 mt-1">Write a brief overview of your experience and strengths.</p>
      </div>



<div className="flex flex-col pr-6 gap-x-6">
  <label className="block text-sm font-semibold text-slate-700 mb-1">Photo</label>
  <div className="flex items-center">
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={handleFileChange}
      className="hidden"
    />
    <button
      type="button"
      onClick={() => fileInputRef.current.click()}
      className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-lg"
    >
      Choose File
    </button>
    <span className="ml-4 text-sm text-gray-600">
      {personalInfoData.filename || 'No file chosen'}
    </span>
  </div>
  {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
        {photoPreview && (
  <img
    src={photoPreview}
    alt="Photo Preview"
    className="mt-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-cover rounded-lg"
  />
)}
</div>



      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200"
        >
          Next: Education <span className="ml-2">→</span>
        </button>
      </div>
    </form>
  );
};

export default PersonalInfo;
