export const configuration = () => ({
  environment: process.env.NODE_ENV,
  baseDomain: process.env.BASE_DOMAIN,
  port: process.env.PORT || 3001,
  datebaseUrl: process.env.DATABASE_URL,
  accessTokenSeret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
});
