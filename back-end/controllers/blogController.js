import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import { Blog } from "../models/blogModel.js";
import { upload } from "../middleware/multer.js";


// @dess Get a Blog
// @route Get /api/blogs/:id
// @access public
export const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not Found");
  }
  res.status(200).json(blog);
});



// @desc Get all blogs
// @route GET /api/blogs
// @access public
export const getBlogs = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.find();
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Create a new blog post with image upload
// @route   POST /api/blogs
// @access  Public
export const createBlog = asyncHandler(async (req, res) => {
  const { title, description, publication } = req.body;

  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  if (!title || !description || !publication) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const image = req.file ? req.file.path : null;
  if (!image) {
    res.status(400);
    throw new Error("Image is mandatory");
  }

  const blog = await Blog.create({
    title,
    image,
    description,
    publication,
  });

  res.status(201).json({ message: "Blog post created successfully", blog });
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Public
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }

  const imagePath = blog.image;

  await blog.deleteOne();

  if (fs.existsSync(imagePath)) {
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error while deleting image:", err);
        throw new Error("Failed to delete image file");
      }
      console.log("Image deleted successfully:", imagePath);
    });
  }

  res.json({ message: "Blog post and associated image deleted successfully" });
});



// @desc Update Blog with Image
// @route PUT /api/blogs/:id
// @access Public (or Private depending on your needs)
export const updateBlogWithImage = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }


  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Image upload failed', error: err.message });
    }

    const updatedData = {
      title: req.body.title || blog.title,
      description: req.body.description || blog.description,
      publication: req.body.publication || blog.publication,
    };

   
    if (req.file) {
      if (blog.image) {
        fs.unlink(blog.image, (err) => {
          if (err) {
            console.error('Failed to delete old image', err);
          }
        });
      }
      updatedData.image = req.file.path;  
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    res.status(200).json(updatedBlog);
  });
});


