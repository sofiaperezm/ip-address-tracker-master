const ipAddressOutput = document.querySelector("#ip-address");
const locationOutput = document.querySelector("#location");
const timezoneOutput = document.querySelector("#timezone");
const ispOutput = document.querySelector("#isp");

export function updateResultCard({ ip, city, country, postalCode, timezone, isp }) {
    ipAddressOutput.textContent = !ip ? "-" : `${ip}`;
    locationOutput.textContent = `${city}, ${country} ${postalCode}`;
    timezoneOutput.textContent = !timezone ? "-" : `UTC ${timezone}`;
    ispOutput.textContent = !isp ? "-" : `${isp}`;
}