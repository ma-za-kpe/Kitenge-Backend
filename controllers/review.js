const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Kiosk = require('../models/Kiosk');

module.exports = {
    // @desc      Get reviews
    // @route     GET /api/v1/reviews
    // @route     GET /api/v1/kiosks/:kioskId/reviews
    // @access    Public
    getReviews: asyncHandler(async (req, res, next) => {
        if (req.params.kioskId) {
            const reviews = await Review.find({
                kiosk: req.params.kioskId
            });

            return res.status(200).json({
                success: true,
                count: reviews.length,
                data: reviews
            });
        } else {
            res.status(200).json(res.advancedResults);
        }
    }),

    // @desc      Get single review
    // @route     GET /api/v1/reviews/:id
    // @access    Public
    getReview: asyncHandler(async (req, res, next) => {
        const review = await Review.findById(req.params.id).populate({
            path: 'kiosk',
            select: 'name description'
        });

        if (!review) {
            return next(
                new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
            );
        }

        res.status(200).json({
            success: true,
            data: review
        });
    }),

    // @desc      Add review
    // @route     POST /api/v1/kiosks/:kioskId/reviews
    // @access    Private
    addReview: asyncHandler(async (req, res, next) => {
        console.log("boss bitch")
        req.body.kiosk = req.params.kioskId;
        req.body.user = req.user.id;

        const kiosk = await Kiosk.findById(req.params.kioskId);

        if (!kiosk) {
            return next(
                new ErrorResponse(
                    `No kiosk with the id of ${req.params.kioskId}`,
                    404
                )
            );
        }

        const review = await Review.create(req.body);

        res.status(201).json({
            success: true,
            data: review
        });
    }),

    // @desc      Update review
    // @route     PUT /api/v1/reviews/:id
    // @access    Private
    updateReview: asyncHandler(async (req, res, next) => {
        let review = await Review.findById(req.params.id);

        if (!review) {
            return next(
                new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
            );
        }

        // Make sure review belongs to user or user is admin
        if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse(`Not authorized to update review`, 401));
        }

        review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: review
        });
    }),

    // @desc      Delete review
    // @route     DELETE /api/v1/reviews/:id
    // @access    Private
    deleteReview: asyncHandler(async (req, res, next) => {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return next(
                new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
            );
        }

        // Make sure review belongs to user or user is admin
        if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse(`Not authorized to delete review`, 401));
        }

        await review.remove();

        res.status(200).json({
            success: true,
            data: {}
        })
    })
}