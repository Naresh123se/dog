// routes/blogRoutes.js
import express from "express";
import AdminController from "../controllers/adminController.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const adminRouter = express.Router();

// ********************* Admin MANAGEMENT ROUTES *********************

adminRouter.get("/all-blogs", AdminController.getAllBlogs);
adminRouter.get("/all-breeds", AdminController.getAllBreeds);
adminRouter.get("/all-dogs", AdminController.getAllDogs);
adminRouter.get("/all-users", AdminController.getAllUser);
adminRouter.put(
  "/ban/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  AdminController.banUserByAdmin
);

export default adminRouter;
