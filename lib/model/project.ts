import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  imgUrl: { type: String, required: true },
});

const Project =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
