/*
    Campos:
        name,
        email,
        password,
        telephon,
        address,
        active,
*/
 
import { Schema, model } from "mongoose";
 
const clientesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
 
    email: {
      type: String,
      required: true,
    },
 
    password: {
      type: String,
      required: true,
    },
 
    telephone: {
      type: String,
      required: true,
    },
 
    address: {
      type: String,
    },
    active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);
 
export default model("clientes", clientesSchema);
 
 