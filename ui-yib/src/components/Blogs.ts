// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import "./BlogPost.css";

// interface Article {
//     id: string;
//     title: string;
//     description: string;
//     author: string;
//     createday: string;
//     updateday: string;
//     lastUpdatedBy: string | null;
//     likes: number;
//     tags: string[];
//     technology: string;
// }

// interface BlogPostProps {
//     articles: Article[];
// }

// const BlogPost: React.FC<BlogPostProps> = ({ articles }) => {
//     const { id } = useParams<{ id: string }>();


//     if (!article) {
//         return <div className="error" > Article not found </div>;
//     }

//     return (
//         <div className= "blog-container" >
//         <h1 className="blog-title" > { articles.title } </h1>
//         < p className = "blog-content" > <BlogPost fileName={ articles.description } /></p >
//         </div>
//   );
// };

// export default BlogPost;
