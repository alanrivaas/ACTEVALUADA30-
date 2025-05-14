const empleadoController = {};
import empleadoModel from "../models/empleados";
 
empleadoController.getEmpleado = async (req, res) => {
  const empleado = await empleadoModel.find();
  res.json(empleado);
};
 
empleadoController.crearEmpleado = async (req, res) => {
  const {  name,email,
        password,
        telephone,
        address,
        position,
        hireDate,
        salary,
        active, } = req.body;
  const crearEmpleados= new employeeModel({ name, email,
        password,
        telephone,
        address,
        position,
        hireDate,
        salary,
        active, });
  await crearEmpleados.save();
  res.json({ message: "employee save" });
};
 
empleadoController.eliminarEmpleado = async (req, res) => {
const eliminarEmpleado = await empleadoModel.findByIdAndDelete(req.params.id);
  if (!eliminarEmpleado) {
    return res.status(404).json({ message: "empleado no encontrado" });
  }
  res.json({ message: "empleado eliminado" });
};
 
 
empleadoController.actualizarEmpleado = async (req, res) => {
  const {  email,
        password,
        telephone,
        address,
        position,
        hireDate,
        salary,
        active, } = req.body;
 
  await empleadoModel.findByIdAndUpdate(
    req.params.id,
    {
       name,
       email,
        password,
        telephone,
        address,
        position,
        hireDate,
        salary,
        active,
    },
    { new: true }
  );
 
  res.json({ message: "empleado actualizado con exito" });
};
 
export default empleadoController;
 
 