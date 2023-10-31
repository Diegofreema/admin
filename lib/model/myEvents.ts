import mongoose from 'mongoose';

const myEventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  venue: { type: String, required: true },
  startDate: { type: String, required: true },
  enDate: { type: String },
  description: { type: String, required: true },
});

const myEvent =
  mongoose.models.myEvent || mongoose.model('myEvent', myEventSchema);

export default myEvent;
