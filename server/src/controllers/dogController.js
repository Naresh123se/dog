// controllers/dogController.js
import { asyncHandler } from "../middlewares/asyncHandler.js";
import Dog from "../models/dogModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

class DogController {
  // Add new dog
  static addDog = asyncHandler(async (req, res, next) => {
    const { name, age, breed, location, shelter, bio, gender, size } = req.body;

    // if (!req.file) {
    //   return next(new ErrorHandler("Dog photo is required", 400));
    // }

    const dog = await Dog.create({
      name,
      age,
      breed,
      location,
      shelter,
      bio,
      gender,
      size,
      photo:"sjdnsjandbn", // Assuming you're using file upload middleware
    });

    res.status(201).json({
      success: true,
      message: "Dog added successfully",
      dog,
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

  // Get single dog
  static getDog = asyncHandler(async (req, res, next) => {
    const dog = await Dog.findById(req.params.id);

    if (!dog) {
      return next(new ErrorHandler("Dog not found", 404));
    }

    res.status(200).json({
      success: true,
      dog,
    });
  });

  // Update dog
  static updateDog = asyncHandler(async (req, res, next) => {
    let dog = await Dog.findById(req.params.id);

    if (!dog) {
      return next(new ErrorHandler("Dog not found", 404));
    }

    dog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Dog updated successfully",
      dog,
    });
  });

  // Delete dog
  static deleteDog = asyncHandler(async (req, res, next) => {
    const dog = await Dog.findById(req.params.id);

    if (!dog) {
      return next(new ErrorHandler("Dog not found", 404));
    }

    await dog.remove();

    res.status(200).json({
      success: true,
      message: "Dog deleted successfully",
    });
  });

  // Get dogs by breed
  static getDogsByBreed = asyncHandler(async (req, res, next) => {
    const dogs = await Dog.find({ breed: req.params.breedId });

    res.status(200).json({
      success: true,
      count: dogs.length,
      dogs,
    });
  });
}

export default DogController;
