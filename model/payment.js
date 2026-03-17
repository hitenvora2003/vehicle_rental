const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" ,},
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" ,
        required : [true, 'Please enter user']
    },
    amount: {
        type: Number,
        required: [true, 'Please enter amount']
    },
    method: { type: String, enum: ["Card", "UPI", "Cash"], default: "UPI" },
    transactionId: {
        type: String,
        required: [true, 'Please enter your transactionId']
    },
    status: { type: String, enum: ["Pending", "Success", "Failed"], default: "Pending" },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);
