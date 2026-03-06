const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const Complaint = require("./complaintModel");

const app = express();

/* middleware */

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

/* MongoDB connection */

mongoose.connect(
"mongodb+srv://civicsense:MKDigital%40153@cluster0.vgrfm6d.mongodb.net/civicsense?retryWrites=true&w=majority",
{
useNewUrlParser:true,
useUnifiedTopology:true
}
)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

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

if(
issueText.includes("hospital") ||
issueText.includes("school") ||
issueText.includes("accident") ||
issueText.includes("fire")
){
priority = "High";
}

/* ticket id */

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

console.log(err);
res.status(500).send("Error saving complaint");

}

});

/* get complaints */

app.get("/complaints",async(req,res)=>{

try{

const complaints = await Complaint.find().sort({_id:-1});
res.json(complaints);

}

catch(err){

res.status(500).send("Error fetching complaints");

}

});

/* update status */

app.post("/updateStatus",async(req,res)=>{

try{

await Complaint.findByIdAndUpdate(req.body.id,{
status:req.body.status
});

res.send("Status Updated");

}

catch(err){

res.status(500).send("Error updating status");

}

});

/* root route */

app.get("/",(req,res)=>{
res.send("CivicSense Backend Running");
});

/* server */

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log("Server running on port " + PORT);

});