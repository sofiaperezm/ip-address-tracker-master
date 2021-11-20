import { IP_ADDRESS_PARAM, DOMAIN_PARAM } from "./constants";
import { getIPData } from "./api";
import { updateMap } from "./map";
import { updateResultCard } from "./resultCard";

export function initInputSearch() {
    const searchButton = document.querySelector(".search-button");
    searchButton.addEventListener("click", handleInputValue);
}

async function handleInputValue(e) {
    const regexIPAddress = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const regexDomain = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
    const searchInput = document.querySelector(".search-input");
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
        );
    }

    const response = await getIPData(inputParam, inputValue);

    updateResultCard({
      ip: response.ip, 
      city: response.location.city, 
      country: response.location.country, 
      postalCode: response.location.postalCode, 
      timezone: response.location.timezone, 
      isp: response.isp 
    });

    const longitude = response.location.lng;
    const latitude = response.location.lat;

    updateMap(latitude, longitude);
}
