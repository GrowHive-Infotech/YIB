// import { useEffect, useState } from "react";
// import { supabase } from "./Supabase";
// import ReactHtmlParser from 'html-react-parser';
// import DOMPurify from 'dompurify';
// const BlogPost = ({ fileName }: { fileName: string }) => {
//     const [htmlContent, setHtmlContent] = useState<string>("");

//     useEffect(() => {
//         const fetchHtmlFile = async () => {
//             const { data, error } = await supabase.storage
//                 .from("blog-posts") // Replace with your Supabase bucket name
//                 .getPublicUrl(fileName);

//             if (error) {
//                 console.error("Error fetching file:", error);
//                 return;
//             }

//             // Fetch the file content from the public URL
//             const response = await fetch(data.publicUrl);
//             const text = await response.text();
//             setHtmlContent(ReactHtmlParser(DOMPurify.sanitize(text))); 
//         };

//         fetchHtmlFile();
//     }, [fileName]);
//     return htmlContent;
// };

// export default BlogPost;
