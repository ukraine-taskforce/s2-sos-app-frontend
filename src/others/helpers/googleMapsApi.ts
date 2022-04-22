export const getStreetAddressFromGeolocation = async (lat: number, lng: number) => {
  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    return "api not enabled";
  }
  try {
    const geocoder = new (window as any).google.maps.Geocoder();
    const response = await geocoder.geocode({ location: {lat: lat, lng: lng} }).then((response: any) => {
      try {
        const address = response.results[0].formatted_address;
        return address;
      } catch (exc) {
        return "";
      }
    });
    return response;
  } catch (exc) {
    return "";
  }
}
