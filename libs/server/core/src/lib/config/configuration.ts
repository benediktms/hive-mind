export const configuration = () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 3001,
  datebaseUrl: process.env.DATABASE_NAME,
  jwtSecret: process.env.JWT_SECRET,
});
