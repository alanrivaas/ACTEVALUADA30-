import express from "express";
import empleadoController from "../controllers/empleadoController.js";
 
const router = express.Router();
 
router
  .route("/")
  .get(empleadoController.getEmpleado)
  .post(empleadoController.crearEmpleado);
 
router
  .route("/:id")
  .put(empleadoController.actualizarEmpleado)
  .delete(empleadoController.eliminarEmpleado);
 
export default router;