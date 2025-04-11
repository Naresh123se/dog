// controllers/breedController.js
import { asyncHandler } from "../middlewares/asyncHandler.js";
import Breed from "../models/breedModel.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

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
      images,
    } = req.body;

    if (!images) {
      return next(new ErrorHandler("Atleast one image is required", 400));
    }

   const user = await User.findOne({ _id: req.user._id });

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "breeds",
        quality: "auto:best",
        height: 600,
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

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
      images: imagesLinks,
      owner: user,
    });

    res.status(201).json({
      success: true,
      message: "Breed added successfully",
      breed,
    });
  });

  // Get all breeds
  static getAllBreeds = asyncHandler(async (req, res, next) => {
    const breeds = await Breed.find().sort({ createdAt: -1 }).populate("owner", "_id");

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
      images: bodyImages, // Rename this to avoid conflict
    } = req.body?.data || {};

    let breed = await Breed.findById(req.params.id);

    if (!breed) {
      return next(new ErrorHandler("Breed not found", 404));
    }

    // Handle Image section using cloudinary
    let imagesToUpload = [];

    // If images are passed as a string (for a single image)
    if (typeof req.body.images === "string") {
      imagesToUpload.push(req.body.images);
    } else {
      imagesToUpload = req.body.images || bodyImages || [];
    }

    // Now uploading the images to Cloudinary
    const imagesLinks = [];
    for (let i = 0; i < imagesToUpload.length; i++) {
      const result = await cloudinary.v2.uploader.upload(imagesToUpload[i], {
        folder: "breeds",
        quality: "auto:best",
        height: 600,
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
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
        images: imagesLinks.length > 0 ? imagesLinks : breed.images, // Fixed typo (blog.images -> breed.images)
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
