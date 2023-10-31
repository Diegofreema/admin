import mongoose from 'mongoose';

const EvSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  venue: { type: String, required: true },
  startDate: { type: String, required: true },
  description: { type: String, required: true },
  enDate: { type: String },
});

const ev = mongoose.models.ev || mongoose.model('ev', EvSchema);

export default ev;
