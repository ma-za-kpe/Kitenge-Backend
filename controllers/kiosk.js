const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');


const Kiosk = require("../models/Kiosk");

module.exports = {
    // @desc  Get all kiosks
    // @route  GET /api/v1/kiosks
    // @access  Public
    getAllKiosks: asyncHandler(async (req, res) => {

        res.status(200).json(res.advancedResults);

    }),

    // @desc  Get single kiosk
    // @route  GET /api/v1/kiosks/id
    // @access  Public
    getOneKiosk: asyncHandler(async (req, res, next) => {
        const kiosk = await Kiosk.findById(req.params.id);

        if (!kiosk) {
            return next(new errorResponse(`Kiosk not found with id of ${req.params.id}`, 400))
        }

        res.status(201).json({
            success: true,
            msg: `Kiosk found`,
            data: kiosk
        });

    }),

    // @desc  Create kiosk
    // @route  POST /api/v1/kiosks
    // @access  Private
    createKiosk: asyncHandler(async (req, res, next) => {

        // Add user to req,body
        req.body.user = req.user.id;

        // Check for published Kiosk
        const publishedKiosk = await Kiosk.findOne({
            user: req.user.id
        });

        // If the user is not an admin, they can only add one Kiosk
        if (publishedKiosk && req.user.role !== 'admin') {
            return next(
                new errorResponse(
                    `The user with ID ${req.user.id} has already published a Kiosk`,
                    400
                )
            );
        }

        const kiosk = await Kiosk.create(req.body);

        res.status(201).json({
            success: true,
            msg: `Kiosk created Successfully ...`,
            data: kiosk
        });

    }),

    // @desc  Update kiosk
    // @route  PUT /api/v1/kiosks/id
    // @access  Private
    updateKiosk: asyncHandler(async (req, res, next) => {

        console.log("id is ........" + req.params.id)

        let kiosk = await Kiosk.findById(req.params.id);

        if (!kiosk) {
            return next(
                new errorResponse(`Kiosk not found with id of ${req.params.id}`, 404)
            );
        }

        // Make sure user is kiosk owner
        if (kiosk.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(
                new errorResponse(
                    `User ${req.params.id} is not authorized to update this Kiosk`,
                    401
                )
            );
        }

        kiosk = await Kiosk.findOneAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: kiosk
        });

    }),

    // @desc  Delete kiosk
    // @route  DELETE /api/v1/kiosks/id
    // @access  Private
    deleteKiosk: asyncHandler(async (req, res, next) => {

        console.log("id is ........" + req.params.id)

        const kiosk = await Kiosk.findById(req.params.id);

        if (!kiosk) {
            return next(
                new errorResponse(`Kiosk not found with id of ${req.params.id}`, 404)
            );
        }

        // Make sure user is kiosk owner
        if (kiosk.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(
                new errorResponse(
                    `User ${req.params.id} is not authorized to delete this kiosk`,
                    401
                )
            );
        }

        kiosk.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    }),

    // @desc      Upload photo for kiosk
    // @route     PUT /api/v1/kiosks/:id/photo
    // @access    Private
    kioskPhotoUpload: asyncHandler(async (req, res, next) => {
        const kiosk = await Kiosk.findById(req.params.id);

        if (!kiosk) {
            return next(
                new errorResponse(`kiosk not found with id of ${req.params.id}`, 404)
            );
        }

        // Make sure user is kiosk owner
        if (kiosk.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(
                new errorResponse(
                    `User ${req.params.id} is not authorized to update this kiosk photo`,
                    401
                )
            );
        }

        if (!req.files) {
            return next(new errorResponse(`Please upload a file`, 400));
        }

        const file = req.files.file;

        // Make sure the image is a photo
        if (!file.mimetype.startsWith('image')) {
            return next(new errorResponse(`Please upload an image file`, 400));
        }

        // Check filesize
        if (file.size > process.env.MAX_FILE_UPLOAD) {
            return next(
                new errorResponse(
                    `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
                    400
                )
            );
        }

        // Create custom filename
        file.name = `photo_${kiosk._id}${path.parse(file.name).ext}`;
        console.log("----------" + file.name)

        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
            if (err) {
                console.error(err);
                return next(new errorResponse(`Problem with file upload`, 500));
            }

            await Kiosk.findByIdAndUpdate(req.params.id, {
                photo: file.name
            });

            res.status(200).json({
                success: true,
                data: file.name
            });
        });
    })
}