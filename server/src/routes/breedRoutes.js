// routes/breedRoutes.js
import express from "express";
import BreedController from "../controllers/breedController.js";
import { isAuthenticated } from "../middlewares/auth.js";
// import upload from "../middlewares/multer.js";

const breedRouter = express.Router();

// ********************* BREED MANAGEMENT ROUTES *********************
breedRouter.post(
  "/add-breed",
  isAuthenticated,
  BreedController.addBreed
);

breedRouter.get("/all-breeds", BreedController.getAllBreeds);
breedRouter.get("/breed/:id", BreedController.getBreed);

breedRouter.put(
  "/update-breed/:id",
  isAuthenticated,
  BreedController.updateBreed
);

breedRouter.delete(
  "/delete-breed/:id",
  isAuthenticated,
  BreedController.deleteBreed
);

export default breedRouter;
