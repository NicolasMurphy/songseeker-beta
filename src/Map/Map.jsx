import React, { useEffect, useRef, useState } from "react";
import { getCountryFromResult } from "./getCountryFromResult";

const Map = ({
  handleCountrySelection,
  shouldReset,
  correctLocation,
  isMarkerPlacementAllowed,
  isFiftyFifty,
  setIsFiftyFifty,
  markerLocation,
}) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const correctMarkerRef = useRef(null);
  const polylineRef = useRef(null);
  const markerLocationRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const isMarkerPlacementAllowedRef = useRef(isMarkerPlacementAllowed);

  useEffect(() => {
    isMarkerPlacementAllowedRef.current = isMarkerPlacementAllowed;
  }, [isMarkerPlacementAllowed]);

  const initializeMap = () => {
    if (!window.google || !window.google.maps) {
      return;
    }

    const mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 2,
      gestureHandling: "greedy",
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

    window.google.maps.event.addListener(map, "click", (event) => {
      if (!isMarkerPlacementAllowedRef.current) {
        // If marker placement is not allowed, simply return and do nothing
        return;
      }
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      const clickedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      markerLocationRef.current = clickedLocation;

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: clickedLocation }, (results, status) => {
        if (status === "OK") {
          const countryResult = results.find((result) =>
            result.types.includes("country")
          );

          if (countryResult) {
            const country = getCountryFromResult(countryResult);
            handleCountrySelection(country, clickedLocation);
          } else {
            handleCountrySelection("Not a valid country", clickedLocation);
          }

          const newMarker = new window.google.maps.Marker({
            position: clickedLocation,
            map: map,
            clickable: false,
          });

          markerRef.current = newMarker;
        } else {
          handleCountrySelection("Geocoding request failed", clickedLocation);
        }
      });
    });
  };

  // FiftyFifty
  useEffect(() => {
    if (mapInstance && markerLocation && isFiftyFifty) {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new window.google.maps.Marker({
        position: markerLocation,
        map: mapInstance,
        clickable: false,
      });

      mapInstance.setCenter(markerLocation);
      setIsFiftyFifty(false);
    }
  }, [mapInstance, markerLocation, isFiftyFifty]);

  useEffect(() => {
    if (!mapInstance) {
      initializeMap();
    }
  }, [mapInstance, isMarkerPlacementAllowed]);

  useEffect(() => {
    // Check if the Maps API script has already been loaded or is being loaded
    const existingScript = document.querySelector(
      `script[src^="https://maps.googleapis.com/maps/api/js?key="]`
    );

    if (!window.google && !existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?v=quarterly&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places&callback=initMap&language=en`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else if (window.google) {
      initializeMap();
    }

    // Define the global initMap function that will be called by the Google Maps script
    window.initMap = () => {
      initializeMap();
    };
  }, []);

  useEffect(() => {
    if (shouldReset && mapInstance) {
      mapInstance.setCenter({ lat: 0, lng: 0 });
      mapInstance.setZoom(2);

      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }

      if (correctMarkerRef.current) {
        correctMarkerRef.current.setMap(null);
        correctMarkerRef.current = null;
      }

      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }

      markerLocationRef.current = null;
    }
  }, [shouldReset, mapInstance]);

  useEffect(() => {
    if (correctLocation && mapInstance) {
      if (correctMarkerRef.current) {
        correctMarkerRef.current.setMap(null);
      }

      const correctMarker = new window.google.maps.Marker({
        position: correctLocation,
        map: mapInstance,
        clickable: false,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        },
      });

      correctMarkerRef.current = correctMarker;

      if (markerLocationRef.current) {
        const polyline = new window.google.maps.Polyline({
          path: [markerLocationRef.current, correctLocation],
          geodesic: true,
          strokeColor: "#000000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
        polyline.setMap(mapInstance);
        polylineRef.current = polyline;

        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(markerLocationRef.current);
        bounds.extend(correctLocation);
        mapInstance.fitBounds(bounds);
      }
    }
  }, [correctLocation, mapInstance]);

  return <div ref={mapRef} className="w-[95%] h-80 mx-auto" />;
};

export default Map;
