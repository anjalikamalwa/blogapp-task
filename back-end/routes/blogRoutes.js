import express from 'express';
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlogWithImage } from '../controllers/blogController.js';
import { upload } from '../middleware/multer.js';


const router = express.Router();

router.post("/", upload.single("image"), createBlog);
router.delete("/:id", deleteBlog);
router.get("/",getBlogs).get("/:id",getBlog);
router.put("/:id",updateBlogWithImage)

export default router;
