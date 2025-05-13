// Importing required modules
import { Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiErrorResponse } from "../interfaces/response.error";

// Secret key for JWT verification, fetched from environment variables
const JWT_SECRET = process.env["JWT_SECRET"] || "";

// Extending the Request interface to include a user property
export interface AuthenticatedRequest extends Request {
  user?: any; // Holds the decoded JWT payload
}

/**
 * Middleware to authenticate requests using JWT
 *
 * @param req - The incoming request object
 * @param res - The response object
 * @param next - The next middleware function
 */
export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: any,
  next: NextFunction
) => {
  // Extract the Authorization header
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error: ApiErrorResponse = {
      success: false,
      message: "No token provided", // Error message for missing token
      status: 401, // HTTP status code for unauthorized
    };
    return res.status(401).json(error);
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1] || "";

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded payload to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid or expired token errors
    const error: ApiErrorResponse = {
      success: false,
      message: "Invalid or expired token", // Error message for invalid token
      status: 403, // HTTP status code for forbidden
    };
    return res.status(403).json(error);
  }
};
