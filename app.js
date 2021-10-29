const locationData = document.querySelector(".location-data");
const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button")

searchInput.addEventListener('input', getValue);
//searchButton.addEventListener('click', getValue)

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

async function fetchIPJSON() {
    const response = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_HZ3wjdvqNqcraMoKIVxuLuf6uFzfN&domain=google.com');
    console.log(response);
    const ipData = await response.json();
    console.log(ipData);
        return ipData;
}

fetchIPJSON().then(ipData => {
    ipData; // fetched movies
});

getUserPosition()


function getValue(e) {
    console.log(e.target.value)
}
