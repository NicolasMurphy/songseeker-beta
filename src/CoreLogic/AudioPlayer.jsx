import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
} from "react";

const AudioPlayer = forwardRef(({ track }, ref) => {
  const audioRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);

  const setVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      localStorage.setItem("playerVolume", volume);
    }
  };

  useEffect(() => {
    const savedVolume = localStorage.getItem("playerVolume") || 1;
    setVolume(savedVolume);
    setInitialized(true);
  }, []);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.load();
      }
    },
    setVolume: (volume) => setVolume(volume),
  }));

  useEffect(() => {
    if (!initialized || !track || !track.preview_url || !audioRef.current)
      return;

    setReadyToPlay(false);
    const savedVolume = localStorage.getItem("playerVolume") || 1;
    audioRef.current.volume = parseFloat(savedVolume);
    audioRef.current.load();
  }, [track, initialized]);

  // audio delay
  const onLoadedData = () => {
    setReadyToPlay(true);
    setTimeout(() => {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }, 200);
  };

  if (!track || !track.preview_url) {
    return null;
  }

  return (
    <div className="custom-player">
      <audio
        ref={audioRef}
        controls
        preload="auto"
        onLoadedData={onLoadedData}
        onVolumeChange={(e) => {
          localStorage.setItem("playerVolume", e.target.volume);
        }}
      >
        <source src={track.preview_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
});

export default AudioPlayer;
