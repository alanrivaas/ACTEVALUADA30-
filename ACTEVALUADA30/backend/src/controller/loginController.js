/*
Como vamos a validar si es cliente o empleado
entonces importo modelos
*/
 
import ClientesModel from "../models/clientes.js";
import EmpleadosModel from "../models/empleados.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
 
const loginController = {};
loginController.login = async (req, res) =>{
   const {email, password} = req.body;
 
   try{
 
let userFound;
let userType;
 
if(email === config.emailAdmin.email && password == config.emailAdmin){
    userType = "Admin";
    userFound = {_id: "Admin"};
   }else{
  userFound = await EmpleadosModel.findOne({email});
  userType = "Empleado";
 
  if(!userFound){
    userFound = await ClientesModel.findOne({email})
    userType = "Clientes";
  }
}
 
  if(!userFound){
    return res.json({message: "Usuario no encontrado"})
  }
 
  if(userType !== "Admin"){
   const isMatch = bcryptjs.compare(password, userFound.password);
   if(!isMatch){
    return res.json({message: "contraseña invalida"});
   }
  }
 
 
  jsonwebtoken.sign(
  {id: userFound._id, userType},
  config.JWT.secret,
  {expiresIn: config.JWT.expiresIn},
  (error, token)=>{
    if(error) console.log(error);
    res.cookie("authToken", token)
    res.json({message: "usuario guardado"})
  }
  );
   }catch(error){
    console.log(error);
   }
};
 
export default loginController
 
 