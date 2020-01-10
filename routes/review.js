const express = require('express');

const Review = require('../models/Review');

const router = express.Router({
    mergeParams: true
});

const advancedResults = require('../middleware/advancedResults');
const ProtectionController = require('../middleware/auth');

//controllers
const ReviewController = require('../controllers/review');

router
    .route('/')
    .get(advancedResults(Review, {
        path: 'kiosk',
        select: 'name description'
    }), ReviewController.getReviews)
    .post(ProtectionController.protect, ProtectionController.authorize('user', 'admin'), ReviewController.addReview);

router
    .route('/:id')
    .get(ReviewController.getReview)
    .put(ProtectionController.protect, ProtectionController.authorize('user', 'admin'), ReviewController.updateReview)
    .delete(ProtectionController.protect, ProtectionController.authorize('user', 'admin'), ReviewController.deleteReview);

module.exports = router;