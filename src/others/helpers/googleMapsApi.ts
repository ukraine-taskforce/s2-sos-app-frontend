export const getStreetAddressFromGeolocation = async (lat: number, lng: number) => {
  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    return "api not enabled";
  }
  console.log('s1 ', Date());
  try {
    const geocoder = new (window as any).google.maps.Geocoder();
    console.log('s2 ', Date());
    const response = await geocoder.geocode({ location: {lat: lat, lng: lng} }).then((response: any) => {
      try {
        console.log('s3 ', Date());
        const address = response.results[0].formatted_address;
        console.log('s4 ', Date());
        return address;
      } catch (exc) {
        return "";
      }
      console.log('s5 ', Date());
    });
    console.log('s6 ', Date());
    return response;
  } catch (exc) {
    return "";
  }
}
