import React, { useEffect, useRef, useState } from 'react';

const Map = ({ handleCountrySelection, shouldReset }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        gestureHandling: 'greedy',
        restriction: {
          latLngBounds: {
            north: 85,
            south: -85,
            west: -180,
            east: 180,
          },
          strictBounds: true,
        },
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      setMapInstance(map);

      window.google.maps.event.addListener(map, 'click', (event) => {
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        const clickedLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: clickedLocation }, (results, status) => {
          if (status === 'OK') {
            const countryResult = results.find((result) =>
              result.types.includes('country')
            );

            if (countryResult) {
              const country = getCountryFromResult(countryResult);
              handleCountrySelection(country, clickedLocation);
            } else {
              handleCountrySelection('Not a valid country', clickedLocation);
            }

            const newMarker = new window.google.maps.Marker({
              position: clickedLocation,
              map: map,
              clickable: false,
            });

            markerRef.current = newMarker;
          } else {
            handleCountrySelection('Geocoding request failed', clickedLocation);
          }
        });
      });
    };

    if (!mapInstance) {
      initializeMap();
    } else if (shouldReset) {
      mapInstance.setCenter({ lat: 0, lng: 0 });
      mapInstance.setZoom(2);

      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    }
  }, [shouldReset, mapInstance]);

  const getCountryFromResult = (result) => {
    const countryComponent = result.address_components.find((component) =>
      component.types.includes('country')
    );

    const country = countryComponent ? countryComponent.long_name : '';
    return country;
  };

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default Map;
