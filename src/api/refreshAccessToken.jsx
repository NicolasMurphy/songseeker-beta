import { encodedCredentials } from './credentials';


const refreshAccessToken = async (setAccessToken) => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: 'grant_type=client_credentials',
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        localStorage.setItem('accessToken', accessToken); // Store the access token in localStorage
        setAccessToken(accessToken);
      } else {
        console.error('Error refreshing access token:', response.status);
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

export default refreshAccessToken;
