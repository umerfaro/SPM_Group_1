const express = require('express');
const equipmentController = require('../controllers/equipmentController');
const { authenticateToken, verifyFarmer } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(equipmentController.getAllEquipment)
  .post(authenticateToken, equipmentController.createEquipment);

router.route('/:id')
  .get(equipmentController.getEquipmentById)
  .put( equipmentController.updateEquipment)
  .delete(authenticateToken, equipmentController.deleteEquipment);

module.exports = router;
