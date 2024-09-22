import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the title of blog"],
    },
    image: {
      type: String, 
      required: [true, "Please add the image URL"],
    },
    description: {
      type: String,
      required: [true, "Please write the description about the blog"],
    },
    publication: {
      type: Date,
      required: [true, "Please write the publication date"],
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("Blog", blogSchema);