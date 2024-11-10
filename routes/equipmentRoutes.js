const express = require("express");
const router = express.Router();
const { equipmentController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.get("/equipment", authMiddleware.verifyToken, equipmentController.getEquipmentDetails);

module.exports = router;