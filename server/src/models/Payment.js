import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    pidx: {
      type: String,
      required: true,
      unique: true,
    },
    dogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dog",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["initiated", "completed", "failed"],
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDetails: {
      type: Object,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);
