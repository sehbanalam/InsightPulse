import { Router } from "express";
import { ApiSuccessResponse } from "../interfaces/response.success";
//import userRoutes from './user/user.route';
//import reportRoutes from './report/report.route';
// import more modules as you build them

const router = Router();

// Mount each module under its own path
//router.use('/users', userRoutes);
//router.use('/reports', reportRoutes);
router.get("/routerHealth", (_req, res) => {
  const response: ApiSuccessResponse = {
    status: 200,
    success: true,
    message: "Router is live",
    data: null,
  };
  console.log("✅ Router is live");
  res.status(200).json(response);
});

export default router;
