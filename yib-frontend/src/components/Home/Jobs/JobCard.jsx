import React from 'react';
import { Link } from 'react-router-dom';

function JobCard({ job }) {
  const matchPercent = job.matchPercent; // Default to 0 if undefined

  // Calculate stroke offset based on match percentage
  const radius = 21; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeOffset = circumference - (circumference * matchPercent) / 100; // Adjust the stroke offset based on the match percentage

  return (
    <div className="relative border rounded-lg p-5 bg-white dark:bg-white  shadow hover:shadow-lg transition-all duration-200">
      {/* Match Percentage Circular Progress Indicator */}
      {matchPercent !== undefined && (
        <div className="flex flex-col items-center absolute top-4 right-4 z-10">
          <span className="text-sm text-gray-700   font-bold mr-1">Match</span>
          <svg
            width="60"
            height="60"
            viewBox="0 0 50 50"
            className="w-12 h-12"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Circle (Static, Gray) */}
            <circle
              cx="25"
              cy="25"
              r={radius}
              stroke="#e6e6e6" // Light gray for the background
              strokeWidth="4"
              fill="none"
            />
            {/* Foreground Circle (Progress Circle, Dynamic Green) */}
            <circle
              cx="25"
              cy="25"
              r={radius}
              stroke="#4caf50" // Green color for the match percentage
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference} // Full circumference of the circle
              strokeDashoffset={strokeOffset} // Offset the stroke based on the percentage
              style={{
                transition: "stroke-dashoffset 0.5s ease", // Smooth transition when the percentage changes
              }}
            />
            {/* Text Showing Match Percentage */}
            <text
              x="25"
              y="30"
              fontSize="12"
              textAnchor="middle"
              fill="#4caf50"
              fontWeight="bold"
            >
              {matchPercent}%
            </text>
          </svg>
        </div>
      )}

      <div className="mb-3 ">
        <h3 className="md:text-lg text-sm lg:text-xl  font-semibold text-gray-800 ">
          {job.jobTitle}
        </h3>
        <p className="text-sm text-gray-500  mt-1">
          {job.companyName} • {job.location}
        </p>
        <p className="text-sm text-gray-400  mt-1">
          {job.employmentType}
        </p>
      </div>

      {job.skillsRequired && job.skillsRequired.length > 0 && (
        <div className="md:min-h-12 md:h-12">
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {job.skillsRequired.slice(0, 8).map((skill, index) => (
              <span
                key={index}
                className="flex justify-center items-center bg-indigo-100 text-indigo-800  text-xs font-medium px-3 py-1 rounded-lg"
              >
                {skill}
              </span>
            ))}
            {job.skillsRequired.length > 8 && (
              <span className="text-xs text-gray-500 ">
                +{job.skillsRequired.length - 8} more
              </span>
            )}
          </div>
        </div>
      )}

      <Link
        to={job.jobUrl}
        className="mt-6 inline-block px-4 py-2 bg-slate-800 text-white text-sm rounded-md hover:bg-slate-700 transition no-underline"
      >
        Apply Now
      </Link>
    </div>
  );
}

export default JobCard;
