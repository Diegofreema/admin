import mongoose from 'mongoose';

const VolunteerSchema = new mongoose.Schema({
  email: { type: String, required: true },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  skill: { type: String, required: true },
  country: { type: String, required: true },
  reason: { type: String, required: true },
});

const Volunteer =
  mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);

export default Volunteer;
