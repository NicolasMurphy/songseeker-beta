import { useEffect } from 'react';
import refreshAccessToken from "../api/refreshAccessToken";

export default function useFetchData(handleGetRandomTrack) {
  useEffect(() => {
    const fetchData = async () => {
      await refreshAccessToken();
      handleGetRandomTrack();
    };

    fetchData();
  }, []);
}
