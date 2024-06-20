export const handleGeocoding = async (address) => {
  //console.log(typeof(address))
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          //console.log(typeof(results))
          const { location } = results[0].geometry;
          resolve([location.lat(), location.lng()]);
        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  };
