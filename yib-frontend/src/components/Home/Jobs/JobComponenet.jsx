import React from 'react'
import {JobSearchBox, TopJobsSection} from './index'

function JobComponenet() {
  return (
    <>
    <div className="text-center mt-8 ">
          <h1 className="text-4xl font-bold text-gray-800">Find Your Dream Job</h1>
        </div>
        <JobSearchBox/>
        <TopJobsSection/>
        </>
      
  )
}

export default JobComponenet