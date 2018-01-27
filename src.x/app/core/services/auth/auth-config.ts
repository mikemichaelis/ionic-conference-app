export interface AuthConfig {
  clientID: string;
  clientId: string;
  domain: string;
  callbackURL: string;
  responseType: string;
  audience: string;
  redirectUri: string;
  scope: string;
  packageIdentifier: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'uI1w3HH74gPibFGoK5GJOqHS0kGk412j',
  clientId: 'uI1w3HH74gPibFGoK5GJOqHS0kGk412j',
  packageIdentifier: 'com.reflectionship.mobile',
  domain: 'mikemichaelis.auth0.com',
  audience: 'reflectionship-api.azurewebsites.com',
  scope: 'openid profile email picture gender birthdate locale zoneinfo offline_access all:user',
  responseType: 'token id_token',
  callbackURL: 'http://localhost:8100/',
  redirectUri: 'http://localhost:8100/'
};
