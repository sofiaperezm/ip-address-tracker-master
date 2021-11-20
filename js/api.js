const API_KEY = "at_HZ3wjdvqNqcraMoKIVxuLuf6uFzfN";

export async function getIPData(inputParam, inputValue) {
    const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&${inputParam}=${inputValue}`
    );
    const ipData = await response.json();
    return ipData;
}

export async function getInitialIP() {
    const response = await fetch(
        "https://api.ipify.org?format=json"
    );
    const currentIPData = await response.json();
    return currentIPData;
}