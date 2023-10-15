const express = require('express')
const router = express.Router()
const { addMedicalData } = require('../controllers/medicaldata')    


router.post('/medicaldata', addMedicalData);

module.exports = router;