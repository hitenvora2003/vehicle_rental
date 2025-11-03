const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Please enter your code'],
        unique: [true,'code already exists. Please use a different one.']
    },     
    discountType: { type: String, enum: ["percentage", "flat"], default: "percentage" },
    discountValue: {
        type: Number,
        required: [true, 'Please enter your discountValue']
    },        
    expiryDate: {
        type: Date, required: [true, 'Please enter expirydate']
    },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Coupon", couponSchema);
