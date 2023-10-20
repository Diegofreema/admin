import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  imgUrl: { type: String, required: true },
});

const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);

export default Team;
