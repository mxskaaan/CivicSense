const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

ticketId:String,
name:String,
issue:String,
location:String,
latitude:String,
longitude:String,
priority:String,
status:String,
photo:String

});

module.exports = mongoose.model("Complaint", complaintSchema);