import express from "express";
import clienteController from "../controllers/clienteController.js";
 
const router = express.Router();
 
router
  .route("/")
  .get(clienteController.getCliente)
  .post(clienteController.crearCliente);
 
router
  .route("/:id")
  .put(clienteController.actualizarCliente)
  .delete(clienteController.eliminarCliente);
 
export default router;