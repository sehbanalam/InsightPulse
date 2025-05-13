import { Router } from "express";
import userRoutes from './users/users.route';
//import reportRoutes from './report/report.route';
// import more modules as you build them

const router = Router();

// Mount each module under its own path
router.use('/users', userRoutes);
//router.use('/reports', reportRoutes);


export default router;
