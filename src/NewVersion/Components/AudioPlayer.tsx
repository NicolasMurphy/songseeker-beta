import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { AudioPlayerProps } from "../utils/types";

const AudioPlayer = forwardRef(({ src }: AudioPlayerProps, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [initialized, setInitialized] = useState(false);

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      localStorage.setItem("playerVolume", volume.toString());
    }
  };

  useEffect(() => {
    const savedVolume = parseFloat(localStorage.getItem("playerVolume") || "1");
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
    setVolume: (volume: number) => setVolume(volume),
  }));

  useEffect(() => {
    if (!initialized || !src || !audioRef.current) return;

    const savedVolume = parseFloat(localStorage.getItem("playerVolume") || "1");
    audioRef.current.volume = savedVolume;
    audioRef.current.load();
  }, [src, initialized]);

  const onLoadedData = () => {
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((error) => console.error("Error playing audio:", error));
      }
    }, 200);
  };

  if (!src) {
    return null;
  }

  return (
    <div className="custom-player m-4">
      <audio
        ref={audioRef}
        controls
        preload="auto"
        onLoadedData={onLoadedData}
        onVolumeChange={(e) => {
          if (e.target instanceof HTMLAudioElement) {
            localStorage.setItem("playerVolume", e.target.volume.toString());
          }
        }}
      >
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
});

export default AudioPlayer;
