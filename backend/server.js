const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const Complaint = require("./complaintModel");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

mongoose.connect("YOUR_MONGODB_ATLAS_URL",{
useNewUrlParser:true,
useUnifiedTopology:true
});

/* file upload */

const storage = multer.diskStorage({

destination:function(req,file,cb){
cb(null,"uploads/");
},

filename:function(req,file,cb){
cb(null,Date.now()+"-"+file.originalname);
}

});

const upload = multer({storage:storage});

/* submit complaint */

app.post("/complaint",upload.single("photo"),async(req,res)=>{

try{

let issueText = req.body.issue.toLowerCase();

let priority = "Normal";

if(issueText.includes("hospital") ||
issueText.includes("school") ||
issueText.includes("accident") ||
issueText.includes("fire")){

priority = "High";

}

/* generate ticket id */

let ticketId = "CS-" + Math.floor(100000 + Math.random()*900000);

const complaint = new Complaint({

ticketId:ticketId,

name:req.body.name,
issue:req.body.issue,
location:req.body.location,
latitude:req.body.latitude,
longitude:req.body.longitude,
priority:priority,
status:"Pending",
photo:req.file?req.file.filename:""

});

await complaint.save();

res.send("Complaint submitted. Ticket ID: " + ticketId);

}

catch(err){

res.status(500).send("Error saving complaint");

}

});

/* get complaints */

app.get("/complaints",async(req,res)=>{

const complaints = await Complaint.find();

res.json(complaints);

});

/* update status */

app.post("/updateStatus",async(req,res)=>{

await Complaint.findByIdAndUpdate(req.body.id,{
status:req.body.status
});

res.send("Status Updated");

});

app.listen(5000,()=>{

console.log("Server running on port 5000");

});