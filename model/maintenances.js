const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId, ref: "Vehicle",
        required: [true, 'Please enter vehicle name']
    },
    issue: {
        type: String,
        required: [true, 'Please enter your issue']
    },
    startDate: {
        type: Date,
        required: [true, 'Please enter startdate']
    },
    endDate: {
        type: Date,
        required: [true, 'Please enter enddate']
    },
    cost: {
        type: Number,
        required: [true, 'Please enter cost']
    },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    notes: String
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);
