import getRandomTrack from '../api/getRandomTrack';
import refreshAccessToken from '../api/refreshAccessToken';

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
      const token = await refreshAccessToken(); // <-- Use the function here
      if (!token) throw new Error("Failed to refresh the access token");

      await getRandomTrack(token, track, setTrack, setIsLoading, resetAudio, setLocation, setShowTrackInfo, playedTracks, setPlayedTracks);
    } catch (error) {
      console.error('Error retrieving random track:', error);
      setIsLoading(false);
    }
  };

  return handleGetRandomTrack;
};

export default useGetRandomTrack;
