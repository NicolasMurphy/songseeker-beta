const clientId=process.env.REACT_APP_CLIENT_ID;
const clientSecret=process.env.REACT_APP_CLIENT_SECRET;
const credentials = `${clientId}:${clientSecret}`;
export const encodedCredentials = btoa(credentials);
