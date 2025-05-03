import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import dayjs from 'dayjs';
import { format } from 'date-fns';
const fallbackImage = "https://images.pexels.com/photos/30327991/pexels-photo-30327991/free-photo-of-historic-fort-in-okzitanien-france.jpeg";


const TopBlogs = () => {
  const blogsTop=useSelector((state)=>state.blogs.blogs).slice(0,5);
// console.log(blogsTop);

  const dispatch=useDispatch();
  const currentUser=useSelector((state)=>state.auth.user);

  const displayDate=(dateee)=>{
    const formattedDate = format(new Date(dateee), 'MMMM d, yyyy');
    return formattedDate
  }
  return (
    <div className=" mt-3 border-2 border-black bg-slate-50 box-border  rounded-xl shadow p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 ">🔥 Top Blog Picks</h2>

        
        <Link
          to="/blogs"
          className="hidden sm:block mr-10 px-6 py-2 no-underline bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          See All Blogs →
        </Link>
      </div>
      
      <div className="space-y-6">
        {blogsTop && blogsTop.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-50 gap-x-4  flex items-start justify-between gap-4 rounded-md p-4 border border-gray-300  shadow-sm hover:shadow-md hover:bg-gray-100  transition-all"
          >
            
            <div className="shrink-0">
              <img
                src={fallbackImage}
                alt={blog.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
                className="w-24 h-20 object-cover rounded-md"
              />
            </div>

           
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div
                  className="text-lg font-semibold text-gray-800  no-underline hover:no-underline"
                >
                  {blog.title}
                </div>
                <p className="text-sm text-gray-500  mt-1">{displayDate(blog.createday)}</p>
              </div>
            </div>

           
            <div className="flex items-center">
              <Link
                          to={`/blog/${blog.id}`} 
                          
                          className="no-underline inline-block px-4 py-2 bg-slate-700 text-white text-sm rounded-md hover:bg-slate-800 transition"
                        >
                          Read Full →
                        </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end items-center">
      <Link
          to="/blogs"
          className=" mt-3 sm:hidden block px-6 py-2 no-underline bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          See All Blogs →
        </Link>
        </div>

     
    </div>
  );
};

export default TopBlogs;
