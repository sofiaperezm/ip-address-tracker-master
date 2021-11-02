const locationData = document.querySelector(".location-data");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const mapElement = L.map("map");
const markerMap = null;

const IP_ADDRESS_PARAM = "ipAddress";
const DOMAIN_PARAM = "domain";

searchButton.addEventListener("click", handleInputValue);

function getUserPosition() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(handleUserPosition, displayError)
  } else {
      alert("Sorry - your browser doesn't support geolocation!");
  }
}

function handleUserPosition(position) {

    const { latitude, longitude } = position.coords;
    initMap(latitude, longitude)
}

function displayError(error) {
  switch (error.code) {
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
  }
}

async function getIPData(inputParam, inputValue) {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_HZ3wjdvqNqcraMoKIVxuLuf6uFzfN&${inputParam}=${inputValue}`
  );
  const ipData = await response.json();
  return ipData;
}

async function handleInputValue(e) {
  const regexIPAddress = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const regexDomain = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
  const inputValue = searchInput.value;
  let inputParam = null;

  if (regexIPAddress.test(inputValue)) {
    inputParam = IP_ADDRESS_PARAM;
  }
  else if (regexDomain.test(inputValue)) {
    inputParam = DOMAIN_PARAM;
  } else {
    alert(
    `The search input you just entered (${inputValue}) is not valid.
    The format expected for an IP address is four decimal numbers separated by periods, from 0.0.0.0 to 255.255.255.255
    The format expected for a domain is for example www.domain.com`
    )
  }

  const response = await getIPData(inputParam, inputValue);
  const longitude = response.location.lng;
  const latitude = response.location.lat;

  await mapElement.setView([latitude, longitude], 13);
  
  // llamar la funcion que actualiza el marcador del mapa
}

function initMap(latitude, longitude) {

  // mostrar long - lat por defecto de getUserPosition()
  mapElement.setView([latitude, longitude], 18);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapElement);

  // llama la funcion que actualice el marcador del mapa
}

getUserPosition()
// crear una funcion que actualice el marcador del mapa (recibe lat long)
