const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeInfoSchema = new Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    address: { type: String, required: true },
    gst: { type: Number, required: true },
    logo: { type: String, required: true },
    store_timings: { type: String, required: true },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    SubCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: false
    }
})

module.exports = mongoose.model('Store', storeInfoSchema)