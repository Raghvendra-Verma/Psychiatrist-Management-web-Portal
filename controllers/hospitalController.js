const Psychiatrist = require("../models/psychiatristModel");
const Patient = require("../models/patientModel");
const Hospital = require("../models/hospitalModel");

const hospitalController = {
  addHospital: async (req, res) => {
    const { id ,name } = req.body;

    try {
      const newHospital = new Hospital({
        id,
        name,
      });

      const savedHospital = await newHospital.save();
      res.status(200).json({savedHospital,message:"Hospital Added Successfully!!"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllHospitals: async (req, res) => {
    try {
      const hospitals = await Hospital.find();
      res.json(hospitals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getHospitalDetails: async (req, res) => {
    const { hospitalId } = req.params;

    try {
      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ error: "Hospital not found" });
      }

      // Fetch all psychiatrists for the specified hospital
      const psychiatrists = await Psychiatrist.find({ hospitalId }).populate(
        "patients"
      );

      // Count the total number of patients in the hospital
      const totalPatientsCount = psychiatrists.reduce(
        (count, psychiatrist) => count + psychiatrist.patients.length,
        0
      );

      // Prepare the response object
      const hospitalDetails = {
        hospitalName: hospital.name,
        psychiatristsCount: psychiatrists.length,
        totalPatientsCount,
        psychiatristDetails: psychiatrists.map((psychiatrist) => ({
          id: psychiatrist._id,
          name: psychiatrist.name,
          patientsCount: psychiatrist.patients.length,
        })),
      };

      res.json(hospitalDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = hospitalController;
