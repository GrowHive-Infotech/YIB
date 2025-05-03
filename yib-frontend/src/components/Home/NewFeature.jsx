import { useEffect, useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../store/modalSlice';

const NewFeature = () => {
  const [isVisible, setIsVisible] = useState(true);
  const  currentUser=useSelector((state)=>state.auth.user);
  const dispatch=useDispatch();

  // Show the component after the page has loaded
//   useEffect(() => {
//     // Trigger the animation after component mounts
//     const timer = setTimeout(() => setIsVisible(true), 500);
//     return () => clearTimeout(timer);
//   }, []);

  return (
    <div
      className={`w-full flex justify-start transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div
        className="ml-4 mt-8 max-w-4xl px-6 py-6 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 dark:from-yellow-500/80 dark:to-yellow-400/80 shadow-lg ring-1 ring-black/10 dark:ring-white/10 text-black dark:text-gray-900 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f3f4f6, #f9fafb)', // Subtle light gradient background
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow
        }}
      >
        {/* Background blur for professionalism */}
        <div className="absolute inset-0 bg-opacity-50 backdrop-blur-lg"></div>

        {/* Sparkles Icon */}
        <div className="absolute top-[-10px] left-[-10px] opacity-30 animate-spin-slow">
          <SparklesIcon className="h-16 w-16 text-yellow-600 dark:text-yellow-300" />
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <p className="text-lg font-semibold flex items-center gap-2">
              ✨ Introducing{' '}
              <span className="underline underline-offset-2 decoration-yellow-700 dark:decoration-yellow-200">
                Resume Builder
              </span>
            </p>
            <p className="text-sm mt-1 text-gray-800 dark:text-gray-100">
              Create stunning, professional resumes in minutes — powered by AI & designed to impress.
            </p>
          </div>

          {/* Button */}
          <Link
            to={"/resume"}
           
            className="mt-2 sm:mt-0 inline-block no-underline lg:px-6 px-3 py-3 bg-black text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:shadow-xl hover:bg-gray-800 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            🚀 Build Yours Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewFeature;
