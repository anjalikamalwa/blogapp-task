import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Blog = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [showForm, setShowForm] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [publication, setPublication] = useState(null);

  const handleAddBlogClick = () => {
    setShowForm(!showForm);
  };

  const navigate = useNavigate();

  const handleBlogClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  const handleUpdateBlogClick = (id) => {
    navigate(`/blogs1/${id}`);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/blogs`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setBlogs(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImage(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !image || !description || !publication) {
        throw new Error("All fields are required");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("publication", publication);

      for (let index = 0; index < image.length; index++) {
        formData.append("image", image[index]);
      }

      const response = await fetch(`${apiUrl}/api/blogs`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const newBlogs = await response.json();
      setBlogs([...blogs, newBlogs]);

      fetchData();
      setShowForm(false);
    } catch (error) {
      console.error("Blog upload error:", error);
    }
  };


  const handledeleteBlogClick = (id) => {
    let ids = "";
    console.log(ids);
    if (id) {
      ids = id;
    } else {
      ids = checkedData?.map((data) => data.id).toString();
    }

    fetch(`${apiUrl}/api/blogs/${ids}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        fetchData();
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="blog-container">
      <div className="btn">
        <button onClick={handleAddBlogClick}>
          {showForm ? "Cancel" : "Create New Blog"}
        </button>
      </div>

      {showForm && (
        <div className="blog-form">
          <fieldset>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                name="image"
                autoComplete="off"
                onChange={handleImageChange}
              />
              <input
                type="text"
                name="title"
                placeholder="Enter your blog title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                name="description"
                placeholder="Write about your blog"
                cols="30"
                rows="10"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <input
                type="date"
                format="yyyy-mm-dd"
                name="publication"
                onChange={(e) => setPublication(e.target.value)}
              />

              <div className="btn">
                <button type="submit">Publish</button>
              </div>
            </form>
          </fieldset>
        </div>
      )}

      <div className="blogs">

        {blogs.map((blog, index) => (
          <div className="card" key={index}>
            <div className="btn delete">
            <button onClick={() => handledeleteBlogClick(blog._id)}>
                Delete
              </button>
            </div>
            <img
              src={`${apiUrl}/${blog.image}`}
              alt={blog.title}
              onClick={() => handleBlogClick(blog._id)}
            />
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
          
            <div className="delete-blog">
            <span>
              Published on {new Date(blog.publication).toLocaleDateString()}
            </span>
              <button onClick={() => handleUpdateBlogClick(blog._id)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
