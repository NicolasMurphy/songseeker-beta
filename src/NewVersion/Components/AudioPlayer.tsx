import React from "react";
import { AudioPlayerProps } from "../utils/types";

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  return (
    <div className="custom-player m-4">
      <audio controls preload="auto" autoPlay>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
