// =============================
// GLOBAL VARIABLES
// =============================

let userLat = "";
let userLon = "";

const API_URL = "https://civicsense-pdca.onrender.com";


// =============================
// GET USER LOCATION
// =============================

function getLocation() {

if (!navigator.geolocation) {
alert("Geolocation not supported by browser");
return;
}

const locationInput = document.getElementById("location");
locationInput.value = "Detecting location...";

navigator.geolocation.getCurrentPosition(

function(position){

userLat = position.coords.latitude;
userLon = position.coords.longitude;

locationInput.value =
userLat.toFixed(6) + ", " + userLon.toFixed(6);

reverseGeocode(userLat,userLon);

},

function(error){

locationInput.value="";

alert("Unable to detect location");

}

);

}



// =============================
// REVERSE GEOCODE
// =============================

function reverseGeocode(lat,lon){

fetch("https://civicsense-pdca.onrender.com/complaint", {
  method: "POST",
  body: formData
})

.then(res=>res.json())

.then(data=>{

if(data.display_name){
document.getElementById("location").value = data.display_name;
}

})

.catch(err=>{

console.log("Geocode error",err);

});

}



// =============================
// SUBMIT COMPLAINT
// =============================

function submitComplaint(event){

if(event){
event.preventDefault();
}

const name = document.getElementById("name").value.trim();
const issue = document.getElementById("issue").value.trim();
const location = document.getElementById("location").value.trim();
const fileInput = document.getElementById("photo");

if(!name){
alert("Please enter your name");
return;
}

if(!issue){
alert("Please describe the issue");
return;
}

if(!location){
alert("Please enter location");
return;
}


// create form data

const formData = new FormData();

formData.append("name",name);
formData.append("issue",issue);
formData.append("location",location);
formData.append("latitude",userLat);
formData.append("longitude",userLon);

if(fileInput.files.length > 0){
formData.append("photo",fileInput.files[0]);
}



// submit to backend

fetch(API_URL + "/complaint",{

method:"POST",
body:formData

})

.then(res=>res.text())

.then(data=>{

alert(data);

document.getElementById("complaintForm").reset();

userLat="";
userLon="";

document.getElementById("previewContainer").style.display="none";

})

.catch(err=>{

console.log(err);

alert("Error submitting complaint");

});

}



// =============================
// IMAGE PREVIEW
// =============================

function previewImage(event){

const file = event.target.files[0];

if(!file) return;

const img = document.getElementById("preview");
const container = document.getElementById("previewContainer");

img.src = URL.createObjectURL(file);

container.style.display = "block";

}



// =============================
// LOCATION AUTOCOMPLETE
// =============================

let locationTimeout;

function searchNearbyLocations(query){

clearTimeout(locationTimeout);

if(query.length < 3){

document.getElementById("locationSuggestions").style.display="none";

return;

}

locationTimeout = setTimeout(async ()=>{

try{

const response = await fetch(

`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`

);

const results = await response.json();

showLocationSuggestions(results);

}catch(err){

console.log(err);

}

},500);

}



function showLocationSuggestions(results){

const div = document.getElementById("locationSuggestions");

div.innerHTML = results.map(r=>`

<div onclick="selectLocation('${r.display_name}',${r.lat},${r.lon})"
style="padding:10px;border-bottom:1px solid #eee;cursor:pointer">

📍 ${r.display_name}

</div>

`).join("");

div.style.display="block";

}



function selectLocation(name,lat,lon){

document.getElementById("location").value=name;

userLat = lat;
userLon = lon;

document.getElementById("locationSuggestions").style.display="none";

}



// =============================
// VOICE INPUT
// =============================

function startVoiceInput(){

if(!("webkitSpeechRecognition" in window)){
alert("Voice input not supported");
return;
}

const recognition = new webkitSpeechRecognition();

recognition.lang = "en-US";

recognition.onresult = function(e){

document.getElementById("issue").value = e.results[0][0].transcript;

};

recognition.start();

}