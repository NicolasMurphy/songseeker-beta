import React from 'react';
import SpotifyIconImage from './Images/pngegg.png';

const SpotifyIcon = () => {
  return (
    <img
      src={SpotifyIconImage}
      alt="Spotify Icon"
      style={{ width: '24px', height: '24px', marginLeft: '8px' }}
    />
  );
};

export default SpotifyIcon;
