// controllers/breedController.js
import { asyncHandler } from "../middlewares/asyncHandler.js";
import Breed from "../models/breedModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

class BreedController {
  // Add new breed
  static addBreed = asyncHandler(async (req, res, next) => {
    const { title, author, category, date, excerpt } = req.body;

    const breed = await Breed.create({
      title,
      author,
      category,
      date,
      excerpt,
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Breed added successfully",
      breed,
    });
  });

  // Get all breeds
  static getAllBreeds = asyncHandler(async (req, res, next) => {
    const breeds = await Breed.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: breeds.length,
      breeds,
    });
  });

  // Get single breed
  static getBreed = asyncHandler(async (req, res, next) => {
    const breed = await Breed.findById(req.params.id);

    if (!breed) {
      return next(new ErrorHandler("Breed not found", 404));
    }

    res.status(200).json({
      success: true,
      breed,
    });
  });

  // Update breed
  static updateBreed = asyncHandler(async (req, res, next) => {
    const { title, author, category, date, excerpt } = req.body;

    let breed = await Breed.findById(req.params.id);

    if (!breed) {
      return next(new ErrorHandler("Breed not found", 404));
    }

    breed = await Breed.findByIdAndUpdate(
      req.params.id,
      {
        title: title || breed.title,
        author: author || breed.author,
        category: category || breed.category,
        date: date || breed.date,
        excerpt: excerpt || breed.excerpt,
        image: req.file?.path || breed.image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Breed updated successfully",
      breed,
    });
  });

  // Delete breed
  static deleteBreed = asyncHandler(async (req, res, next) => {
    const breed = await Breed.findById(req.params.id);

    if (!breed) {
      return next(new ErrorHandler("Breed not found", 404));
    }

    await breed.remove();

    res.status(200).json({
      success: true,
      message: "Breed deleted successfully",
    });
  });

  // Get breeds by category
  static getBreedsByCategory = asyncHandler(async (req, res, next) => {
    const breeds = await Breed.find({ category: req.params.category });

    res.status(200).json({
      success: true,
      count: breeds.length,
      breeds,
    });
  });
}

export default BreedController;
