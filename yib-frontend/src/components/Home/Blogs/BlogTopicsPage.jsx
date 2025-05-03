import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaJava, FaReact } from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";
import { VscAzure } from "react-icons/vsc";
import { TbSql } from "react-icons/tb";
import { AiOutlineDotNet } from "react-icons/ai";
import {motion} from 'framer-motion';
import hoverAnimation from '../../../utils/animation'
// Normalize topic names for consistency (optional)
const normalizeTechName = (name) =>
  name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z]/gi, "");

const techIconMap = {
  java: <FaJava size={50} />,
  react: <FaReact size={50} />,
  sql: <TbSql size={50} />,
  azure: <VscAzure size={50} />,
  dotnet: <AiOutlineDotNet size={50} />
};


const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

const BlogTopicsPage = () => {
  const topics = useSelector((state) => state.blogs.topics);

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📚 Explore Blog Topics</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {topics &&
          topics.map((topic) => {
            const normalizedTopic = normalizeTechName(topic);
            const icon = techIconMap[normalizedTopic] || (
              <MdHelpOutline size={50} />
            );

            return (
              <motion.div variants={hoverAnimation()} initial="initial" whileHover="animate" >
              <Link
                key={topic}
                to={`/blogs/${slugify(topic)}`}
                className="group bg-slate-100 no-underline px-6 py-8 rounded-xl text-center shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 font-semibold text-gray-900 dark:text-black flex flex-col items-center"
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </span>
                <span className="no-underline text-lg mt-3">{topic}</span>
              </Link> </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default BlogTopicsPage;
