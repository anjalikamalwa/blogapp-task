import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams(); 
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogDetails = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/blogs/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog details");
      }
      const result = await response.json();
      setBlog(result);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="blog-details">
      {blog && (
        <>
          <h1>{blog.title}</h1>
          <img src={`${apiUrl}/${blog.image}`} alt={blog.title} />
          <p>{blog.description}</p>
          <span>Published on {new Date(blog.publication).toLocaleDateString()}</span>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
