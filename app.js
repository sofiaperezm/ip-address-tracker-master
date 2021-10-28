const locationData = document.querySelector(".location-data");
const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");


// function getUserPosition() {
//   if ("geolocation" in navigator) {
//     console.log("navigation available");
//     navigator.geolocation.getCurrentPosition((position) => {
//       latitude.textContent = position.coords.latitude;
//       longitude.textContent = position.coords.longitude;
//     });
//   } else {
//     console.log("navigation NOT available");
//   }
// }

function getUserPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        locationData.innerHTML = "Sorry - your browser doesn't support geolocation!";
    }
}

function displayLocation(position) {
    locationData.innerHTML = "Check your latitude and longitude" 
    latitude.textContent = position.coords.latitude;
    longitude.textContent = position.coords.longitude; 
}

function displayError(error) { 
    switch(error.code) {
    case error.PERMISSION_DENIED:
        locationData.innerHTML = "Permission was denied";
        break;
    case error.POSITION_UNAVAILABLE:
        locationData.innerHTML = "Location data not available";
        break;
    case error.TIMEOUT:
        locationData.innerHTML = "Location request timeout";
        break;
    case error.UNKNOWN_ERROR:
        locationData.innerHTML = "An unspecified error occurred";
        break;
    default:
        locationData.innerHTML = "An error occurred, please refresh the page";
        break;
    }}



getUserPosition()