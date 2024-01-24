const Psychiatrist = require('../models/psychiatristModel');
const Patient = require('../models/patientModel');

const psychiatristController = {

  addPsychiatrist: async (req, res) => {
    const { name, hospitalId ,patients} = req.body;

    try {
      const newPsychiatrist = new Psychiatrist({
        name,
        hospitalId,
        patients
      });

      const savedPsychiatrist = await newPsychiatrist.save();
      res.json({savedPsychiatrist,message:"Psychiatrist added Successfully!!"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllPsychiatrists: async (req, res) => {
    try {
      const psychiatrists = await Psychiatrist.find();
      res.json(psychiatrists);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getPsychiatristsByHospital: async (req, res) => {
    const { hospitalId } = req.params;

    try {
      const psychiatrists = await Psychiatrist.find({ hospitalId }).populate('hospitalId patients');
      res.json(psychiatrists);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getPsychiatristDetails: async (req, res) => {
    const { psychiatristId } = req.params;

    try {
      const psychiatrist = await Psychiatrist.findOne({_id: psychiatristId}).populate('hospitalId patients');

      if (!psychiatrist) {
        return res.status(404).json({ error: 'Psychiatrist not found' });
      }

      const psychiatristDetails = {
        id: psychiatrist._id,
        name: psychiatrist.name,
        hospitalName: psychiatrist.hospitalId.name,
        patientsCount: psychiatrist.patients.length,
        patients:psychiatrist.patients,
      };

      res.json(psychiatristDetails);
    } catch (error) {
      console.error('Error in getPsychiatristDetails:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = psychiatristController;
