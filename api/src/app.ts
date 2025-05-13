import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { ApiSuccessResponse } from "./interfaces/response.success";
import routes from "./modules"; // This will import all module routes
import { errorHandler } from "./middlewares/error.middleware";

const app: Application = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// Health Check
app.get("/api/v1/health", (_req, res) => {
  const response: ApiSuccessResponse = {
    status: 200,
    success: true,
    message: "API is live",
    data: null,
  };

  console.log("✅ API is live");
  res.status(200).json(response);
});

// App Routes
app.use("/api/v1", routes);

// Error Handler (should be last)
app.use(errorHandler);

export default app;
