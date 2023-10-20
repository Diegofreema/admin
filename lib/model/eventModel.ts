import mongoose from 'mongoose';

const EventModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
});

const EventModel =
  mongoose.models.EventModel || mongoose.model('EventModel', EventModelSchema);

export default EventModel;
