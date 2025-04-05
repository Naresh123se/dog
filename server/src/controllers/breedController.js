// controllers/breedController.js
import { asyncHandler } from "../middlewares/asyncHandler.js";
import Breed from "../models/breedModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

class BreedController {
  // Add new breed
  static addBreed = asyncHandler(async (req, res, next) => {
    const {
      name,
      origin,
      diet,
      energyLevel,
      exercise,
      grooming,
      healthIssues,
      hypoallergenic,
      lifespan,
      size,
      temperament,
      image,
    } = req.body;

    const breed = await Breed.create({
      name,
      origin,
      diet,
      energyLevel,
      exercise,
      grooming,
      healthIssues,
      hypoallergenic,
      lifespan,
      size,
      temperament,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Breed added successfully",
      breed,
    });
  });

  // Get all breeds
  static getAllBreeds = asyncHandler(async (req, res, next) => {
    const breeds = await Breed.find().sort({ createdAt: -1 });

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

  static updateBreed = asyncHandler(async (req, res, next) => {
    // Extract the data field from req.body
    const {
      name,
      origin,
      diet,
      energyLevel,
      exercise,
      grooming,
      healthIssues,
      hypoallergenic,
      lifespan,
      size,
      temperament,
      image,
    } = req.body?.data || {}; // Ensure the array is properly accessed

 

    let breed = await Breed.findById(req.params.id);

    if (!breed) {
      return next(new ErrorHandler("Breed not found", 404));
    }

    breed = await Breed.findByIdAndUpdate(
      req.params.id,
      {
        name: name || breed.name,
        origin: origin || breed.origin,
        diet: diet || breed.diet,
        energyLevel: energyLevel || breed.energyLevel,
        exercise: exercise || breed.exercise,
        grooming: grooming || breed.grooming,
        healthIssues: healthIssues || breed.healthIssues,
        hypoallergenic: hypoallergenic || breed.hypoallergenic,
        lifespan: lifespan || breed.lifespan,
        size: size || breed.size,
        temperament: temperament || breed.temperament,
        image: req.file?.path || breed.image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
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

    await breed.deleteOne();

    res.status(200).json({
      success: true,
      message: "Breed deleted successfully",
    });
  });

  // Get breeds by size
  static getBreedsBySize = asyncHandler(async (req, res, next) => {
    const breeds = await Breed.find({ size: req.params.size });

    res.status(200).json({
      success: true,
      count: breeds.length,
      breeds,
    });
  });
}

export default BreedController;
