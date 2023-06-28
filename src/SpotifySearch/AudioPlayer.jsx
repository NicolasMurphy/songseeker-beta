import React, { forwardRef, useImperativeHandle, useRef } from "react";

const AudioPlayer = forwardRef(({ track }, ref) => {
  const audioRef = useRef(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.load();
      }
    },
  }));

  if (!track || !track.preview_url) {
    return null;
  }

  return (
    <div className="custom-player">
      <audio ref={audioRef} controls>
        <source src={track.preview_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
});

export default AudioPlayer;
