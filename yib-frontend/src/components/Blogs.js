import React from "react";
import { useParams } from "react-router-dom";
import "./BlogPost.css";
import BlogPostFile from "./BlogPost"; // Assuming this is the component that renders HTML from Supabase

const BlogPost = ({ articles }) => {
    const { id } = useParams();

    // Find the matching article by ID
    const article = articles.find((a) => a.id === id);

    if (!article) {
        return <div className="error">Article not found</div>;
    }

    return (
        <div className="blog-container">
            <h1 className="blog-title">{article.title}</h1>
            <p className="blog-meta">
                By {article.author} | Created on {article.createday}
            </p>
            <div className="blog-content">
                {/* Renders content from the Supabase file (assumed to be HTML) */}
                <BlogPostFile fileName={article.description} />
            </div>
        </div>
    );
};

export default BlogPost;
