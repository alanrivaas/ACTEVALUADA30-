const clienteController = {};
import clienteModel from "../models/clientes";
 
clienteController.getCliente = async (req, res) => {
  const cliente = await clienteModel.find();
  res.json(cliente);
};
 
clienteController.crearCliente = async (req, res) => {
  const { name, email, password, telephone, address, active } = req.body;
  const nuevoCliente = new clienteModel({ name, email, password, telephone, address, active});
  await nuevoCliente.save();
  res.json({ message: "clienteGuardado" });
};
 
clienteController.eliminarCliente = async (req, res) => {
const eliminarClientes = await customersModel.findByIdAndDelete(req.params.id);
  if (!eliminarClientes) {
    return res.status(404).json({ message: "cliente no encontrado" });
  }
  res.json({ message: "cliente eliminado" });
};
 
 
clienteController.actualizarCliente = async (req, res) => {
  const {  name,
        email,
        password,
        telephone,
        address,
        active, } = req.body;
 
  await clienteModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
        email,
        password,
        telephone,
        address,
        active,
    },
    { new: true }
  );
  res.json({ message: "cliente actualizado con exito" });
};
 
export default clientesController;
 
 