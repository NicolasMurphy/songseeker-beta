import { useEffect, useRef, useState } from "react";
import { getCountryFromResult } from "./getCountryFromResult";
import useStore from "../store";
import { useGoogleMapsLegacy } from "./useGoogleMapsLegacy";

const Map = ({
  handleCountrySelection,
  shouldReset,
  correctLocation,
  isMarkerPlacementAllowed,
  isFiftyFifty,
  markerLocation,
  setShouldResetMap,
  setCorrectLocation,
}) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const correctMarkerRef = useRef(null);
  const polylineRef = useRef(null);
  const markerLocationRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const isMarkerPlacementAllowedRef = useRef(isMarkerPlacementAllowed);
  const { isCorrectGuess, setIsCorrectGuess } = useStore();
  const { isSubmitted } = useStore();
  const { isLoaded } = useGoogleMapsLegacy();

  useEffect(() => {
    isMarkerPlacementAllowedRef.current = isMarkerPlacementAllowed;
  }, [isMarkerPlacementAllowed]);

  const initializeMap = () => {
    if (!window.google || !window.google.maps) {
      return;
    }

    const mapOptions = {
      center: { lat: 20, lng: 0 },
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

      map.panTo(clickedLocation);

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

  useEffect(() => {
    if (isLoaded && !mapInstance) {
      initializeMap();
    }
  }, [isLoaded, mapInstance, isMarkerPlacementAllowed]);

  useEffect(() => {
    if (shouldReset && mapInstance) {
      mapInstance.panTo({ lat: 20, lng: 0 });
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

      setIsCorrectGuess(false);
      setCorrectLocation(null);
      setShouldResetMap(false);
    }
  }, [
    shouldReset,
    mapInstance,
    setShouldResetMap,
    correctLocation,
    setCorrectLocation,
    setIsCorrectGuess,
  ]);

  useEffect(() => {
    if (correctLocation && mapInstance && !isFiftyFifty && isSubmitted) {
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
  }, [correctLocation, mapInstance, isFiftyFifty, isSubmitted]);

  useEffect(() => {
    if (mapInstance && isFiftyFifty && markerLocation) {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new window.google.maps.Marker({
        position: markerLocation,
        map: mapInstance,
        clickable: false,
      });

      mapInstance.panTo(markerLocation);
    }
  }, [mapInstance, markerLocation, isFiftyFifty]);

  useEffect(() => {
    if (
      mapInstance &&
      isSubmitted &&
      correctLocation &&
      markerLocation &&
      isFiftyFifty
    ) {
      if (!isCorrectGuess) {
        const correctMarker = new window.google.maps.Marker({
          position: correctLocation,
          map: mapInstance,
          clickable: false,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
          },
        });

        correctMarkerRef.current = correctMarker;

        if (markerLocation) {
          const polyline = new window.google.maps.Polyline({
            path: [markerLocation, correctLocation],
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          polyline.setMap(mapInstance);
          polylineRef.current = polyline;

          const bounds = new window.google.maps.LatLngBounds();
          bounds.extend(markerLocation);
          bounds.extend(correctLocation);
          mapInstance.fitBounds(bounds);
        }
      }
    }
  }, [
    mapInstance,
    isSubmitted,
    isCorrectGuess,
    correctLocation,
    markerLocation,
    isFiftyFifty,
  ]);

  return <div ref={mapRef} className="w-[95%] md:h-80 h-60 mx-auto" />;
};

export default Map;
