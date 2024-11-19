const express = require('express');
const equipmentController = require('../controllers/equipmentController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
    .get(equipmentController.getAllEquipment)
    .post(authenticateToken, equipmentController.createEquipment); // Only authenticated users can create equipment

router.route('/:id')
    .get(equipmentController.getEquipmentById)
    .put(authenticateToken, equipmentController.updateEquipment)
    .delete(authenticateToken, equipmentController.deleteEquipment);

module.exports = router;
