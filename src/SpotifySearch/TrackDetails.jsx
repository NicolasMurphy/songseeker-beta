import React from 'react';
import TrackInfo from './TrackInfo';

const TrackDetails = ({ track }) => (
  <div className="m-6 text-center">
    <TrackInfo track={track} />
  </div>
);

export default TrackDetails;
