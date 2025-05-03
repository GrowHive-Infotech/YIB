import React from 'react';
import { Link } from 'react-router-dom';

function JobCard({ job }) {
  return (
    <div className="border rounded-lg p-5 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-all duration-200">
      <div className="mb-3">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {job.jobTitle}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {job.companyName} • {job.location}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          {job.employmentType}
        </p>
      </div>

      {/* <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        {job.description.slice(0, 120)}...
      </p> */}

      {job.skillsRequired && job.skillsRequired.length > 0 && (
        <div className='md:min-h-12 md:h-12'>
        <div className="flex flex-wrap gap-x-3 gap-y-2 ">
          {job.skillsRequired.slice(0,8).map((skill, index) => (
            <span
              key={index}
              className="flex justify-center items-center bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-xs font-medium px-3 py-1 rounded-lg"
            >
              {skill}
            </span>
          ))}
        </div>
        </div>
      )}

      <Link
        to={`/jobs/${job.id}`}
        className="mt-6 inline-block px-4 py-2 bg-slate-800 text-white text-sm rounded-md hover:bg-slate-700 transition no-underline"
      >
        View Details
      </Link>
    </div>
  );
}

export default JobCard;
