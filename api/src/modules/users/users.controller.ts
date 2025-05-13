import e, { NextFunction, Request } from "express";
import * as UserService from "./users.service";
import { ApiSuccessResponse } from "../../interfaces/response.success";
import { ApiErrorResponse } from "../../interfaces/response.error";
import { genericError } from "../../utils/generic.error";
import { comparePassword, generateToken } from "../../utils/auth.utils";
import { z } from "zod";
import pino from "pino";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";

// Initialize Pino logger
const logger = pino();

// Define Zod schemas for request validation
const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"), // Name must be a non-empty string
  email: z.string().email("Invalid email format"), // Email must be valid
  password: z.string().min(6, "Password must be at least 6 characters long"), // Password must be at least 6 characters
});

const updateUserSchema = z.object({
  name: z.string().optional(), // Name is optional
  email: z.string().email("Invalid email format").optional(), // Email must be valid if provided
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(), // Password must be valid if provided
});

const userIdParamSchema = z.object({
  id: z.string(), // ID must be a valid UUID
});

// Controller to create a new user
export const createUser = async (
  _req: Request,
  _res: any,
  next: NextFunction
) => {
  try {
    // Validate request body using Zod schema
    const validation = createUserSchema.safeParse(_req.body);
    if (!validation.success) {
      // Return validation error response
      const error: ApiErrorResponse = {
        success: false,
        message: "Validation error",
        status: 400,
        errors: validation.error.flatten().fieldErrors,
      };
      return _res.status(400).json(error);
    }
    // Call the service to create a new user
    const user = await UserService.createUser(validation.data);
    // Return success response
    const response: ApiSuccessResponse = {
      success: true,
      message: "User created successfully",
      data: user,
      status: 201,
    };
    return _res.status(201).json(response);
  } catch (error) {
    next(error); // Pass the error to the next middleware for centralized error handling
    // Log the error and return a generic error response
    logger.error({ error }, "Error creating user");
    return _res.status(500).json(genericError); // Ensure a response is returned
  }
};

// Controller to fetch all users
export const getAllUsers = async (_req: Request, res: any) => {
  try {
    // Call the service to fetch all users
    const users = await UserService.getAllUsers();

    // Return success response
    const response: ApiSuccessResponse = {
      success: true,
      message: "Users fetched successfully",
      data: users,
      status: 200,
    };
    return res.status(200).json(response);
  } catch (error) {
    // Log the error and return a generic error response
    logger.error({ error }, "Error fetching users");
    return res.status(500).json(genericError);
  }
};

// Controller to fetch a user by ID
export const getUserById = async (req: Request, res: any) => {
  try {
    // Validate user ID parameter using Zod schema
    const validation = userIdParamSchema.safeParse(req.params);
    if (!validation.success) {
      // Return validation error response
      const error: ApiErrorResponse = {
        success: false,
        message: "Validation error",
        status: 400,
        errors: validation.error.flatten().fieldErrors,
      };
      return res.status(400).json(error);
    }

    // Call the service to fetch the user by ID
    const user = await UserService.getUserById(validation.data.id);
    if (!user) {
      // Return error response if user is not found
      const error: ApiErrorResponse = {
        success: false,
        message: "User not found",
        status: 404,
        errors: {
          userId: "User not found",
        },
      };
      return res.status(404).json(error);
    }

    // Return success response
    const response: ApiSuccessResponse = {
      status: 200,
      success: true,
      message: "User fetched successfully",
      data: user,
    };
    return res.status(200).json(response);
  } catch (error) {
    // Log the error and return a generic error response
    logger.error({ error }, "Error fetching user by ID");
    return res.status(500).json(genericError);
  }
};

// Controller to update a user
export const updateUser = async (req: Request, res: any) => {
  try {
    // Validate user ID parameter using Zod schema
    const paramValidation = userIdParamSchema.safeParse(req.params);
    if (!paramValidation.success) {
      // Return validation error response
      const error: ApiErrorResponse = {
        success: false,
        message: "Validation error",
        status: 400,
        errors: paramValidation.error.flatten().fieldErrors,
      };
      return res.status(400).json(error);
    }

    // Validate request body using Zod schema
    const bodyValidation = updateUserSchema.safeParse(req.body);
    if (!bodyValidation.success) {
      // Return validation error response
      const error: ApiErrorResponse = {
        success: false,
        message: "Validation error",
        status: 400,
        errors: bodyValidation.error.flatten().fieldErrors,
      };
      return res.status(400).json(error);
    }

    // Call the service to update the user
    const user = await UserService.updateUser(
      paramValidation.data.id,
      bodyValidation.data
    );
    if (!user) {
      // Return error response if user is not found
      const error: ApiErrorResponse = {
        success: false,
        message: "User not found",
        status: 404,
        errors: {
          userId: "User not found",
        },
      };
      return res.status(404).json(error);
    }

    // Return success response
    const response: ApiSuccessResponse = {
      status: 200,
      success: true,
      message: "User updated successfully",
      data: user,
    };
    return res.status(200).json(response);
  } catch (error) {
    // Log the error and return a generic error response
    logger.error({ error }, "Error updating user");
    return res.status(500).json(genericError);
  }
};

// Controller to delete a user
export const deleteUser = async (req: Request, res: any) => {
  try {
    // Validate user ID parameter using Zod schema
    const validation = userIdParamSchema.safeParse(req.params);
    if (!validation.success) {
      // Return validation error response
      const error: ApiErrorResponse = {
        success: false,
        message: "Validation error",
        status: 400,
        errors: validation.error.flatten().fieldErrors,
      };
      return res.status(400).json(error);
    }

    // Call the service to delete the user
    const user = await UserService.deleteUser(validation.data.id);
    if (!user) {
      // Return error response if user is not found
      const error: ApiErrorResponse = {
        success: false,
        message: "User not found",
        status: 404,
      };
      return res.status(404).json(error);
    }

    // Return success response
    const response: ApiSuccessResponse = {
      success: true,
      message: "User deleted successfully",
      data: user,
      status: 200,
    };
    return res.status(200).json(response);
  } catch (error) {
    // Log the error and return a generic error response
    logger.error({ error }, "Error deleting user");
    return res.status(500).json(genericError);
  }
};

export const loginUser = async (req: Request, res: any) => {
  try {
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);

    // Check if user exists
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      const error: ApiErrorResponse = {
        success: false,
        message: "Invalid credentials",
        status: 401,
      };
      return res.status(401).json(error);
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    console.log("isMatch", isMatch);
    if (!isMatch) {
      const error: ApiErrorResponse = {
        success: false,
        message: "Invalid credentials",
        status: 401,
      };

      return res.status(401).json(error);
    }

    // Generate JWT
    const token = generateToken({
      id: user._id,
      role: user.role,
      email: user.email,
    });

    const response: ApiSuccessResponse = {
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          token: token,
        },
      },
      status: 200,
    };

    return res.status(200).json(response);
  } catch (error) {
    logger.error({ error }, "Error in login controller");
    return res.status(500).json(genericError);
  }
};

export const getUserProfile = async (req: AuthenticatedRequest, res: any) => {
  
  const user = req.user;
  console.log("user", user);

  if (!user) {
    const error: ApiErrorResponse = {
      success: false,
      message: "User not found",
      status: 404,
    };
    return res.status(404).json(error);
  }

  const response: ApiSuccessResponse = {
    success: true,
    message: "Profile fetched successfully",
    data: {
      user: user,
    },
    status: 200,
  };

  return res.status(200).json(response);
};
