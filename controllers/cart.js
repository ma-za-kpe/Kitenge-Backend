const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const Cart = require("../models/Cart");
const Item = require("../models/Item");

module.exports = {
    // @desc  Get all items
    // @route  GET /api/v1/kiosks
    // @route  GET /api/v1/kiosks/:kioskId/vendors/:vendorId/cartItem
    // @access  Public
    getAllCartItems: asyncHandler(async (req, res, next) => {
        if (req.params.itemId) {
            const cartItems = await Cart.find({
                item: req.params.itemId
            });

            return res.status(200).json({
                success: true,
                count: cartItems.length,
                data: cartItems
            });
        } else {
            res.status(200).json(res.advancedResults);
        }
    }),

    // // @desc  Get single item
    // // @route  GET /api/v1/item/id
    // // @access  Public
    // getOneItem: asyncHandler(async (req, res, next) => {
    //     const item = await Item.findById(req.params.id).populate({
    //         path: "item",
    //         select: "name description"
    //     });

    //     if (!item) {
    //         return next(
    //             new errorResponse(`item not found with id of ${req.params.id}`, 400)
    //         );
    //     }

    //     res.status(201).json({
    //         success: true,
    //         data: item
    //     });
    // }),

    // @desc  Create item
    // @route  POST /api/v1/item/:itemId/cartItem
    //@access  Private
    createCartItem: asyncHandler(async (req, res, next) => {
        req.body.item = req.params.itemId;
        req.body.user = req.user.id;

        console.log("Item id :" + req.body.item);

        const item = await Item.findById(req.params.itemId);

        if (!item) {
            return next(
                new ErrorResponse(`No Item with the id of ${req.params.itemId}`, 404)
            );
        }

        const cart = await Cart.create(req.body);

        res.status(201).json({
            success: true,
            msg: `cart item added Successfully ...`,
            data: cart
        });
    }),

    // // @desc  Update item
    // // @route  PUT /api/v1/items/id
    // // @access  Private
    // updateItem: asyncHandler(async (req, res, next) => {
    //     console.log("id is ........" + req.params.id);
    //     let item = await Item.findById(req.params.id);

    //     if (!item) {
    //         return next(
    //             new errorResponse(`No item with the id of ${req.params.id}`, 404)
    //         );
    //     }

    //     // Make sure user is item owner
    //     if (item.user.toString() !== req.user.id && req.user.role !== "admin") {
    //         return next(
    //             new errorResponse(
    //                 `User ${req.user.id} is not authorized to update item ${item._id}`,
    //                 401
    //             )
    //         );
    //     }

    //     item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    //         new: true,
    //         runValidators: true
    //     });

    //     if (!item) {
    //         return next(
    //             new errorResponse(`item not found with id of ${req.params.id}`, 400)
    //         );
    //     }

    //     res.status(201).json({
    //         success: true,
    //         msg: `item Updated`,
    //         data: item
    //     });
    // }),

    // // @desc  Delete item
    // // @route  DELETE /api/v1/items/id
    // // @access  Private
    // deleteItem: asyncHandler(async (req, res, next) => {
    //     console.log("id is ........" + req.params.id);
    //     const item = await Item.findById(req.params.id);

    //     if (!item) {
    //         return next(
    //             new errorResponse(`No item with the id of ${req.params.id}`, 404)
    //         );
    //     }

    //     // Make sure user is item owner
    //     if (item.user.toString() !== req.user.id && req.user.role !== "admin") {
    //         return next(
    //             new errorResponse(
    //                 `User ${req.user.id} is not authorized to delete item ${item._id}`,
    //                 401
    //             )
    //         );
    //     }

    //     await item.remove();

    //     res.status(201).json({
    //         success: true,
    //         msg: `item Deleted`,
    //         data: {}
    //     });
    // })
};