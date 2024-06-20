export default function resetAudio(audioRef) {
  //console.log(typeof(audioRef))
    if (audioRef.current) {
      audioRef.current.reset();
    }
  }
