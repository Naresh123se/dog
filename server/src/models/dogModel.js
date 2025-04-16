import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isPay: {
    type: Boolean,
    required: true,
    default: false,
  },
  bio: {
    type: String,
    required: true,
  },
  breederName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // Renamed from photo to photos to match the useEffect
  photos: [
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
    enum: ["Small", "Medium", "Large", "X-Large"],
    default: "Medium",
  },
  // New fields based on useEffect
  microchip: {
    type: String,
  },
  color: {
    type: String,
  },
  dob: {
    type: Date,
  },
  ownerName: {
    type: String,
  },
  ownerAddress: {
    type: String,
  },
  regDate: {
    type: Date,
  },
  regNumber: {
    type: String,
  },
  breeder: {
    type: String,
  },
  sireName: {
    type: String,
  },
  sireRegNumber: {
    type: String,
  },
  sireColor: {
    type: String,
  },
  damName: {
    type: String,
  },
  damRegNumber: {
    type: String,
  },
  damColor: {
    type: String,
  },
  sireGrandfather: {
    type: String,
  },
  sireGrandfatherReg: {
    type: String,
  },
  sireGrandmother: {
    type: String,
  },
  sireGrandmotherReg: {
    type: String,
  },
  damGrandfather: {
    type: String,
  },
  damGrandfatherReg: {
    type: String,
  },
  damGrandfatherColor: {
    type: String,
  },
  damGrandmother: {
    type: String,
  },
  damGrandmotherReg: {
    type: String,
  },
  damGrandmotherColor: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Dog = mongoose.model("Dog", dogSchema);
export default Dog;
