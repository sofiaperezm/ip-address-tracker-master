const locationData = document.querySelector(".location-data");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const ipAddressOutput = document.querySelector("#ip-address");
const locationOutput = document.querySelector("#location");
const timezoneOutput = document.querySelector("#timezone");
const ispOutput = document.querySelector("#isp");
const mapElement = L.map("map");
let markerLayer = null;

const IP_ADDRESS_PARAM = "ipAddress";
const DOMAIN_PARAM = "domain";

searchButton.addEventListener("click", handleInputValue);


async function init() {
    getUserPosition();
    const { ip } = await getCurrentIPData();
    const ipData = await getIPData(IP_ADDRESS_PARAM, ip);
    handleInfoCards({
      ip: ipData.ip, 
      city: ipData.location.city, 
      country: ipData.location.country, 
      postalCode: ipData.location.postalCode, 
      timezone: ipData.location.timezone, 
      isp: ipData.isp 
    });
}

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

async function getCurrentIPData() {
    const response = await fetch(
      "https://api.ipify.org?format=json"
    );
    const currentIPData = await response.json();
    return currentIPData;
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

  console.log(response)
  handleInfoCards({
    ip: response.ip, 
    city: response.location.city, 
    country: response.location.country, 
    postalCode: response.location.postalCode, 
    timezone: response.location.timezone, 
    isp: response.isp 
  });

  const longitude = response.location.lng;
  const latitude = response.location.lat;
  await mapElement.setView([latitude, longitude], 18);
  updateMarker(latitude, longitude);
}

function initMap(latitude, longitude) {

  mapElement.setView([latitude, longitude], 18);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapElement);

  // llama la funcion que actualice el marcador del mapa

  updateMarker(latitude, longitude)
}

function updateMarker(latitude, longitude) {
  const customeIcon = L.icon({
    iconUrl: "images/icon-location.svg",
  });

  if (markerLayer) {
    markerLayer.remove()
  }
  markerLayer = L.marker([latitude, longitude], {icon: customeIcon});
  markerLayer.addTo(mapElement);
}

function handleInfoCards({ ip, city, country, postalCode, timezone, isp }) {
  ipAddressOutput.textContent = !ip ? "-" : `${ip}`;
  locationOutput.textContent = `${city}, ${country} ${postalCode}`;
  timezoneOutput.textContent = !timezone ? "-" : `UTC ${timezone}`;
  ispOutput.textContent = !isp ? "-" : `${isp}`;
}

init();