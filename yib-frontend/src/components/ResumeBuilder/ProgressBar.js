import React from 'react';
import './FormStyles.css';

const ProgressBar = ({ currentStep, totalSteps = 6 }) => {
  const steps = [
    'Personal Info',
    'Education',
    'Experience',
    'Skills',
    'Projects',
    'Activities'
  ];
  
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="steps">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`step ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''}`}
          >
            <div className="step-number">
              {index + 1 < currentStep ? (
                <span className="checkmark">✓</span>
              ) : (
                index + 1
              )}
            </div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;