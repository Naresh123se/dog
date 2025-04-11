import mongoose from "mongoose";

const breedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  origin: {
    type: String,
    required: [true, "Origin is required"],
  },
  diet: {
    type: String,
    required: [true, "Diet is required"],
  },
  energyLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: [true, "Energy level is required"],
  },
  exercise: {
    type: String,
    required: [true, "Exercise info is required"],
  },
  grooming: {
    type: String,
    required: [true, "Grooming info is required"],
  },
  healthIssues: {
    type: String,
    required: [true, "Health issues info is required"],
  },
  hypoallergenic: {
    type: Boolean,
    required: [true, "Hypoallergenic field is required"],
  },
  lifespan: {
    type: String,
    required: [true, "Lifespan info is required"],
  },
  size: {
    type: String,
    enum: ["Small", "Medium", "Large"],
    required: [true, "Size is required"],
  },
  temperament: {
    type: String,
    required: [true, "Temperament info is required"],
  },

  images: [
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
