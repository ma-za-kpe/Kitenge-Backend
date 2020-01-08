var express = require('express');
//model
const User = require('../models/User');
// controllers
const AdminController = require('../controllers/admin');

const router = express.Router({
  mergeParams: true
});

const advancedResults = require('../middleware/advancedResults');
const ProtectionController = require('../middleware/auth');


router.use(ProtectionController.protect);
router.use(ProtectionController.authorize('admin'));

router
  .route('/')
  .get(advancedResults(User), AdminController.getUsers)
  .post(AdminController.createUser);

router
  .route('/:id')
  .get(AdminController.getUser)
  .put(AdminController.updateUser)
  .delete(AdminController.deleteUser);

module.exports = router;