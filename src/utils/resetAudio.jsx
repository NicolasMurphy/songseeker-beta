export default function resetAudio(audioRef) {
    if (audioRef.current) {
      audioRef.current.reset();
    }
  }
