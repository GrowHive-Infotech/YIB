import { useEffect, useState } from "react";
import { supabase } from "./Supabase";
import ReactHtmlParser from 'html-react-parser';
import DOMPurify from 'dompurify';

const InterviewPosts = ({ fileName }) => {
    const [htmlContent, setHtmlContent] = useState("");

    useEffect(() => {
        const fetchHtmlFile = async () => {
            const { data, error } = await supabase.storage
                .from("interviews") // Replace with your Supabase bucket name
                .getPublicUrl(fileName);

            if (error) {
                console.error("Error fetching file:", error);
                return;
            }

            try {
                const response = await fetch(data.publicUrl);
                const text = await response.text();
                const cleanHtml = DOMPurify.sanitize(text);
                setHtmlContent(ReactHtmlParser(cleanHtml));
            } catch (err) {
                console.error("Error fetching file content:", err);
            }
        };

        if (fileName) {
            fetchHtmlFile();
        }
    }, [fileName]);

    return <div>{htmlContent}</div>;
};

export default InterviewPosts;
