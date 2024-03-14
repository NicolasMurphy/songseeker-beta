## SongSeeker

SongSeeker is a music education geography game! Featuring music from over 100 countries!

## Project Initialization

Please note that these instructions are written so that you do not have to use the serverless function for vercel, so you can ignore api/getAccessToken.js. Also steps 5 and 6 are not necessary unless you want to be able to submit high scores to your own leaderboard, the game itself should function without it.

To run this on your local machine, follow these steps.

1. Fork and clone this project
2. > `cd songseeker`
3. Create a spotify developer account and add your client id and secret to src/api/credentials.jsx (please refer to an earlier version of the project for this part, also make sure to change back refreshAccessToken.js as well: `https://github.com/NicolasMurphy/songseeker-beta/tree/823493604ba2381055e11224f180b04a8cc93531`)
    - `const clientId="{YOUR_CLIENT_ID}";`
    - `const clientSecret="{YOUR_CLIENT_SECRET}";`
4. Create a Google Maps Developer account, get an API key and add it as a script tag to src/Map/Map.jsx
    - `<script src="https://maps.googleapis.com/maps/api/js?key={YOUR_API_KEY}&libraries=geometry,drawing,places"></script>`
5. Create a Firebase account, add a project, and create a realtime database with these rules:
```
{
  "rules": {
    ".read": "true",
    ".write": "true",
    "scores": {
      ".read": "true",
      ".write": "true"
    }
  }
}
```
6. Add your firebaseConfig by going to your project settings, selecting config from SDK setup and configuration, and copying and pasting the code to src/Nav.jsx. It should look something like this.
```
const firebaseConfig = {
  apiKey: "{YOUR_API_KEY}",
  authDomain: "{YOUR_AUTH_DOMAIN}",
  databaseURL: "{YOUR_DATABASE_URL}",
  projectId: "{YOUR_PROJECT_ID}",
  storageBucket: "{YOUR_STORAGE_BUCKET}",
  messagingSenderId: "{YOUR_MESSAGING_SENDER_ID}",
  appId: "{YOUR_APP_ID}",
};
```
6. > `npm install`
7. > `npm start`
8. View the project http://localhost:3000
