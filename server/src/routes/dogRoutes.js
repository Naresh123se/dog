// routes/dogRoutes.js
import express from "express";
import DogController from "../controllers/dogController.js";
import { isAuthenticated } from "../middlewares/auth.js";


const dogRouter = express.Router();

// ********************* DOG MANAGEMENT ROUTES *********************
dogRouter.post(
  "/add-dog",
  isAuthenticated,
  DogController.addDog
);

dogRouter.get("/all-dogs", DogController.getAllDogs);
dogRouter.get("/dog/:id", DogController.getDog);
dogRouter.get("/dogs-by-breed/:breedId", DogController.getDogsByBreed);

dogRouter.put(
  "/update-dog/:id",
  isAuthenticated,
  DogController.updateDog
);

dogRouter.delete("/delete-dog/:id", isAuthenticated, DogController.deleteDog);

export default dogRouter;
