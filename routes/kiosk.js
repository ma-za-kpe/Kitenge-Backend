var express = require('express');

//other resource routers
const itemRouter = require('./item');
const reviewRouter = require('./review');


const Kiosk = require('../models/Kiosk');
const advancedResults = require('../middleware/advancedResults');
const ProtectionController = require('../middleware/auth');

var router = express.Router();

// //re-route into other resources routers
router.use('/:kioskId/items', itemRouter);
router.use('/:kioskId/reviews', reviewRouter);

// controllers
const KioskController = require('../controllers/kiosk');

/* GET and POST  all Kiosk listing. */
router.route('/').get(advancedResults(Kiosk, 'items'), KioskController.getAllKiosks).post(ProtectionController.protect, ProtectionController.authorize("vendor", "admin"), KioskController.createKiosk);

/* GET kiosk listing, UPDATE kiosk listing, DELETE kiosk listing. */
router.route('/:id').get(KioskController.getOneKiosk).put(ProtectionController.protect, ProtectionController.authorize("vendor", "admin"), KioskController.updateKiosk).delete(ProtectionController.protect, ProtectionController.authorize("vendor", "admin"), KioskController.deleteKiosk);

/* upload photo */
router.route('/:id/photo').put(ProtectionController.protect, ProtectionController.authorize("vendor", "admin"), KioskController.kioskPhotoUpload);
module.exports = router;