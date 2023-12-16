import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    videoUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.models.Video || mongoose.model('Video', VideoSchema);

export default Video;
