import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: [
      {
        paraTitle: {
          type: String,
          required: true
        },
        desc: {
          type: String,
          required: true
        },
      }
    ],

    photo: {
      type: String,
      required: true,
    },

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      }
    ],

    postAt: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Blog", tourSchema);
