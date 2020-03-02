var express = require('express');

// controllers
const CartController = require('../controllers/cart');

const CartItem = require('../models/Cart');
const advancedResults = require('../middleware/advancedResults')
const ProtectionController = require('../middleware/auth');

//merging params
const router = express.Router({
    mergeParams: true
});

/* GET and POST  all item listing. */
router.route('/')
    .get(advancedResults(CartItem, {
        path: 'item',
        select: 'name description price'
    }), CartController.getAllCartItems)
    .post(ProtectionController.protect, ProtectionController.authorize("user", "admin"), CartController.createCartItem);

// /* GET and POST  all Items listing. */
// router.route('/:id').get(ItemController.getOneItem).put(ProtectionController.protect, ProtectionController.authorize("publisher", "admin"), ItemController.updateItem).delete(ProtectionController.protect, ProtectionController.authorize("vendor", "admin"), ItemController.deleteItem);



module.exports = router;