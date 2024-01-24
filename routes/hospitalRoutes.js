const express = require('express');
const router = express();
const hospitalController = require('../controllers/hospitalController');


// Endpoint to add a new hospital
router.post('/hospital/add', hospitalController.addHospital);

// Endpoint to fetch all hospitals
router.get('/hospitals', hospitalController.getAllHospitals);

// Endpoint to fetch hospital details including psychiatrists and patients
router.get('/hospital/:hospitalId/details', hospitalController.getHospitalDetails);


module.exports = router;