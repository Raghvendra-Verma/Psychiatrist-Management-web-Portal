const Patient = require('../models/patientModel');

const patientController = {
  registerPatient: async (req, res) => {
    const { name, address, email, phoneNumber, password, photo } = req.body;
    //console.log("object",{name, address, email, phoneNumber, password, photo});

    try {
      // Validate the request body
      if (!name || !address || !email || !phoneNumber || !password || !photo) {
        return res.status(400).json({ error: 'All fields are mandatory' });
      }

      // Create a new patient instance
      const newPatient = new Patient({
        name,
        address,
        email,
        phoneNumber,
        password,
        photo,
      });

      // Save the patient to the database
      const savedPatient = await newPatient.save();

      res.json(savedPatient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getPatientById: async (req, res) => {
    const { patientId } = req.params;

    try {
      // Find the patient by ID in the database
      const patient = await Patient.findById(patientId);

      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      res.json(patient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updatePatientById: async (req, res) => {
    const { patientId } = req.params;
    const { name, address, email, phoneNumber, password, photo } = req.body;

    try {
      // Validate the request body
      if (!name || !address || !email || !phoneNumber || !password || !photo) {
        return res.status(400).json({ error: 'All fields are mandatory' });
      }

      // Update the patient in the database
      const updatedPatient = await Patient.findByIdAndUpdate(
        patientId,
        { name, address, email, phoneNumber, password, photo },
        { new: true }
      );

      if (!updatedPatient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      res.json({updatedPatient, message: 'Patient updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deletePatientById: async (req, res) => {
    const { patientId } = req.params;

    try {
      // Delete the patient from the database
      const deletedPatient = await Patient.findByIdAndDelete(patientId);

      if (!deletedPatient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTotalPatientsCount: async (req, res) => {
    try {
      const totalPatientsCount = await Patient.countDocuments();
      res.json({ totalPatientsCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = patientController;
