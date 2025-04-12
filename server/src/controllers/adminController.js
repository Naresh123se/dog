// controllers/blogController.js
import { asyncHandler } from "../middlewares/asyncHandler.js";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import Breed from "../models/breedModel.js";
import Dog from "../models/dogModel.js";

class AdminController {
  static getAllBlogs = asyncHandler(async (req, res, next) => {
    const blogs = await Blog.find().sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  });

  static getAllBreeds = asyncHandler(async (req, res, next) => {
    const breeds = await Breed.find()
      .sort({ createdAt: -1 })
      .populate("owner", "_id");

    res.status(200).json({
      success: true,
      count: breeds.length,
      breeds,
    });
  });

  // Get all dogs
  static getAllDogs = asyncHandler(async (req, res, next) => {
    const dogs = await Dog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: dogs.length,
      dogs,
    });
  });

  static getAllUser = asyncHandler(async (req, res, next) => {
    const user = await User.find({ role: { $in: ["user", "breeder"] } }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: user.length,
      user,
    });
  });

  static banUserByAdmin = asyncHandler(async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }
      if (user.isBanned) {
        user.isBanned = false;
      } else {
        user.isBanned = true;
      }
      await user.save();
      return res.status(200).json({
        success: true,
        message: user.isBanned
          ? "User banned Successfully"
          : "User unbanned Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
}

export default AdminController;
