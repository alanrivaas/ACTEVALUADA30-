import Empleado from "../models/empleados.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
 
const registerEmployeesController = {};
 
registerEmployeesController.register = async (req, res) => {
    const { name, email, password, telephone, address, position, hireDate, salary, active } = req.body;
 
    try {
        const existEmployee = await Empleado.findOne({ email });
        if (existEmployee) {
            return res.json({ message: "Employee already exist" });
        }
 
        const passwordHash = await bcryptjs.hash(password, 10);
 
        const newEmployee = new Empleado({
            name,
            email,
            password: passwordHash,
            telephone,
            address,
            position,
            hireDate,
            salary,
            active
        });
 
        await newEmployee.save();
 
        jsonwebtoken.sign(
            { id: newEmployee.id },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (error, token) => {
                if (error) console.log(error);
                res.cookie("authToken", token);
                res.json({ message: "registrado" });
            }
        );
    } catch (error) {
        console.log(error);
        res.json({ message: "Error al registrar empleado" });
    }
};
 
export default registerEmployeesController;
 
 