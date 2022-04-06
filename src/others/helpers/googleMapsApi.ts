const GOOGLE_API_KEY = 'AIzaSyDa5tT4LZqRjRnbUO5BqHsZNYqG8dIjbqY';
const MAPS_GOOGLE_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}`;

export const getStreetAddressFromGeolocation = async (lat: number, lng: number) => {
    const options = 'result_type=street_address&location_type=ROOFTOP';
    const urlWithLatLngParams = `${MAPS_GOOGLE_API_URL}&latlng=${lat},${lng}&${options}`;

    const response = await fetch(urlWithLatLngParams).then(response => response.json());
    return response.results.map((r: any) => r.formatted_address).pop();
}