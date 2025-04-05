// routes/blogRoutes.js
import express from "express";
import BlogController from "../controllers/blogController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const blogRouter = express.Router();

// ********************* BLOG MANAGEMENT ROUTES *********************
blogRouter.post("/create-blog", isAuthenticated, BlogController.addBlog);

blogRouter.get("/all-blogs", BlogController.getAllBlogs);
blogRouter.get("/blog/:id", BlogController.getBlog);
blogRouter.get(
  "/blogs-by-category/:category",
  BlogController.getBlogsByCategory
);

blogRouter.put("/update-blog/:id", isAuthenticated, BlogController.updateBlog);

blogRouter.delete(
  "/delete-blog/:id",
  isAuthenticated,
  BlogController.deleteBlog
);

export default blogRouter;
