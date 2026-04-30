import type {Request, Response, NextFunction} from "express";
import config from "../config/config";

export const errorHandler = (err:any,req:Request, res:Response, next:NextFunction) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success:false,
    message: message,
    stack: config.nodeEnv === "development" ? err.stack : undefined
  })
}