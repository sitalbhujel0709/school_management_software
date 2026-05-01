import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import { verifyAccessToken } from '../utils/jwt.js';

export interface requiredAuthRequest extends Request {
  user?: {
    userId: string;
    role: "ADMIN" | "TEACHER" | "STUDENT";
  }
}

export const requireAuth = (req: requiredAuthRequest, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken} = req.cookies
  console.log("Access Token:", accessToken);
  if (!accessToken || !refreshToken) {
    return next(new AppError(401, "Unauthorized: No tokens provided"));
  }
  const decoded = verifyAccessToken(accessToken);
  if (!decoded) {
    return next(new AppError(401, "Unauthorized: Invalid access token"));
  }
  req.user = decoded;
  next();
}

export const requireRole = (roles: Array<"ADMIN" | "TEACHER" | "STUDENT">) => {
  return (req: requiredAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, "Unauthorized: No user information"));
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, "Forbidden: Insufficient permissions"));
    }
    next();
  }
}