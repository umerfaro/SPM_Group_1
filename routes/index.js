const express = require('express');
const equipmentRoutes = require('./equipmentRoutes');



const router = express.Router();


router.use('/equipment', equipmentRoutes);


module.exports = router;