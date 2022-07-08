import mongoose from "mongoose";

// schema 생성
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

// schema를 토대로 model 생성
const Video = mongoose.model("Video", videoSchema);

export default Video;
