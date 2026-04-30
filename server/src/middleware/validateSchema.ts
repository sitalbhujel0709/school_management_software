import type {Request, Response, NextFunction} from "express";
import { AppError } from "../utils/AppError";
import {ZodType} from "zod"

export const validateSchema = (schema: ZodType<any,any,any>)=> {
  return (req:Request, res:Response, next:NextFunction) => {
    const result = schema.safeParse(req.body);
    if(!result.success){
      const message = result.error.message || "Validation Error";
      return next(new AppError(message,400));
    }
    req.body = result.data;
    next();
  }
}