const express = require('express'); 
const router = express();
const psychiatristController = require('../controllers/psychiatristController');


//Endpoint to create psychiatrist
router.post('/psychiatrist/create', psychiatristController.addPsychiatrist);

//Endpoint to fetch details for a all psychiatrist
router.get('/psychiatrist/details', psychiatristController.getAllPsychiatrists);

//Endpoint to fetch details for a psychiatrist by hospital
router.get('/psychiatrist/:hospitalId/details', psychiatristController.getPsychiatristsByHospital);


  // Endpoint to fetch details for a specific psychiatrist
  router.get('/psychiatrist/:psychiatristId', psychiatristController.getPsychiatristDetails);

  module.exports = router;
