import React, { useEffect, useState, useMemo } from 'react';
import JobCard from './JobCard';
import Pagination from './Pagination';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AllJobsPage = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams(); // URL param like /blogs/:topic

  const getCurrentPage = () =>
    Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
  const page = getCurrentPage();

  const [paginatedJobs, setPaginatedJobs] = useState([]);
  const alljobs = useSelector((state) => state.jobs.jobs);
  const inputSkills = useSelector((state) => state.jobs.skills);

  // Memoize the matched jobs calculation so it doesn't run on every render
  const matchedJobs = useMemo(() => {
    if (category !== 'skills') return [];

    // Calculate matched jobs based on the skills
    return alljobs
      .map((job) => {
        const jobSkills = job.skillsRequired;
        const matchedSkills = inputSkills.filter((skill) =>
          jobSkills.includes(skill)
        );
        const matchPercent = (matchedSkills.length / inputSkills.length) * 100;

        if (matchPercent > 20) {
          return { ...job, matchPercent: Math.round(matchPercent * 100) / 100 };
        }

        return null; // If job does not match, return null
      })
      .filter((job) => job !== null) // Filter out jobs that do not match
      .sort((a, b) => b.matchPercent - a.matchPercent); // Sort by match percentage
  }, [ alljobs, inputSkills]); // Only recompute when these change

  // Determine the jobs to display based on category
  const jobs = category === 'all' ? alljobs : matchedJobs;

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
  }, [searchParams, setSearchParams, jobs]); // Dependencies now include jobs

  const totalPages = Math.max(1, Math.ceil(jobs.length / jobsPerPage));

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">📚 Explore {category=='all'?'All Jobs' : 'Jobs Matched on Skills'}</h1>

      {paginatedJobs.length > 0 ? (
  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {paginatedJobs.map((job) => (
      <JobCard key={job.jobUrl || job.id} job={job} />
    ))}
  </div>
) : (
  <div className="text-center text-gray-500 text-lg mt-10">
    🚫 No jobs found.
  </div>
)}

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
