import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import Pagination from './Pagination';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AllJobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams(); // URL param like /blogs/:topic
  
  const getCurrentPage = () =>
    Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
  const page = getCurrentPage();

  const [paginatedJobs, setPaginatedJobs] = useState([]);
  let jobs=null;
  const alljobs=useSelector((state)=>state.jobs.jobs);
  if(category=='all')
  {
   jobs=alljobs
  }
  
  const jobsPerPage = 8;

  useEffect(() => {
    const currentPage = getCurrentPage();

    const start = (currentPage - 1) * jobsPerPage;
    const end = start + jobsPerPage;

    if (start >= jobs.length && jobs.length > 0) {
      const lastPage = Math.ceil(jobs.length / jobsPerPage);
      setSearchParams({ page: lastPage.toString() });
      return;
    }

    setPaginatedJobs(jobs.slice(start, end));
  }, [searchParams, setSearchParams]);

  const totalPages = Math.max(1, Math.ceil(jobs.length / jobsPerPage));

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">📚 Explore All Jobs</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {paginatedJobs.map((job) => (
          <JobCard key={job.jobUrl} job={job} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
};

export default AllJobsPage;
