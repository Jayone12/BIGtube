import mongoose from "mongoose";

// schema 생성
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  description: { type: String, required: true, maxLength: 80 },
  createdAt: { type: Date, required: true, default: Date.now, minLength: 20 },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

// schema를 토대로 model 생성
const Video = mongoose.model("Video", videoSchema);

export default Video;
