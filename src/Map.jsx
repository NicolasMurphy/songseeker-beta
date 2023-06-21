import React, { useEffect, useRef, useState } from 'react';

const Map = ({ handleCountrySelection, selectedCountry }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    };

    // Create a new Google Map instance
    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    // Add click event listener to the map
    window.google.maps.event.addListener(map, 'click', (event) => {
      // Remove previous marker if it exists
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // Get the clicked coordinates
      const clickedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      // Reverse geocode the clicked location to get the country information
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: clickedLocation }, (results, status) => {
        if (status === 'OK') {
          // Find the country result
          const countryResult = results.find((result) =>
            result.types.includes('country')
          );

          if (countryResult) {
            // Get the country from the country result
            const country = getCountryFromResult(countryResult);

            // Set the selected country state
            handleCountrySelection(country);
          } else {
            // No country result found
            handleCountrySelection('Not a valid country');
          }

          // Set the position of the new marker to the clicked location
          const newMarker = new window.google.maps.Marker({
            position: clickedLocation,
            map: map,
            clickable: false, // Make the marker non-clickable
          });

          // Store the new marker instance in the markerRef
          markerRef.current = newMarker;
        } else {
          // Geocoding request failed
          handleCountrySelection('Geocoding request failed');
        }
      });
    });
  }, []);

  const getCountryFromResult = (result) => {
    // Find the country component in the address components of the result
    const countryComponent = result.address_components.find((component) =>
      component.types.includes('country')
    );

    // Extract the country name
    const country = countryComponent ? countryComponent.long_name : '';

    return country;
  };

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default Map;
