export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'seo-pilot-token',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
