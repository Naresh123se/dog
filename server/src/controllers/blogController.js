// controllers/blogController.js
import { asyncHandler } from "../middlewares/asyncHandler.js";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

class BlogController {
  /**
   * Create a new blog post
   */
  static createBlog = asyncHandler(async (req, res, next) => {
    const { title, author, category, date, images, excerpt, content } =
      req.body;
    const user = await User.findOne({ _id: req.user._id });

    if (!images) {
      return next(new ErrorHandler("Atleast one image is required", 400));
    }

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "blogs",
        quality: "auto:best",
        height: 600,
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const blog = await Blog.create({
      title,
      author,
      category,
      date,
      excerpt,
      content,
      owner: user,
      images: imagesLinks,
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
    const { title, author, category, date, excerpt, content } = req.body;

    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new ErrorHandler("Blog post not found", 404));
    }

    // Handle Image section using cloudinary
    let images = [];

    // If images are passed as a string (for a single image)
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    // Now uploading the images to Cloudinary
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "blogs",
        quality: "auto:best",
        height: 600,
      });

      // Storing the image links and public_id
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: title || blog.title,
        author: author || blog.author,
        category: category || blog.category,
        date: date || blog.date,
        excerpt: excerpt || blog.excerpt,
        content: content || blog.content,
        images: imagesLinks || blog.images,
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
