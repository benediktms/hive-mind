export const configuration = () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 3001,
  datebaseName: process.env.DATABASE_NAME,
});
