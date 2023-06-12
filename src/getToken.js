import axios from 'axios';


const getToken = async () => {
  const clientId = '476c71bb69f4476a8e5b3f4d64c5bb98';
  const clientSecret = 'fb641cab33dd449cb46f71cdb1ab82d9';
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = btoa(credentials);

  const response = await axios.post('https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  return response.data.access_token;
};

export { getToken };
