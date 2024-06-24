import React from "react";
import useTracks from "./useTracks";
import getDescriptionOptions from "../utils/DescriptionOptions";
import ErrorMessage from "./ErrorMessage";
import AudioPlayer from "./AudioPlayer";

interface Description {
  description: string;
}

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

const NewVersion: React.FC = () => {
  const { tracks, loading, error } = useTracks();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (tracks.length === 0) {
    return <div>No tracks available</div>;
  }

  const descriptions: Description[] = getDescriptionOptions();
  const randomIndex = getRandomInt(descriptions.length);

  return (
    <div className="custom-player">
      <h1>{randomIndex}</h1>
      <h2>
        {tracks[randomIndex].name} - {tracks[randomIndex].artists[0].name}
      </h2>
      <h3>{descriptions[randomIndex].description}</h3>
      <AudioPlayer src={tracks[randomIndex].preview_url} />
    </div>
  );
};

export default NewVersion;
