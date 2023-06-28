import React from 'react';

const TrackLoader = ({ isLoading, handleGetRandomTrack }) => (
  <div className="flex justify-center mb-6">
    <button
      className="px-4 py-2 bg-primary hover:bg-primary-focus text-white rounded transition-colors"
      onClick={handleGetRandomTrack}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Get Random Track'}
    </button>
  </div>
);

export default TrackLoader;
