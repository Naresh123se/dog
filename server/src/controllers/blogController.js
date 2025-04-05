// controllers/blogController.js
import { asyncHandler } from "../middlewares/asyncHandler.js";
import Blog from "../models/blogModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

class BlogController {
  // Add new blog post
  static addBlog = asyncHandler(async (req, res, next) => {
    const { title, author, category, date, excerpt } = req.body;

    const blog = await Blog.create({
      title,
      author,
      category,
      date,
      excerpt,
      image: "lll",
    });

    res.status(201).json({
      success: true,
      message: "Blog post added successfully",
      blog,
    });
  });

  // Get all blog posts
  static getAllBlogs = asyncHandler(async (req, res, next) => {
    const blogs = await Blog.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  });

  // Get single blog post
  static getBlog = asyncHandler(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new ErrorHandler("Blog post not found", 404));
    }

    res.status(200).json({
      success: true,
      blog,
    });
  });

  // Update blog post
  static updateBlog = asyncHandler(async (req, res, next) => {
    const { title, author, category, date, excerpt } = req.body;

    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new ErrorHandler("Blog post not found", 404));
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: title || blog.title,
        author: author || blog.author,
        category: category || blog.category,
        date: date || blog.date,
        excerpt: excerpt || blog.excerpt,
        image: req.file?.path || blog.image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      blog,
    });
  });

  // Delete blog post
  static deleteBlog = asyncHandler(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new ErrorHandler("Blog post not found", 404));
    }

    await blog.remove();

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  });

  // Get blog posts by category
  static getBlogsByCategory = asyncHandler(async (req, res, next) => {
    const blogs = await Blog.find({ category: req.params.category });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  });

  // Get featured/latest blog posts (additional useful method)
  static getFeaturedBlogs = asyncHandler(async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 3;
    const blogs = await Blog.find().sort({ date: -1 }).limit(limit);

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  });
}

export default BlogController;
