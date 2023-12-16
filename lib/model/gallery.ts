import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema(
  {
    imgUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Gallery =
  mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

export default Gallery;
