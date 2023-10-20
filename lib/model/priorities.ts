import mongoose from 'mongoose';

const prioritySchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
});

const Priority =
  mongoose.models.Priority || mongoose.model('Priority', prioritySchema);

export default Priority;
