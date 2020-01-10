const mongoose = require('mongoose');
const slugify = require('slugify');

const KioskcampSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    category: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
            'Art & crafts',
            'kitenge cloth',
            'African shoes',
            'Beeds',
            'Jewellery',
            'Other'
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10']
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
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

//create kiosk slug from the name
KioskcampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {
        lower: true
    })
    next();
});

//cascade delete items when a kiosk is deleted
KioskcampSchema.pre('remove', async function (next) {
    await this.model('Item').deleteMany({
        kiosk: this._id
    });
    next();
});

//reverse populate with virtuals (field called items and an array for all the items in that kiosk.)
KioskcampSchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'kiosk',
    justOne: false
});

//cascade delete items when a kiosk is deleted
KioskcampSchema.pre('remove', async function (next) {
    await this.model('Review').deleteMany({
        kiosk: this._id
    });
    next();
});

//reverse populate with virtuals (field called items and an array for all the items in that kiosk.)
KioskcampSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'kiosk',
    justOne: false
});

module.exports = mongoose.model('Kiosk', KioskcampSchema, "kiosk");