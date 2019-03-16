const mongoose = require("mongoose");
const schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    address: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    },
    category: {
        type: String
    },
    panNumber: {
        type: String
    },
    bloodGroup: {
        type: String
    },
    salary: {
        type: Number,
    },
    profilePicture: {
        type: String
    },
    status: {
        type: Boolean
    },
    contact: {
        type: String
    },
    dob: {
        type: Date
    },
    attendence: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendence'
    }],
    teamLead: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});
module.exports = mongoose.model("User", schema);