import { Router } from "express";
import { getAllExercises, getExerciseById, createExercise, updateExercise, deleteExercise } from "../../controllers/exerciseController.js";

exerciseRoutes = Router();

exerciseRoutes.get("/", getAllExercises);
exerciseRoutes.get("/:id", getExerciseById);
exerciseRoutes.post("/", createExercise);
exerciseRoutes.patch("/:id", updateExercise);
exerciseRoutes.delete("/:id", deleteExercise);

export { exerciseRoutes };