import { Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiErrorResponse } from "../interfaces/response.error";

const JWT_SECRET = process.env["JWT_SECRET"] || "";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: any,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  // Check if the authorization header is present and starts with "Bearer "

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error: ApiErrorResponse = {
      success: false,
      message: "No token provided",
      status: 401,
    };
    return res.status(401).json(error);
  }

  const token = authHeader.split(" ")[1] || "";
  console.log("token", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    const error: ApiErrorResponse = {
      success: false,
      message: "Invalid or expired token",
      status: 403,
    };
    return res.status(403).json(error);
  }
};
