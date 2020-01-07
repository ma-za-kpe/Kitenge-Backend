var express = require('express');
//model
const User = require('../models/User');
// controllers
const UserController = require('../controllers/user');

const router = express.Router({
  mergeParams: true
});

const advancedResults = require('../middleware/advancedResults');
const ProtectionController = require('../middleware/auth');


router.use(ProtectionController.protect);
router.use(ProtectionController.authorize('admin'));

router
  .route('/')
  .get(advancedResults(User), UserController.getUsers)
  .post(UserController.createUser);

router
  .route('/:id')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;