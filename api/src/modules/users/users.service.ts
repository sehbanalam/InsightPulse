import { UserModel, User } from "./users.model";
import { hashPassword } from "../../utils/auth.utils";

/**
 * Create a new user
 */
export const createUser = async (data: Partial<User>): Promise<User> => {
  // Hash the password before saving
  if (data.password) {
    data.password = await hashPassword(data.password);
  }
  const user = new UserModel(data);
  return await user.save();
};

/**
 * Get all users
 */
export const getAllUsers = async (): Promise<User[]> => {
  return await UserModel.find();
};

/**
 * Get user by ID
 */
export const getUserById = async (id: string): Promise<User | null> => {
  return await UserModel.findById(id);
};

/**
 * Update user by ID
 */
export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  return await UserModel.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Delete user by ID
 */
export const deleteUser = async (id: string): Promise<User | null> => {
  return await UserModel.findByIdAndDelete(id);
};

export const getUserByEmail = async (email: string) => {
  return UserModel.findOne({ email }).exec();
};
