import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";

const AudioPlayer = forwardRef(({ track, isLoading }, ref) => {
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

  useEffect(() => {
    if (audioRef.current && track && track.preview_url) {
      audioRef.current.load();
    }
  }, [track]);

  if (!track || !track.preview_url) {
    return null;
  }

  return (
    <div className="custom-player">
      {isLoading ? (
        <div className="loading loading-bars loading-lg"></div>
      ) : (
        <audio
          ref={audioRef}
          controls
          autoPlay
        >
          <source src={track.preview_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
});

export default AudioPlayer;
