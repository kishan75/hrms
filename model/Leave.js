const mongoose = require("mongoose");
const schema = mongoose.Schema({
    leavetype: {
        type: String
    },
    from: {
        type: Date,
        default: Date.now
    },
    to: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String
    },
    toBeApproved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    approvedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isApproved: {
        type: Boolean,
        default: false
    },
    workingdays: {
        type: Number,
        default: 0
    },
    holidays: {
        type: Number,
        default: 0
    },
});
module.exports = mongoose.model("Leave", schema);