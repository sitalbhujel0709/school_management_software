import dotenv from 'dotenv';
dotenv.config();

if(!process.env.PORT){
  throw new Error("PORT is not defined in environment variables");
}
else if(!process.env.DB_URL){
  throw new Error("DB_URL is not defined in environment variables");
}
else if(!process.env.NODE_ENV){
  throw new Error("NODE_ENV is not defined in environment variables");
}
else if(!process.env.ACCESS_TOKEN_SECRET){
  throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
}
else if(!process.env.REFRESH_TOKEN_SECRET){
  throw new Error("REFRESH_TOKEN_SECRET is not defined in environment variables");
}
else if(!process.env.GOOGLE_APP_EMAIL){
  throw new Error("GOOGLE_APP_EMAIL is not defined in environment variables");
}
else if(!process.env.GOOGLE_APP_PASSWORD){
  throw new Error("GOOGLE_APP_PASSWORD is not defined in environment variables");
}
else if(!process.env.CLOUDINARY_CLOUD_NAME){
  throw new Error("CLOUDINARY_CLOUD_NAME is not defined in environment variables");
}
else if(!process.env.CLOUDINARY_API_KEY){
  throw new Error("CLOUDINARY_API_KEY is not defined in environment variables");
}
else if(!process.env.CLOUDINARY_API_SECRET){
  throw new Error("CLOUDINARY_API_SECRET is not defined in environment variables");
}

const config = {
  port: process.env.PORT,
  databaseUrl: process.env.DB_URL,
  nodeEnv: process.env.NODE_ENV,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  googleAppEmail: process.env.GOOGLE_APP_EMAIL,
  googleAppPassword: process.env.GOOGLE_APP_PASSWORD,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET
}

export default config;