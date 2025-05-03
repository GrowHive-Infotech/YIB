import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogCard } from './index';
import { useSelector } from "react-redux";


const BLOGS_PER_PAGE = 6;

const BlogsTopicWiseSection = () => {
  const { topic } = useParams(); // URL param like /blogs/:topic
  console.log(topic);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = Math.max(parseInt(pageParam || "1", 10), 1);

  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [paginatedBlogs, setPaginatedBlogs] = useState([]);
  const allBlogs=useSelector((state)=>state.blogs.blogs);
  useEffect(() => {
    if (!topic) return;

    const normalizedTopic = topic.toLowerCase();
    const filtered = allBlogs && allBlogs.filter(
      (blog) => blog.technology.toLowerCase() === normalizedTopic
    );
    setFilteredBlogs(filtered);
  }, [allBlogs,topic]);

  useEffect(() => {
    const start = (page - 1) * BLOGS_PER_PAGE;
    const end = start + BLOGS_PER_PAGE;

    // Adjust page if it's out of bounds
    if (start >= filteredBlogs.length && filteredBlogs.length > 0) {
      const lastPage = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
      setSearchParams({ page: lastPage.toString() });
      return;
    }

    setPaginatedBlogs(filteredBlogs.slice(start, end));
  }, [filteredBlogs, page, setSearchParams]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE));

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 capitalize">📝 {topic} Blogs</h1>

      {paginatedBlogs.length > 0 ? (
  <div className="grid grid-rows-1 md:grid-cols-3 sm:grid-cols-2  gap-6 px-2 md:px-0">
    {paginatedBlogs && paginatedBlogs.map((blog) => (
      <BlogCard key={blog.id} blog={blog} />
    ))}
  </div>
) : (
  <p>No blogs found under this topic.</p>
)}

      {totalPages > 1 && (
        <div className="flex justify-center mt-20 gap-4 flex-wrap ">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-slate-800  rounded hover:bg-slate-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="py-2 px-4">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-slate-800  rounded hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogsTopicWiseSection;
