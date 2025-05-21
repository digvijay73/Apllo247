const Doctor = require('../models/doctorModel.js');

// POST /api/add-doctor
exports.addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ success: true, data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/doctors
exports.listDoctors = async (req, res) => {
  try {
    const { specialty, experience, fees, page = 1, limit = 10 } = req.query;

    let query = {};
    if (specialty) query.specialty = { $regex: specialty, $options: 'i' };
    if (experience) query.experience = { $regex: experience, $options: 'i' };
    if (fees) query.fees = { $lte: parseInt(fees) };

    const doctors = await Doctor.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Doctor.countDocuments(query);

    res.json({ success: true, data: doctors, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
