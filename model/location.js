const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your location']
    },
    address: {
        type: String,
        required: [true, 'Please enter your address']
    }
    ,
    latitude: {
        type: Number,
        required: [true, 'Please enter latitude']
    },
    longitude: {
        type: Number,
        required: [true, 'Please enter longitude']
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Location", locationSchema);
