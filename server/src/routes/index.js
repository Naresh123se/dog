import express from "express";
import userRouter from "./userRoutes.js";
import dogRoutes from "./dogRoutes.js";
import blogRoutes from "./blogRoutes.js";
import breedRoutes from "./breedRoutes.js";
import adminRoutes from "./adminRoute.js";

const router = express.Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/dogs", dogRoutes);
router.use("/api/v1/blogs", blogRoutes);
router.use("/api/v1/breeds", breedRoutes);
router.use("/api/v1/admin", adminRoutes);

export default router;
