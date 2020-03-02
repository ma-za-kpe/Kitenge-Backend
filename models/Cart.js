const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    item: {
        type: mongoose.Schema.ObjectId,
        ref: 'Item',
        required: true
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

//cascade delete cart items when a cartItem is deleted
CartSchema.pre('remove', async function (next) {
    await this.model('Item').deleteMany({
        kiosk: this._id
    });
    next();
});

//reverse populate with virtuals (field called cartItems and an array for all the items in that kiosk.)
CartSchema.virtual('cartItems', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'Cart',
    justOne: false
});

module.exports = mongoose.model('Cart', CartSchema, 'cart');