const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add an item title']
    },
    description: {
        type: String,
        required: [true, 'Please add an item description']
    },
    price: {
        type: Number,
        trim: true,
        required: [true, 'Please add an item title']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    kiosk: {
        type: mongoose.Schema.ObjectId,
        ref: 'Kiosk',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Item', ItemSchema, 'item');