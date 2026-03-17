const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter vehicalname']
    },
    brand: {
        type: String,
        required: [true, 'Please enter brand']
    },
    type: {
        type: String, enum: ["Car", "Bike"],
        required: [true, 'Please enter types']
    },
    numberPlate: {
        type: String,
        required: [true, 'Please enter numberplate'],

        unique: true
    },
    rentPerDay: {
        type: Number,
        required: [true, 'Please enter rentpPerDay']
    },
    status: {
        type: String,
        enum: ["Available", "Booked", "Maintenance"],
        default: "Available"
    },
    image: {
        type: String,
        required: [true, 'Please upload image']
    },
    location: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Location" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
