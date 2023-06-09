const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invertorySchema = new Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    Product_name: { type: String, required: true },
    MRP: { type: Number, required: true },
    SP: { type: Number, required: true },
    QTY: { type: Number, default: '1' },
    multiple_IMAGEs: { type: Object, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Inventory', invertorySchema)