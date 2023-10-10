const clientId="{YOUR_CLIENT_ID}";
const clientSecret="{YOUR_CLIENT_SECRET}";
const credentials = `${clientId}:${clientSecret}`;
export const encodedCredentials = btoa(credentials);
