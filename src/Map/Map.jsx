import React, { useEffect, useRef, useState } from "react";
import { getCountryFromResult } from "./getCountryFromResult";

const Map = ({
  handleCountrySelection,
  shouldReset,
  correctLocation,
  isMarkerPlacementAllowed,
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

  useEffect(() => {
    const initializeMap = () => {
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

    if (!mapInstance) {
      initializeMap();
    }
  }, [mapInstance, isMarkerPlacementAllowed]);

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
          url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
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

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default Map;
