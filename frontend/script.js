// Global variables for location
let userLat = "";
let userLon = "";

// Get user's current location
function getLocation() {
  if (navigator.geolocation) {
    // Show loading state
    const locationInput = document.getElementById("location");
    locationInput.value = "Detecting location...";

    navigator.geolocation.getCurrentPosition(
      function(position) {
        userLat = position.coords.latitude;
        userLon = position.coords.longitude;

        // Display coordinates
        document.getElementById("location").value = 
          `${userLat.toFixed(6)}, ${userLon.toFixed(6)}`;

        // Optional: Reverse geocode to get address
        reverseGeocode(userLat, userLon);
      },
      function(error) {
        document.getElementById("location").value = "";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("⚠️ Location access denied. Please enable location permissions in your browser.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("⚠️ Location information unavailable.");
            break;
          case error.TIMEOUT:
            alert("⚠️ Location request timed out.");
            break;
          default:
            alert("⚠️ An unknown error occurred while detecting location.");
        }
      }
    );
  } else {
    alert("⚠️ Geolocation is not supported by your browser.");
  }
}

// Reverse geocode coordinates to get readable address
function reverseGeocode(lat, lon) {
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(res => res.json())
    .then(data => {
      if (data.display_name) {
        document.getElementById("location").value = data.display_name;
      }
    })
    .catch(err => {
      console.log("Reverse geocoding failed, using coordinates");
    });
}

// Submit complaint form
function submitComplaint() {
  // Get form values
  const name = document.getElementById("name").value.trim();
  const issue = document.getElementById("issue").value.trim();
  const location = document.getElementById("location").value.trim();
  const fileInput = document.getElementById("photo");

  // Validation
  if (!name) {
    alert("⚠️ Please enter your name");
    return;
  }

  if (!issue) {
    alert("⚠️ Please describe the issue");
    return;
  }

  if (!location) {
    alert("⚠️ Please detect your location or enter it manually");
    return;
  }

  // Create form data
  const formData = new FormData();
  formData.append("name", name);
  formData.append("issue", issue);
  formData.append("location", location);
  formData.append("latitude", userLat);
  formData.append("longitude", userLon);

  // Add photo if selected
  if (fileInput.files.length > 0) {
    formData.append("photo", fileInput.files[0]);
  }

  // Show loading state
  const submitBtn = document.querySelector('button[type="submit"]');
  const submitText = document.getElementById('submitText');
  const submitLoader = document.getElementById('submitLoader');
  
  if (submitText && submitLoader) {
    submitText.style.display = 'none';
    submitLoader.style.display = 'inline-block';
  } else {
    submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
  }
  submitBtn.disabled = true;

  // Submit to backend
  fetch("http://localhost:5000/complaint", {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(data => {
      // Show success message
      const successMsg = document.getElementById("successMsg");
      successMsg.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 24px;">✓</span>
          <span>${data}</span>
        </div>
      `;
      successMsg.style.display = "block";

      // Reset form
      document.getElementById("complaintForm").reset();
      document.getElementById("preview").style.display = "none";
      document.getElementById("previewContainer").style.display = "none";
      userLat = "";
      userLon = "";

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMsg.style.display = "none";
      }, 5000);

      // Restore button
      if (submitText && submitLoader) {
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';
      } else {
        submitBtn.innerHTML = '✅ Submit Complaint';
      }
      submitBtn.disabled = false;
    })
    .catch(err => {
      console.error("Error submitting complaint:", err);
      alert("❌ Error submitting complaint. Please check if the server is running and try again.");
      
      // Restore button
      if (submitText && submitLoader) {
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';
      } else {
        submitBtn.innerHTML = originalText;
      }
      submitBtn.disabled = false;
    });
}

// Image preview function (can be called from HTML)
function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert("⚠️ Please select a valid image file");
      event.target.value = "";
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("⚠️ Image size should be less than 5MB");
      event.target.value = "";
      return;
    }

    const img = document.getElementById("preview");
    const container = document.getElementById("previewContainer");
    
    img.src = URL.createObjectURL(file);
    container.style.display = "block";
  }
}