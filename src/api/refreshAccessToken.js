const refreshAccessToken = async () => {
  try {
    const response = await fetch("/api/getAccessToken");

    if (response.ok) {
      const data = await response.json();
      return data.access_token;
    } else {
      console.error("Error refreshing access token:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

export default refreshAccessToken;
