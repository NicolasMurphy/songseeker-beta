import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
} from "react";

const AudioPlayer = forwardRef(({ track, isLoading }, ref) => {
  const audioRef = useRef(null);
  const [initialized, setInitialized] = useState(false);

  // Function to set volume
  const setVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      localStorage.setItem('playerVolume', volume);
    }
  };

  // Load volume from localStorage on initial render
  useEffect(() => {
    const savedVolume = localStorage.getItem('playerVolume') || 1; // Default to max volume if not set
    setVolume(savedVolume);
    setInitialized(true); // Ensure this effect only runs once
  }, []);

  // Function to update the volume
  useImperativeHandle(ref, () => ({
    reset: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.load();
      }
    },
    // Provide a method to set volume from parent component
    setVolume: (volume) => setVolume(volume),
  }));

  useEffect(() => {
    if (!initialized || !track || !track.preview_url || !audioRef.current) return;

    // Whenever the track changes, ensure we set the volume to the saved value
    const savedVolume = localStorage.getItem('playerVolume') || 1;
    audioRef.current.volume = parseFloat(savedVolume);

    // Auto-load the new track
    audioRef.current.load();
  }, [track, initialized]);

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
          onVolumeChange={(e) => {
            // Update localStorage whenever the volume is changed
            localStorage.setItem('playerVolume', e.target.volume);
          }}
        >
          <source src={track.preview_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
});

export default AudioPlayer;
