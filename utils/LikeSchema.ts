import mongoose, { Schema } from "mongoose";

export const LikeSchema = new Schema({
  work: {
    type: String,
    required: true,
    unique: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const LikesModel = mongoose.model("Likes", LikeSchema);
