const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Endpoint to resgister a patient
router.post('/patient/registerPatient', patientController.registerPatient);

// Endpoint to get a patient by ID
router.get('/patient/:patientId', patientController.getPatientById);

// Endpoint to update a patient by ID
router.put('/patient/:patientId/update', patientController.updatePatientById);

// Endpoint to delete a patient by ID
router.delete('/patient/:patientId/delete', patientController.deletePatientById);

// Endpoint to fetch the total count of patients
router.get('/patients/totalCount', patientController.getTotalPatientsCount);

module.exports = router;
