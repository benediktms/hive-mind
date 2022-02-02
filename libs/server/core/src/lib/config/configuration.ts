export const configuration = () => ({
  environment: process.env.NODE_ENV,
  baseDomain: process.env.BASE_DOMAIN,
  port: process.env.PORT || 3001,
  datebaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL,
  accessTokenSeret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  confirmAccountNotificationId: process.env.CONFIRM_ACCOUNT_NOTIFICATION_ID,
  courierBrandId: process.env.COURIER_BRAND_ID,
  courierAuthToken: process.env.COURIER_AUTH_TOKEN,
  courierGmailProfileEmail: process.env.COURIER_GMAIL_PROFILE_EMAIL,
});
