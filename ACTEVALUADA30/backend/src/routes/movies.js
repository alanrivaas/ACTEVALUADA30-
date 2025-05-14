import express from "express";
import multer from "multer";
import peliculasController from "../controllers/peliculasController.js"; 
 
const router = express.Router();
 
router
  .route("/")
  .get(peliculasController.getMovies)
  .post(peliculasController.createMovies);
 
router
  .route("/:id")
  .put(peliculasController.updateMovies)
  .delete(peliculasController.deleteMovies); //
export default router;