const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// Add the login route
router.post('/login', userController.loginUser);
router.post('/signup', userController.createUser);

router.route('/:id/PersonalDetails')
  .put(userController.updatePersonalDetails);

router.route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/:id/preferences')
  .put(userController.updatePreferences);

module.exports = router;
