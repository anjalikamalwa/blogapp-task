import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    title: "",
    image: null,
    publication: "",
    description: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleUpdateBlogClick = () => {
    setShowForm(!showForm);
  };

  const handleInput = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, image, publication, description } = values;

    try {
      if (!title || !publication || !description) {
        throw new Error("All fields except image are required");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("publication", publication);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${apiUrl}/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update blog");
      }

      const updatedBlog = await response.json();
      setBlog(updatedBlog);
      setShowForm(!showForm);
    } catch (error) {
      console.error("Error updating blog:", error.message);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/blogs/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }
      const result = await response.json();

      const blogData = result;
      setBlog(blogData);

      setValues({
        title: blogData.title || "",
        image: null,
        publication: blogData.publication || "",
        description: blogData.description || "",
      });

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="blog-details">
      {blog && (
        <>
          {blog.image && (
            <img src={`${apiUrl}/${blog.image}`} alt={blog.title} />
          )}
          <h1>{blog.title}</h1>
          <p>{blog.description}</p>
          <span>
            Published on {new Date(blog.publication).toLocaleDateString()}
          </span>

          <div className="btn">
            <button onClick={handleUpdateBlogClick}>
              {showForm ? "Cancel" : "Update Blog"}
            </button>
          </div>
        </>
      )}

      {showForm && (
        <div className="blog-form">
          <fieldset>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <input
                type="file"
                name="image"
                autoComplete="off"
                onChange={(e) => handleInput("image", e.target.files[0])}
              />
              <input
                type="text"
                name="title"
                placeholder="Enter your blog title"
                value={values.title || ""}
                onChange={(e) => handleInput("title", e.target.value)}
              />
              <textarea
                name="description"
                placeholder="Write about your blog"
                cols="30"
                rows="10"
                value={values.description || ""}
                onChange={(e) => handleInput("description", e.target.value)}
              ></textarea>
              <input
                type="date"
                format="yyyy-mm-dd"
                name="publication"
                value={values.publication || ""}
                onChange={(e) => handleInput("publication", e.target.value)}
              />

              <div className="btn">
                <button type="submit">Update</button>
              </div>
            </form>
          </fieldset>
        </div>
      )}
    </div>
  );
};

export default UpdateBlog;
