import React from 'react'

function Skeleton() {
  return (
    <div className="space-y-4 animate-pulse">
    <div className="h-32 bg-gray-200 rounded-lg "></div>
    <div className="h-6 bg-gray-200 rounded  w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded  w-5/6"></div>
    <div className="h-4 bg-gray-200 rounded  w-2/3"></div>
  </div>
  )
}

export default Skeleton