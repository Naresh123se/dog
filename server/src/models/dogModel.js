import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  age: {
    type: String,
    required: true,
  },
  breed: {
    type: String, // Can be ObjectId if you have Breed model
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  breederName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  photo: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },
  size: {
    type: String,
    enum: ["Small", "Medium", "Large", "Extra Large"],
    default: "Medium",
  },
  // Other fields as needed...
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Dog = mongoose.model("Dog", dogSchema);
export default Dog;
