const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors()); // allows frontend requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

/* =========================
   MONGODB CONNECTION
========================= */

mongoose.connect(
"mongodb+srv://civicsense:MKDigital%40153@cluster0.vgrfm6d.mongodb.net/civicsense?retryWrites=true&w=majority",
{
useNewUrlParser: true,
useUnifiedTopology: true
}
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

/* =========================
   COMPLAINT MODEL
========================= */

const complaintSchema = new mongoose.Schema({

ticketId:String,
name:String,
issue:String,
location:String,
latitude:String,
longitude:String,
priority:String,
status:String,
photo:String,

createdAt:{
type:Date,
default:Date.now
}

});

const Complaint = mongoose.model("Complaint", complaintSchema);

/* =========================
   FILE UPLOAD (MULTER)
========================= */

const storage = multer.diskStorage({

destination:function(req,file,cb){
cb(null,"uploads/");
},

filename:function(req,file,cb){
cb(null,Date.now()+"-"+file.originalname);
}

});

const upload = multer({storage});

/* =========================
   ROOT ROUTE
========================= */

app.get("/",(req,res)=>{
res.send("CivicSense Backend Running");
});

/* =========================
   SUBMIT COMPLAINT
========================= */

app.post("/complaint", upload.single("photo"), async(req,res)=>{

try{

let issueText = req.body.issue ? req.body.issue.toLowerCase() : "";

let priority = "Normal";

if(
issueText.includes("hospital") ||
issueText.includes("school") ||
issueText.includes("accident") ||
issueText.includes("fire")
){
priority="High";
}

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
photo:req.file ? req.file.filename : ""

});

await complaint.save();

res.json({
message:"Complaint submitted",
ticketId:ticketId
});

}catch(err){

console.log("SAVE ERROR:",err);

res.status(500).json({
message:"Error saving complaint"
});

}

});

/* =========================
   GET ALL COMPLAINTS
========================= */

app.get("/complaints", async(req,res)=>{

try{

const complaints = await Complaint.find().sort({createdAt:-1});

res.json(complaints);

}catch(err){

console.log("FETCH ERROR:",err);

res.status(500).json({
message:"Error fetching complaints"
});

}

});

/* =========================
   UPDATE STATUS
========================= */

app.post("/updateStatus", async(req,res)=>{

try{

await Complaint.findByIdAndUpdate(req.body.id,{
status:req.body.status
});

res.json({message:"Status updated"});

}catch(err){

console.log("UPDATE ERROR:",err);

res.status(500).json({
message:"Error updating status"
});

}

});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log("Server running on port "+PORT);

});