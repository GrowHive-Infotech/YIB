import React from 'react'
import { Link } from 'react-router-dom';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
function TopJobsSection() {
  const jobs=useSelector((state)=>state.jobs.jobs);
  
  return (
    <div className="my-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 ">🔥 Top Job Picks</h2>

        
        <Link
          to={`/jobs/all`}
          className="hidden sm:block px-6 mr-10 py-2 no-underline bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          See All Jobs →
        </Link>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.slice(0, 5).map((job, index) => (
          <JobCard key={index} job={job}/>
        ))}
      </div>
      <div className="flex justify-end items-center">
      <Link
          to={`/jobs/all`}
          className="sm:hidden mt-3  block px-6 py-2 no-underline bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          See All Jobs →
        </Link>
        </div>
    </div>
  )
}

export default TopJobsSection

  