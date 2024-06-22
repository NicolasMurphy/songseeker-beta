import React from "react";
import useTracks from "./useTracks";

const NewVersion: React.FC = () => {
  const { tracks, loading } = useTracks();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (tracks.length === 0) {
    return <div>No tracks available</div>;
  }

  return (
    <div className="custom-player">
      <audio controls preload="auto">
        <source src={tracks[1].preview_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default NewVersion;
