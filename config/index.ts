import "dotenv/config";

export const applicationConfig = {
  app: {
    port: process.env.PORT || '3000'
  },

  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || '5432',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    senderEmail: process.env.AWS_SENDER_EMAIL,
    recieverEmail: process.env.AWS_RECIEVER_EMAIL,
  },

  rateLimit: {
    windowSizeMs: process.env.WINDOW_SIZE,
    requestLimit: process.env.REQUEST_LIMIT,
  }
};
