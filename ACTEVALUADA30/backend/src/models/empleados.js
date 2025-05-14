/*
    Campos:
        name,
        email,
        password,
        telephone,
        address,
        position,
        hireDate,
        salary,
        active,
*/
 
import { Schema, model } from "mongoose";
 
const empleadosSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
 
    email: {
        type: String,
      },
 
    password: {
      type: String,
 
    },
      telephone: {
        type: String,
        required: true,
     
      },
      address: {
        type: String,
      },
        position: {
        type: String,
        required: true,
      },
 
    hireDate: {
        type: Date,
      },
 
      salary: {
        type: Number,
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
 
export default model("empleados", empleadosSchema);
 
 