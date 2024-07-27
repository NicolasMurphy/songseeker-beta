import { Coordinates } from "./types";

export function calculateBearing(coords1: Coordinates, coords2: Coordinates) {
  function toRad(x: number) {
    return (x * Math.PI) / 180;
  }

  function toDeg(x: number) {
    return (x * 180) / Math.PI;
  }

  const lat1 = toRad(coords1[0]);
  const lon1 = toRad(coords1[1]);
  const lat2 = toRad(coords2[0]);
  const lon2 = toRad(coords2[1]);

  const dLon = lon2 - lon1;

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  let brng = toDeg(Math.atan2(y, x));

  brng = ((brng + 360) % 360) - 180;

  return brng.toFixed(0);
}
