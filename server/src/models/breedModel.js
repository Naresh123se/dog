import mongoose from "mongoose";

const breedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [200, "Title cannot exceed 200 characters"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    maxlength: [100, "Author name cannot exceed 100 characters"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Training", "Health", "Adoption Stories", "Dog Care", "Breed Info"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
    default: Date.now,
  },
  excerpt: {
    type: String,
    required: [true, "Excerpt is required"],
    maxlength: [300, "Excerpt cannot exceed 300 characters"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

breedSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Breed = mongoose.model("Breed", breedSchema);

export default Breed;
