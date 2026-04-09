const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, 'Please enter user']
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId, ref: "Vehicle",
        required: [true, 'Please enter your vehicle']

    },
    Date: {
        type: Date,
        required: [true, 'Please enter your Date']

    },

    totalAmount: {
        type: Number,
        required: [true, 'Please enter totalAmount']
    },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
