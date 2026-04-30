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
const config = {
  port: process.env.PORT,
  databaseUrl: process.env.DB_URL,
  nodeEnv: process.env.NODE_ENV
}

export default config;