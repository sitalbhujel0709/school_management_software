import type {Request, Response, NextFunction} from "express";
import { AppError } from "../utils/AppError.js";
import {ZodType} from "zod"

export const validateSchema = (schema: ZodType<any,any,any>)=> {
  return (req:Request, res:Response, next:NextFunction) => {
    const result = schema.safeParse(req.body);
    if(!result.success){
      const message = result.error.issues[0]?.message || "Validation Error";
      return next(new AppError(message,400));
    }
    req.body = result.data;
    next();
  }
}