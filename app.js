import { getUserPosition } from "./js/location";
import { getInitialIP, getIPData } from "./js/api";
import { IP_ADDRESS_PARAM } from "./js/constants";
import { initInputSearch } from "./js/inputSearch";
import { updateResultCard } from "./js/resultCard";

async function init() {
    getUserPosition();
    const { ip } = await getInitialIP();
    const ipData = await getIPData(IP_ADDRESS_PARAM, ip);
    initInputSearch();
    updateResultCard({
      ip: ipData.ip, 
      city: ipData.location.city, 
      country: ipData.location.country, 
      postalCode: ipData.location.postalCode, 
      timezone: ipData.location.timezone, 
      isp: ipData.isp 
    });
}

init();