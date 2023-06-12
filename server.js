// server.js

const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
const port = 3001; // Update with your desired port number

const clientID = '476c71bb69f4476a8e5b3f4d64c5bb98'; // Replace with your Spotify client ID
const clientSecret = 'fb641cab33dd449cb46f71cdb1ab82d9'; // Replace with your Spotify client secret
const redirectURI = 'http://localhost:3000/callback'; // Update with your redirect URI

// Route to initiate the authentication flow
app.get('/login', (req, res) => {
  const scopes = 'user-read-private user-read-email'; // Update with desired scopes
  const authURL = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientID,
      scope: scopes,
      redirect_uri: redirectURI,
    });

  res.redirect(authURL);
});

// Route to handle the callback from Spotify
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  // Exchange the authorization code for an access token and refresh token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectURI,
    }),
  };

  try {
    const response = await axios(authOptions);
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    // Store the access token and refresh token securely (e.g., in a database or session)

    // Redirect the user back to your React application
    res.redirect('http://localhost:3000');
  } catch (error) {
    console.error('Error exchanging authorization code for access token:', error);
    res.status(500).send('Server Error');
  }
});

// Example endpoint to fetch a random word from the Random Word API
app.get('/random-word', async (req, res) => {
  try {
    const response = await axios.get('https://random-word-api.herokuapp.com/word');
    const word = response.data[0];

    // Use the access token to make authenticated requests to Spotify's API
    // Implement the logic to search the word using Spotify's API and return the first song

    res.json({ word });
  } catch (error) {
    console.error('Error fetching random word:', error);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
