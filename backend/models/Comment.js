import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },
    username: {
      type: String,
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Comment", reviewSchema);
