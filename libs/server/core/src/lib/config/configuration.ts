export const configuration = () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 3001,
  datebaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL,
  cookieSecret: process.env.COOKIE_SECRET,
});
