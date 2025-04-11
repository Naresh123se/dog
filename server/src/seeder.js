import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "./middlewares/asyncHandler.js";
import connectDB from "./config/dbconnect.js";
import User from "./models/userModel.js";
const createAdmin = asyncHandler(async (req, res, next) => {
  try {
    await connectDB();

    // Create the admin of the site
    const email = "admin@pets.com"; // Replace with your email
    const password = "pets@123";
    const name = "Admin";
    // Check if an admin already exists
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit(0);
    }
    await User.create({
      name,
      email,
      password,
      gender:"male",
      phone:"9829192922",
      address:"kalopul, ktm",
      role: "admin",
      isVerified: true,

    });

    console.log("Admin has been created Successfully");
    process.exit(0); // Exit the script after completion
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit with an error code
  }
});

createAdmin();