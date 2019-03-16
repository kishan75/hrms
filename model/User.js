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
    admin: {
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
    profilePicture:{
        type:String
    },
    status:{
        type:Boolean
    }
});
module.exports = mongoose.model("User", schema);