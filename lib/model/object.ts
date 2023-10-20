import mongoose from 'mongoose';

const objSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
});

const Obj = mongoose.models.Obj || mongoose.model('Obj', objSchema);

export default Obj;
