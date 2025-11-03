const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,
        required : [true, 'Please enter user']
    },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle",
        required : [true, 'Please enter your vehiclename']
    },
    rating: {
        type: Number, min: 1, max: 5,
        required: [true, 'Please enter your rating']
    },
    comment: {
        type: String,
        required: [true, 'Please enter your comment']

    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
