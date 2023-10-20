import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  heading: { type: String, required: true },
  description: { type: String, required: true },
});

const SliderImg =
  mongoose.models.SliderImg || mongoose.model('SliderImg', sliderSchema);

export default SliderImg;
