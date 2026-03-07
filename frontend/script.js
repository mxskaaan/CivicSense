// Submit Complaint

async function submitComplaint(event) {

event.preventDefault();

try {

const name = document.getElementById("name").value;
const issue = document.getElementById("issue").value;
const location = document.getElementById("location").value;
const photo = document.getElementById("photo").files[0];

const formData = new FormData();

formData.append("name", name);
formData.append("issue", issue);
formData.append("location", location);

if(photo){
formData.append("photo", photo);
}

const response = await fetch(
"https://civicsense-pdca.onrender.com/complaint",
{
method: "POST",
body: formData
}
);

const data = await response.json();

if(response.ok){

alert("Complaint submitted successfully!\nTicket ID: " + data.ticketId);

document.getElementById("complaintForm").reset();

}
else{

alert("Error submitting complaint");

}

} catch(error){

console.error(error);
alert("Server connection error");

}

}