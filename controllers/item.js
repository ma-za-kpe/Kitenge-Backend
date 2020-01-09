const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const Item = require("../models/Item");
const Kiosk = require("../models/Kiosk");

module.exports = {
    // @desc  Get all items
    // @route  GET /api/v1/kiosks
    // @route  GET /api/v1/kiosks/:kioskId/item
    // @access  Public
    getAllItems: asyncHandler(async (req, res, next) => {
        if (req.params.kioskId) {
            const items = await Item.find({
                kiosk: req.params.kioskId
            });

            return res.status(200).json({
                success: true,
                count: items.length,
                data: items
            });
        } else {
            res.status(200).json(res.advancedResults);
        }
    }),

    // @desc  Get single item
    // @route  GET /api/v1/item/id
    // @access  Public
    getOneItem: asyncHandler(async (req, res, next) => {
        const item = await Item.findById(req.params.id).populate({
            path: "item",
            select: "name description"
        });

        if (!item) {
            return next(
                new errorResponse(`item not found with id of ${req.params.id}`, 400)
            );
        }

        res.status(201).json({
            success: true,
            data: item
        });
    }),
    // @desc  Create item
    // @route  POST /api/v1/kiosk/:kioskId/items
    // @access  Private
    createItem: asyncHandler(async (req, res, next) => {
        req.body.kiosk = req.params.kioskId;
        req.body.user = req.user.id;

        console.log("kiosk id :" + req.body.kiosk);

        const kiosk = await Kiosk.findById(req.params.kioskId);

        if (!kiosk) {
            return next(
                new ErrorResponse(`No kiosk with the id of ${req.params.kioskId}`, 404)
            );
        }

        // Make sure user is kiosks owner
        if (kiosk.user.toString() !== req.user.id && req.user.role !== "admin") {
            return next(
                new errorResponse(
                    `User ${req.user.id} is not authorized to add a item in the kiosk ${kiosk._id}`,
                    401
                )
            );
        }
        const item = await Item.create(req.body);

        res.status(201).json({
            success: true,
            msg: `item created Successfully ...`,
            data: item
        });
    }),

    // @desc  Update item
    // @route  PUT /api/v1/items/id
    // @access  Private
    updateItem: asyncHandler(async (req, res, next) => {
        console.log("id is ........" + req.params.id);
        let item = await Item.findById(req.params.id);

        if (!item) {
            return next(
                new errorResponse(`No item with the id of ${req.params.id}`, 404)
            );
        }

        // Make sure user is item owner
        if (item.user.toString() !== req.user.id && req.user.role !== "admin") {
            return next(
                new errorResponse(
                    `User ${req.user.id} is not authorized to update item ${item._id}`,
                    401
                )
            );
        }

        item = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!item) {
            return next(
                new errorResponse(`item not found with id of ${req.params.id}`, 400)
            );
        }

        res.status(201).json({
            success: true,
            msg: `item Updated`,
            data: item
        });
    }),

    // @desc  Delete item
    // @route  DELETE /api/v1/items/id
    // @access  Private
    deleteItem: asyncHandler(async (req, res, next) => {
        console.log("id is ........" + req.params.id);
        const item = await Item.findById(req.params.id);

        if (!item) {
            return next(
                new errorResponse(`No item with the id of ${req.params.id}`, 404)
            );
        }

        // Make sure user is item owner
        if (item.user.toString() !== req.user.id && req.user.role !== "admin") {
            return next(
                new errorResponse(
                    `User ${req.user.id} is not authorized to delete item ${item._id}`,
                    401
                )
            );
        }

        await item.remove();

        res.status(201).json({
            success: true,
            msg: `item Deleted`,
            data: {}
        });
    })
};