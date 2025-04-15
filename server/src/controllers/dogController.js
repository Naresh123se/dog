// controllers/dogController.js
import { asyncHandler } from "../middlewares/asyncHandler.js";
import Dog from "../models/dogModel.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

class DogController {
  // Add new dog
  static addDog = asyncHandler(async (req, res, next) => {
    const { name, age, breed, location, price, bio, gender, size, photos } =
      req.body;

    if (!photos) {
      return next(new ErrorHandler("Atleast one image is required", 400));
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
      photo: imagesLinks, // Assuming you're using file upload middleware
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
    const { amount, purchaseOrderId, purchaseOrderName } = req.body;
    console.log(req.body);

    const payload = {
      return_url: "http://localhost:3000", // Redirect URL after payment
      website_url: "http://localhost:3000", // Your website URL
      amount: amount * 100, // Convert to paisa
      purchase_order_id: purchaseOrderId,
      purchase_order_name: purchaseOrderName,
      customer_info: {
        name: "Customer Name",
        email: "customer@example.com",
        phone: "9800000001", // Replace with a valid phone number
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

  //verify payment
  static completePayment = asyncHandler(async (req, res, next) => {
    const { pidx } = req.query;
    if (!pidx) {
      return res
        .status(400)
        .json({ success: false, message: "pidx is required" });
    }
    console.log(pidx);
    const verificationResponse = await axios.post(
      `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/lookup/`,
      { pidx },
      {
        headers: {
          Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentInfo = verificationResponse.data;

    if (paymentInfo.status === "Completed") {
      res.json({
        success: true,
        message: "Payment verified ",
        paymentInfo,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment not completed",
        paymentInfo,
      });
    }
  });
}

export default DogController;
