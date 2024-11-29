const express = require('express');
const equipmentController = require('../controllers/equipmentController');
const { authenticateToken, verifyFarmer } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(equipmentController.getAllEquipment)
  .post(authenticateToken, verifyFarmer, equipmentController.createEquipment);

router.route('/:id')
  .get(equipmentController.getEquipmentById)
  .put(authenticateToken, verifyFarmer, equipmentController.updateEquipment)
  .delete(authenticateToken, verifyFarmer, equipmentController.deleteEquipment);

module.exports = router;
