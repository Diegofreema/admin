import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
});

const Goal = mongoose.models.Goal || mongoose.model('Goal', goalSchema);

export default Goal;
