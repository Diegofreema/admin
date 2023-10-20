import mongoose from 'mongoose';

const ProjectVideoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  videoUrl: { type: String, required: true },
});

const ProjectVideo =
  mongoose.models.ProjectVideo ||
  mongoose.model('ProjectVideo', ProjectVideoSchema);

export default ProjectVideo;
