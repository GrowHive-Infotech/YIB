import { useEffect, useState } from "react";
import { supabase } from "./Supabase";
import ReactHtmlParser from 'html-react-parser';
import DOMPurify from 'dompurify';

const BlogPost = ({ fileName }) => {
    const [htmlContent, setHtmlContent] = useState("");

    useEffect(() => {
        const fetchHtmlFile = async () => {
            const { data, error } = await supabase.storage
                .from("blog-posts") // Replace with your Supabase bucket name
                .getPublicUrl(fileName);

            if (error) {
                console.error("Error fetching file:", error);
                return;
            }

            try {
                const response = await fetch(data.publicUrl);
                const text = await response.text();
                const sanitizedHTML = DOMPurify.sanitize(text);
                setHtmlContent(ReactHtmlParser(sanitizedHTML));
            } catch (err) {
                console.error("Error loading HTML content:", err);
            }
        };

        if (fileName) {
            fetchHtmlFile();
        }
    }, [fileName]);

    return <div>{htmlContent}</div>;
};

export default BlogPost;
