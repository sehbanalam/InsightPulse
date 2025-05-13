// Importing required modules and middleware
import { Router } from "express";
import * as UserController from "./users.controller";
import { authenticateJWT } from "../../middlewares/auth.middleware";

import { authorizeRoles } from "../../middlewares/role.middleware";

// Initialize the router
const router = Router();

/**
 * Route to create a new user
 * POST /create
 * Calls the createUser method from UserController
 */
router.post("/create", UserController.createUser);

/**
 * Route to fetch all users
 * GET /
 * Calls the getAllUsers method from UserController
 */
router.get(
  "/",
  authenticateJWT,
  authorizeRoles("admin"),
  UserController.getAllUsers
);

/**
 * Route for user login
 * POST /login
 * Calls the loginUser method from UserController
 */
router.post("/login", UserController.loginUser);

/**
 * Route to fetch the profile of the authenticated user
 * GET /profile
 * Protected route - requires JWT authentication
 * Calls the getUserProfile method from UserController
 */
router.get(
  "/profile",
  authenticateJWT,
  authorizeRoles(...["admin", "user"]),
  UserController.getUserProfile
);

/**
 * Route to fetch a user by their ID
 * GET /:id
 * Calls the getUserById method from UserController
 */
router.get("/:id", UserController.getUserById);

/**
 * Route to update a user by their ID
 * PUT /:id
 * Calls the updateUser method from UserController
 */
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles(...["admin", "user"]),
  UserController.updateUser
);

/**
 * Route to delete a user by their ID
 * DELETE /:id
 * Calls the deleteUser method from UserController
 */
router.delete("/:id", UserController.deleteUser);

// Export the router to be used in other parts of the application
export default router;
