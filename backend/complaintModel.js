const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({

ticketId: String,

name: String,

issue: String,

location: String,

latitude: Number,

longitude: Number,

priority: String,

status: String,

photo: String

});

module.exports = mongoose.model("Complaint", ComplaintSchema);