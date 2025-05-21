const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel'); // ✅ Import model
const { addDoctor } = require('../controllers/doctorController');

router.post('/add-doctor', addDoctor);

// @route   GET /api/doctors
// @desc    Get doctors with filtering and pagination
router.get("/doctors", async (req, res) => {
  try {
    const { specialty, experience, location, fees, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (specialty) filter.specialty = specialty;
    if (location) filter.location = location;
    if (experience) filter.experience = experience;
    if (fees) filter.fees = { $lte: parseInt(fees) };

    const doctors = await Doctor.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Doctor.countDocuments(filter);

    res.json({
      success: true,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalDoctors: total,
      data: doctors
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
