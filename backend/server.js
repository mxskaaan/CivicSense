const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const Complaint = require("./complaintModel");

const app = express();

/* ---------------- Middleware ---------------- */

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ---------------- MongoDB Connection ---------------- */

mongoose.connect(
"mongodb+srv://civicsense:MKDigital%40153@cluster0.vgrfm6d.mongodb.net/civicsense?retryWrites=true&w=majority",
{
useNewUrlParser:true,
useUnifiedTopology:true
}
)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log("MongoDB Error:",err));

/* ---------------- File Upload ---------------- */

const storage = multer.diskStorage({

destination:function(req,file,cb){
cb(null,"uploads/");
},

filename:function(req,file,cb){
cb(null,Date.now()+"-"+file.originalname);
}

});

const upload = multer({storage});

/* ---------------- Root Route ---------------- */

app.get("/",(req,res)=>{
res.send("CivicSense Backend Running");
});

/* ---------------- Submit Complaint ---------------- */

app.post("/complaint",upload.single("photo"),async(req,res)=>{

try{

let issueText = req.body.issue.toLowerCase();
let priority="Normal";

if(
issueText.includes("hospital") ||
issueText.includes("school") ||
issueText.includes("accident") ||
issueText.includes("fire")
){
priority="High";
}

let ticketId="CS-"+Math.floor(100000+Math.random()*900000);

const complaint=new Complaint({

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

res.json({
message:"Complaint submitted",
ticketId
});

}catch(err){

console.log("Complaint save error:",err);
res.status(500).json(err);

}

});

/* ---------------- Get Complaints ---------------- */

app.get("/complaints",async(req,res)=>{

try{

const complaints = await Complaint.find({});
res.json(complaints);

}catch(err){

console.log("REAL ERROR:",err);
res.status(500).json(err);

}

});

/* ---------------- Update Status ---------------- */

app.post("/updateStatus",async(req,res)=>{

try{

await Complaint.findByIdAndUpdate(req.body.id,{
status:req.body.status
});

res.json({message:"Status Updated"});

}catch(err){

console.log("Update error:",err);
res.status(500).json(err);

}

});

/* ---------------- Server ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log("Server running on port "+PORT);

});