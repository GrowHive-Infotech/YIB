import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleForm } from '../../../store/modalSlice';
import { format } from 'date-fns';
// import './scrollbar.css'; // If you use scrollbar-hidden styles

function BlogCard({ blog }) {
  const displayDate=(dateee)=>{
      const formattedDate = format(new Date(dateee), 'MMMM d, yyyy');
      return formattedDate
    }
  const fallbackImage = "https://images.pexels.com/photos/30327991/pexels-photo-30327991/free-photo-of-historic-fort-in-okzitanien-france.jpeg";
  const currentUser=useSelector((state)=>state.auth.user);
  const dispatch=useDispatch();
  console.log(currentUser)
  return (
    <div className="duration-300 cursor-pointer  hover:-translate-y-1 transform hover:bg-slate-50 m-1 bg-white dark:bg-gray-800 flex flex-col justify-between rounded-md p-4 border border-gray-200 dark:border-gray-700 shadow hover:shadow-2xl transition-all ">
      
        <img
          src={blog.imageUrl || fallbackImage}
          alt={`Image for ${blog.title}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
          className="w-full h-48 object-cover rounded-md mb-4"
        />

      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="no-underline text-lg font-semibold text-gray-800 dark:text-white hover:no-underline">
            {blog.title}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{displayDate(blog.createday)}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {blog.description}
          </p>
        </div>

        <div className="mt-4">
          <Link
            to={`/blog/${blog.id}`} 
            
            className="no-underline inline-block px-4 py-2 bg-slate-700 text-white text-sm rounded-md hover:bg-slate-800 transition"
          >
            Read Full →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
