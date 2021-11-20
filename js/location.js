import { initMap } from "./map";

export function getUserPosition() {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(handleUserPosition, displayError);
    } else {
        alert("Sorry - your browser doesn't support geolocation!");
    }
}

function handleUserPosition(position) {
    const { latitude, longitude } = position.coords;
    initMap(latitude, longitude);
}

function displayError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Permission was denied");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location data not available");
            break;
        case error.TIMEOUT:
            alert("Location request timeout");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unspecified error occurred");
            break;
        default:
            alert("An error occurred, please refresh the page");
            break;
    }
}