// Global variables for location
let userLat = "";
let userLon = "";

// Get user's current location
function getLocation() {

  if (navigator.geolocation) {

    const locationInput = document.getElementById("location");
    locationInput.value = "Detecting location...";

    navigator.geolocation.getCurrentPosition(

      function(position){

        userLat = position.coords.latitude;
        userLon = position.coords.longitude;

        document.getElementById("location").value =
        `${userLat.toFixed(6)}, ${userLon.toFixed(6)}`;

        reverseGeocode(userLat,userLon);

      },

      function(error){

        document.getElementById("location").value = "";

        switch(error.code){

          case error.PERMISSION_DENIED:
          alert("Location access denied");
          break;

          case error.POSITION_UNAVAILABLE:
          alert("Location unavailable");
          break;

          case error.TIMEOUT:
          alert("Location request timeout");
          break;

          default:
          alert("Unknown location error");

        }

      }

    );

  }
  else{

    alert("Geolocation not supported by browser");

  }

}


// Convert coordinates to readable address
function reverseGeocode(lat,lon){

fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)

.then(res=>res.json())

.then(data=>{

if(data.display_name){

document.getElementById("location").value=data.display_name;

}

})

.catch(err=>{

console.log("Reverse geocode failed");

});

}



// Submit complaint
function submitComplaint(){

const name=document.getElementById("name").value.trim();
const issue=document.getElementById("issue").value.trim();
const location=document.getElementById("location").value.trim();
const fileInput=document.getElementById("photo");

if(!name){
alert("Please enter name");
return;
}

if(!issue){
alert("Please describe issue");
return;
}

if(!location){
alert("Please detect location");
return;
}

const formData=new FormData();

formData.append("name",name);
formData.append("issue",issue);
formData.append("location",location);
formData.append("latitude",userLat);
formData.append("longitude",userLon);

if(fileInput.files.length>0){
formData.append("photo",fileInput.files[0]);
}

const submitBtn=document.querySelector('button[type="submit"]');
submitBtn.innerHTML="Submitting...";
submitBtn.disabled=true;


// IMPORTANT → using deployed backend
fetch("https://civicsense-pdca.onrender.com/complaint",{

method:"POST",
body:formData

})

.then(res=>res.text())

.then(data=>{

alert(data);

document.getElementById("complaintForm").reset();

submitBtn.innerHTML="Submit Complaint";
submitBtn.disabled=false;

})

.catch(err=>{

console.error(err);

alert("Error submitting complaint");

submitBtn.innerHTML="Submit Complaint";
submitBtn.disabled=false;

});

}



// Image preview
function previewImage(event){

const file=event.target.files[0];

if(file){

if(!file.type.startsWith("image/")){
alert("Select valid image file");
event.target.value="";
return;
}

if(file.size>5*1024*1024){
alert("Image must be under 5MB");
event.target.value="";
return;
}

const img=document.getElementById("preview");
const container=document.getElementById("previewContainer");

img.src=URL.createObjectURL(file);
container.style.display="block";

}

}