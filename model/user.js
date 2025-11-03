const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: { 
        type: String, unique: [true, 'Email already exists. Please use a different one.'],
        required: [true, 'Please enter your email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    },
    phone: {
        type: Number,
        required: [true, 'Please enter phone no.']
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
