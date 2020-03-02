var express = require('express');

//other resource routers
const cartRouter = require('./cart');

// controllers
const ItemController = require('../controllers/item');

const Item = require('../models/Item');
const advancedResults = require('../middleware/advancedResults')
const ProtectionController = require('../middleware/auth');

//merging params
const router = express.Router({
    mergeParams: true
});

// //re-route into other resources routers
router.use('/:itemId/cartItem', cartRouter);


/* GET and POST  all item listing. */
router.route('/')
    .get(advancedResults(Item, {
        path: 'item',
        select: 'name description'
    }), ItemController.getAllItems)
    .post(ProtectionController.protect, ProtectionController.authorize("vendor", "admin"), ItemController.createItem);

/* GET and POST  all Items listing. */
router.route('/:id').get(ItemController.getOneItem).put(ProtectionController.protect, ProtectionController.authorize("publisher", "admin"), ItemController.updateItem).delete(ProtectionController.protect, ProtectionController.authorize("vendor", "admin"), ItemController.deleteItem);



module.exports = router;