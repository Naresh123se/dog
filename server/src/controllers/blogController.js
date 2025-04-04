// controllers/blogController.js
import { asyncHandler } from "../middlewares/asyncHandler.js";
import Blog from "../models/blogModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

class BlogController {
  /**
   * Create a new blog post
   */
  static createBlog = asyncHandler(async (req, res, next) => {
    const { title, author, category, date, images, excerpt } = req.body;

    if (!images) {
      return next(new ErrorHandler("Atleast one image is required", 400));
    }

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "posts",
        quality: "auto:best",
        height: 600,
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
console.log(imagesLinks);
    const blog = await Blog.create({
      title,
      author,
      category,
      date,
      excerpt,
      images: imagesLinks, // Placeholder; update with actual image handling
    });

    return res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      blog,
    });
  });

  /**
   * Retrieve all blog posts
   */
  static getAllBlogs = asyncHandler(async (req, res, next) => {
    const blogs = await Blog.find().sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  });

  /**
   * Retrieve a single blog post by ID
   */
  static getBlogById = asyncHandler(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new ErrorHandler("Blog post not found", 404));
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  });

  /**
   * Update an existing blog post
   */
  static updateBlog = asyncHandler(async (req, res, next) => {
    const { title, author, category, date, excerpt } = req.body;
    console.log(req.params.id);

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

    return res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      blog,
    });
  });

  /**
   * Delete a blog post
   */
  static deleteBlog = asyncHandler(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new ErrorHandler("Blog post not found", 404));
    }

    await blog.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  });

  /**
   * Retrieve blog posts by category
   */
  static getBlogsByCategory = asyncHandler(async (req, res, next) => {
    const blogs = await Blog.find({ category: req.params.category });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  });

  /**
   * Retrieve featured or latest blog posts
   * Query param: limit (default: 3)
   */
  static getFeaturedBlogs = asyncHandler(async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 3;

    const blogs = await Blog.find().sort({ date: -1 }).limit(limit);

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  });
}

export default BlogController;
