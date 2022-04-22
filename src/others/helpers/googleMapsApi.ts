export const getStreetAddressFromGeolocation = async (lat: number, lng: number) => {
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
