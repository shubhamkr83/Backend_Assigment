const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sellerSchema = new Schema({
    email: { type: String, required: true },
    business_name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Cpassword: { type: String, required: true },
    role: { type: String, default: 'seller' }
}, { timestamps: true })

module.exports = mongoose.model('Seller', sellerSchema)