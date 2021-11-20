const mapElement = L.map("map", { zoomControl: false });
let markerLayer = null;

function updateMarker(latitude, longitude) {
    const customeIcon = L.icon({
        iconUrl: require("../images/icon-location.svg"),
    });

    if (markerLayer) {
        markerLayer.remove();
    }
    markerLayer = L.marker([latitude, longitude], { icon: customeIcon });
    markerLayer.addTo(mapElement);
}

export function initMap(latitude, longitude) {
    mapElement.setView([latitude, longitude], 18);
    mapElement.scrollWheelZoom.disable();

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapElement);
    updateMarker(latitude, longitude);
}

export async function updateMap(latitude, longitude) {
    await mapElement.setView([latitude, longitude], 18);
    updateMarker(latitude, longitude);
}