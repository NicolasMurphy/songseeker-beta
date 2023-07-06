## SongSeeker

SongSeeker is a music education geography game! Featuring music from over 40 countries!

## Project Initialization

To run this on your local machine, follow these steps.

1. Fork and clone this project
2. > `cd songseeker`
3. Create a spotify developer account and add your client id and secret to credentials.jsx
    - `const clientId="{YOUR_CLIENT_ID}";`
    - `const clientSecret="{YOUR_CLIENT_SECRET}";`
4. Get an API key from Google Maps and add it as a script tag to index.html
    - `<script src="https://maps.googleapis.com/maps/api/js?key={YOUR_API_KEY}&libraries=geometry,drawing,places"></script>`
5. > `npm install`
6. > `npm start`
7. View the project http://localhost:3000
