// components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center mt-20 gap-4 flex-wrap">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 disabled:opacity-50"
        aria-label="Go to previous page"
      >
        Previous
      </button>
      <span className="py-2 px-4">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 disabled:opacity-50"
        aria-label="Go to next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
