import { Schema, model, Document } from "mongoose";

// 1. Define the interface
export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the schema
const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: "User Name",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      default: "user@email.com",
    },
    password: {
      type: String,
      required: true,
      select: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Export the model
export const UserModel = model<User>("User", userSchema);
