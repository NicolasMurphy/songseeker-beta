import React from "react";
import SpotifyIconImage from "../Images/pngegg.png";

const SpotifyIcon = () => {
  return (
    <img
      className="mx-auto m-4 transition duration-300 ease-in-out hover:scale-110"
      width="48"
      src={SpotifyIconImage}
      alt="Spotify Icon"
    ></img>
  );
};

export default SpotifyIcon;
