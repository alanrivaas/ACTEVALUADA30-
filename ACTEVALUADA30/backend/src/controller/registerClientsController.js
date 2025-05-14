import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
 
import clientesModel from "../models/clientes.js";
import { config } from "../config.js";
 
const registerClientsController = {};
 
registerClientsController.register = async (req, res) => {
  const {  name,
        email,
        password,
        telephone,
        address,
        active, } = req.body;
 
  try {
    const existsClients = await clientesModel.findOne({ email });
    if (existsClients) {
      return res.json({ message: "Client Already exists" });
    }
 
    const passwordHash = await bcryptjs.hash(password, 10);
 
    const newClient = new clientesModel({
      name,
      email,
      password: passwordHash,
      telephone,
      address,
      active,
    });
 
    await newClient.save();
 
    const verificationCode = crypto.randomBytes(3).toString("hex");
 
    const tokenCode = jsonwebtoken.sign(
      { email, verificationCode },
      config.JWT.secret,
      { expiresIn: "2h" }
    );
 
    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });
 
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
 
    const MailOptions = {
      from: config.email.email_user,
      to: email,
      subject: "Verificación de correo",
      text: `Para verificar tu correo utiliza el siguiente código: ${verificationCode}\nEl código vence en dos horas.`,
    };
 
    transporter.sendMail(MailOptions, (error, info) => {
      if (error) return res.json({ message: "Error" });
      console.log("Correo enviado: " + info.response);
    });
 
    res.json({ message: "Cliente registrado, por favor verifica tu correo con el código" });
 
  } catch (error) {
    console.log(error);
    res.json({ message: "Error en el registro" });
  }
};
 
registerClientsController.verifyCodeEmail = async (req, res) => {
  const { verificationCode } = req.body;
 
  try {
    const token = req.cookies.verificationToken;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;
 
    if (verificationCode !== storedCode) {
      return res.json({ message: "Código inválido" });
    }
 
    const client = await clientesModel.findOne({ email });
    client.isVerified = true;
    await client.save();
 
    res.clearCookie("verificationToken");
    res.json({ message: "Correo verificado exitosamente" });
 
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
};
 
export default registerClientsController;
 
 