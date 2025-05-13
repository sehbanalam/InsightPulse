// src/middlewares/role.middleware.ts
import { Request, NextFunction } from "express";
import { ApiErrorResponse } from "../interfaces/response.error";

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: any, next: NextFunction) => {
    const userRole = (req as any).user?.role;

    if (!roles.includes(userRole)) {
      const error: ApiErrorResponse = {
        success: false,
        message: "Access denied. Insufficient permissions.",
        status: 403,
      };
      return res.status(403).json(error);
    }
    next();
  };
};
