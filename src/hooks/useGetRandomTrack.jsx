import getRandomTrack from '../api/getRandomTrack';

const useGetRandomTrack = (
  setShowTrackInfo,
  setIsLoading,
  setIsSubmitted,
  setDistanceMessage,
  resetAudio,
  setLocation,
  setTrack,
  track,
  setCorrectLocation,
  setShouldResetMap,
  playedTracks,
  setPlayedTracks
) => {
  const handleGetRandomTrack = async () => {
    setShouldResetMap(true);
    setCorrectLocation(null);
    setShowTrackInfo(false);
    setIsLoading(true);
    setIsSubmitted(false);
    setDistanceMessage('');

    try {
      const token = localStorage.getItem('accessToken');
      await getRandomTrack(token, track, setTrack, setIsLoading, resetAudio, setLocation, setShowTrackInfo, playedTracks, setPlayedTracks);
    } catch (error) {
      console.error('Error retrieving random track:', error);
      setIsLoading(false);
    }
  };

  return handleGetRandomTrack;
};

export default useGetRandomTrack;
