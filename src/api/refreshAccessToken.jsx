const refreshAccessToken = async (setAccessToken) => {
  try {
    const response = await fetch("/api/getAccessToken");

    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.access_token);
    } else {
      console.error("Error refreshing access token:", response.status);
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }
};

export default refreshAccessToken;
