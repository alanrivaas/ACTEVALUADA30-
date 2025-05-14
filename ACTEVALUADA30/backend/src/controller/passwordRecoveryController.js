import jsonwebtoken from "jsonwebtoken"; //token
import bcrypt from "bcryptjs";//Encriptar
 
import clientesmodel from "../models/clientes.js";
import empleadosmodel from "../models/empleados.js";
 
import { sendEmail, HTMLRecoveryEmail } from "../utils/emailPasswordRecovery.js";
import { config } from "../config.js";
 
const PasswordRecoveryController = {};
PasswordRecoveryController.requestCode = async(req, res) => {
    const{email} = req.body;
 
    try {
        let userFound;
        let userType;
 
        userFound = await clientesmodel.findOne({email});
        if(userFound){
            userType = "client";
        }else{
            userFound = await empleadosmodel.findOne({email});
            userType = "employee";
        }
 
        if (!userFound) {
            return res.json({message: "User not found"})
        }
        code = Math.floor(10000 + Math.random()* 60000).toString
 
        const token =  jsonwebtoken.sign(
            {email, code, userType, verified:false },
            config.JWT.secret,
            {expiresIn: "25m"}
        )
        res.cookie("tokenRecoveryCode", token, {maxAge: 25 * 60 * 1000})
        await sendEmail(
            email,
            "password recoverid code",
            `your verification code is ${code}`,
            HTMLRecoveryEmail(code)
          );
          res.json({message: "Verificated cide send"});
           }catch (error){
            console.log("error" + error);
           }
        };
 
PasswordRecoveryController.verifyCode = async (req, res) => {
    const { code } = req.body;
   
    try {
      const token = req.cookies.tokenRecoveryCode;
   
      const decoded = jsonwebtoken.verify(token, config.JWT.secret);
   
      if (decoded.code !== code) {
        return res.json({ message: "Invalid code" });
      }
   
      const newToken = jsonwebtoken.sign(
        {
          email: decoded.email,
          code: decoded.code,
          userType: decoded.userType,
          verfied: true,
        },
        config.JWT.secret,
 
        { expiresIn: "25m" }
      );
   
      res.cookie("tokenRecoveryCode", newToken, { maxAge: 25 * 60 * 1000 });
   
      res.json({ message: "Code verified successfully" });
    } catch (error) {
      console.log("error" + error);
    }
  };
   
  PasswordRecoveryController.newPassword = async (req, res) => {
    const{newPassword} = req.body;
   
    try {
   
      const token = req.cookies.tokenRecoveryCode
   
      const decoded = jsonwebtoken.verify(token, config.JWT.secret)
   
      if(decoded.verfied){
        return res.json({ message: "code not verified"});
      }
   
      let user;
   
      const hashedPassword = await bcryptjs.hash(newPassword, 10)
   
      if(decoded.userType === "cliente"){
        user = await clientesmodel.findByIdAndDelete(
          {email},
          {password: hashedPassword},
          {new: true},
        )
      }else if( decoded.userType === "empleado"){
        user = await clientesmodel.findByIdAndDelete(
          {email},
          {password: hashedPassword},
          {new: true},
        )
    }
    res.clearCookie("tokenRecoveryCode");
    res.json({message: "password Update"})
   
   
   
  }catch(error){
    console.log("error");
  }
  }
   
   
  export default PasswordRecoveryController;
 
 