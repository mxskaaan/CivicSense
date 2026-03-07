let userLat = null
let userLon = null

/* ============================= */
/* Detect User Location */
/* ============================= */

function getLocation(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(position=>{

userLat = position.coords.latitude
userLon = position.coords.longitude

reverseGeocode(userLat,userLon)

})

}else{

alert("Geolocation not supported")

}

}


/* ============================= */
/* Reverse Geocode */
/* ============================= */

function reverseGeocode(lat,lon){

fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)

.then(res=>res.json())

.then(data=>{

if(data.display_name){

document.getElementById("location").value = data.display_name

}

})

}


/* ============================= */
/* Location Search */
/* ============================= */

function searchNearbyLocations(query){

if(query.length < 3){

document.getElementById("locationSuggestions").style.display="none"
return

}

fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)

.then(res=>res.json())

.then(results=>{

const list = document.getElementById("locationSuggestions")

list.innerHTML=""

results.forEach(place=>{

let div = document.createElement("div")

div.innerText = place.display_name

div.style.padding="8px"
div.style.cursor="pointer"

div.onclick = ()=>{

document.getElementById("location").value = place.display_name
userLat = place.lat
userLon = place.lon
list.style.display="none"

}

list.appendChild(div)

})

list.style.display="block"

})

}


/* ============================= */
/* Image Preview */
/* ============================= */

function previewImage(event){

const file = event.target.files[0]

if(file){

const img = document.getElementById("preview")
const container = document.getElementById("previewContainer")

img.src = URL.createObjectURL(file)

container.style.display="block"

}

}


/* ============================= */
/* Submit Complaint */
/* ============================= */

async function submitComplaint(event){

event.preventDefault()

const name = document.getElementById("name").value
const issue = document.getElementById("issue").value
const location = document.getElementById("location").value
const photo = document.getElementById("photo").files[0]

let formData = new FormData()

formData.append("name",name)
formData.append("issue",issue)
formData.append("location",location)
formData.append("latitude",userLat)
formData.append("longitude",userLon)

if(photo){

formData.append("photo",photo)

}

try{

const response = await fetch(
"https://civicsense-pdca.onrender.com/complaint",
{
method:"POST",
body:formData
}
)

const data = await response.json()

alert("Complaint submitted!\nTicket ID: "+data.ticketId)

document.getElementById("complaintForm").reset()

document.getElementById("previewContainer").style.display="none"

}catch(err){

alert("Error submitting complaint")
console.log(err)

}

}