const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experience: String,
  qualification: String,
  location: String,
  clinic: String,
  fees: Number,
  cashback: Number,
  availability: String,
  rating: String,
  image: String,
});

module.exports = mongoose.model('Doctor', doctorSchema);
