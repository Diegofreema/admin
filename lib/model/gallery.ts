import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Gallery =
  mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

export default Gallery;
