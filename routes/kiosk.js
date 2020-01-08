var express = require('express');

//other resource routers
const itemRouter = require('./item');
const reviewRouter = require('./reviews');


const Kiosk = require('../models/Kiosk');
const advancedResults = require('../middleware/advancedResults');
const ProtectionController = require('../middleware/auth');

var router = express.Router();

//re-route into other resources routers
router.use('/:kioskId/courses', courseRouter);
router.use('/:kioskId/reviews', reviewRouter);

// controllers
const KioskController = require('../controllers/kiosk');

/* GET and POST  all Kiosk listing. */
router.route('/').get(advancedResults(Kiosk, 'items'), KioskController.getAllKiosks).post(ProtectionController.protect, ProtectionController.authorize("vendor", "admin"), KioskController.createKiosk);

/* GET bootcamp listing, UPDATE bootcamp listing, DELETE bootcamp listing. */
router.route('/:id').get(KioskController.getOneKiosk).put(ProtectionController.protect, ProtectionController.authorize("vendor", "admin"), KioskController.updateKiosks).delete(ProtectionController.protect, ProtectionController.authorize("vendor", "admin"), KioskController.deleteKiosks);

/* upload photo */
router.route('/:id/photo').put(ProtectionController.protect, ProtectionController.authorize("vendor", "admin"), KioskController.kioskPhotoUpload);
module.exports = router;