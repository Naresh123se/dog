// controllers/dogController.js
import { asyncHandler } from "../middlewares/asyncHandler.js";
import Dog from "../models/dogModel.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import axios from "axios";
import Payment from "../models/Payment.js";

class DogController {
  // Add new dog
  static addDog = asyncHandler(async (req, res, next) => {
    const {
      name,
      age,
      breed,
      location,
      price,
      bio,
      gender,
      size,
      photos,
      microchip,
      color,
      dob,
      ownerName,
      ownerAddress,
      regDate,
      regNumber,
      breeder,
      sireName,
      sireRegNumber,
      sireColor,
      damName,
      damRegNumber,
      damColor,
      sireGrandfather,
      sireGrandfatherReg,
      sireGrandmother,
      sireGrandmotherReg,
      damGrandfather,
      damGrandfatherReg,
      damGrandfatherColor,
      damGrandmother,
      damGrandmotherReg,
      damGrandmotherColor,
    } = req.body;

    if (!photos || photos.length === 0) {
      return next(new ErrorHandler("At least one image is required", 400));
    }

    const breederName = await User.findOne({ _id: req.user._id });

    const imagesLinks = [];
    for (let i = 0; i < photos.length; i++) {
      const result = await cloudinary.v2.uploader.upload(photos[i], {
        folder: "dogs",
        quality: "auto:best",
        height: 600,
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const dog = await Dog.create({
      name,
      age,
      breed,
      location,
      price,
      bio,
      gender,
      breederName,
      size,
      photos: imagesLinks, // Changed from photo to photos to match schema
      // Add all the new fields
      microchip,
      color,
      dob,
      ownerName,
      ownerAddress,
      regDate,
      regNumber,
      breeder,
      sireName,
      sireRegNumber,
      sireColor,
      damName,
      damRegNumber,
      damColor,
      sireGrandfather,
      sireGrandfatherReg,
      sireGrandmother,
      sireGrandmotherReg,
      damGrandfather,
      damGrandfatherReg,
      damGrandfatherColor,
      damGrandmother,
      damGrandmotherReg,
      damGrandmotherColor,
    });

    res.status(201).json({
      success: true,
      message: "Dog added successfully",
      dog,
    });
  });

  // Get all dogs
  static getAllDogs = asyncHandler(async (req, res, next) => {
    const dogs = await Dog.find({ isPay: false })
      .populate("breederName", "name")
      .sort({ createdAt: -1 });

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

    // Check if the current user is the breeder of this dog
    if (
      dog.breederName &&
      dog.breederName.toString() !== req.user._id.toString()
    ) {
      return next(
        new ErrorHandler("You are not authorized to update this dog", 403)
      );
    }

    const updatedData = { ...req.body };

    // Handle photos upload if new photos are provided
    if (req.body.photos && req.body.photos.length > 0) {
      // Check if photos are base64 strings (new uploads)
      if (typeof req.body.photos[0] === "string") {
        // Delete existing images from Cloudinary
        if (dog.photos && dog.photos.length > 0) {
          for (let i = 0; i < dog.photos.length; i++) {
            await cloudinary.v2.uploader.destroy(dog.photos[i].public_id);
          }
        }

        // Upload new images
        const imagesLinks = [];
        for (let i = 0; i < req.body.photos.length; i++) {
          const result = await cloudinary.v2.uploader.upload(
            req.body.photos[i],
            {
              folder: "dogs",
              quality: "auto:best",
              height: 600,
            }
          );

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        updatedData.photos = imagesLinks;
      }
    }

    // Parse date strings to Date objects if they exist
    if (updatedData.dob) updatedData.dob = new Date(updatedData.dob);
    if (updatedData.regDate)
      updatedData.regDate = new Date(updatedData.regDate);

    // Convert numeric strings to numbers
    if (updatedData.age) updatedData.age = Number(updatedData.age);
    if (updatedData.price) updatedData.price = Number(updatedData.price);

    dog = await Dog.findByIdAndUpdate(req.params.id, updatedData, {
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

    await Dog.deleteOne({ _id: req.params.id });

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

  static initiatePayment = asyncHandler(async (req, res, next) => {
    const { name, amount, dogId, dogname, email, phone } = req.body;

    const payload = {
      return_url: "http://localhost:3000/adoption", // Redirect URL after payment
      website_url: "http://localhost:3000", // Your website URL
      amount: amount * 100, // Convert to paisa
      purchase_order_id: dogId,
      purchase_order_name: "DOG",
      customer_info: {
        name: name,
        email: email,
        phone: phone, // Replace with a valid phone number
      },
    };

    try {
      const response = await axios.post(
        `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,
        payload,
        {
          headers: {
            Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      res.json({
        success: true,
        payment_url: response.data.payment_url,
        pidx: response.data.pidx,
      });
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      res
        .status(500)
        .json({ success: false, message: "Payment initiation failed" });
    }
  });

  static completePayment = asyncHandler(async (req, res, next) => {
    const { pidx } = req.query;
    const { dogId } = req.body;

    if (!pidx || !dogId) {
      return res.status(400).json({
        success: false,
        message: "pidx and dogId are required",
      });
    }

    // Check if payment was already processed
    const existingPayment = await Payment.findOne({ pidx });
    if (existingPayment) {
      return res.status(200).json({
        success: true,
        message: "Payment already processed",
        payment: existingPayment,
      });
    }

    try {
      // Verify payment with Khalti
      const verificationResponse = await axios.post(
        `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/lookup/`,
        { pidx },
        {
          headers: {
            Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const user = req.user?._id;
      const paymentInfo = verificationResponse.data;
      console.log(paymentInfo);

      if (paymentInfo.status === "Completed") {
        // Create payment record
        const payment = await Payment.create({
          pidx,
          dogId,
          status: "completed",
          amount: paymentInfo.total_amount / 100, // Convert to rupees
          paymentDetails: paymentInfo,
          userId: user,
        });

        // Update dog status
        const updatedDog = await Dog.findByIdAndUpdate(
          dogId,
          { isPay: true },
          { new: true }
        );

        if (!updatedDog) {
          return res.status(404).json({
            success: false,
            message: "Dog not found",
          });
        }

        res.json({
          success: true,
          message: "Payment verified and dog status updated",
          payment,
          dog: updatedDog,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Payment not completed",
          paymentInfo,
        });
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({
        success: false,
        message: "Payment verification failed",
        error: error.message,
      });
    }
  });
}

export default DogController;
