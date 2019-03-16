const mongoose = require("mongoose");
const schema = mongoose.Schema({
    entry: {
        type: Date,
        default: Date.now
    },
    exit: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    teamLead: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    checkedByTeamLead: {
        type: Boolean,
        default: false
    },
    purpose: {
        type: String
    }
});
module.exports = mongoose.model("Attendence", schema);