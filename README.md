## SongSeeker

SongSeeker is a music education geography game! Featuring music from over 40 countries!

## Project Initialization

To run this on your local machine, follow these steps.

1. Fork and clone this project
2. > `cd songseeker`
3. Create a spotify developer account and add your client id and secret to src/api/credentials.jsx
    - `const clientId="{YOUR_CLIENT_ID}";`
    - `const clientSecret="{YOUR_CLIENT_SECRET}";`
4. Create a Google Maps Developer account, get an API key and add it as a script tag to public/index.html
    - `<script src="https://maps.googleapis.com/maps/api/js?key={YOUR_API_KEY}&libraries=geometry,drawing,places"></script>`
5. Create a Firebase account, add a project, and create a realtime database with these rules:
```
{
  "rules": {
    ".read": "true",
    ".write": "true", // Allow unauthenticated writes for testing
    "scores": {
      ".read": "true",
      ".write": "true" // Allow unauthenticated writes for testing
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
