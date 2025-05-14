/*
    Campos:
    name,
        titulo
        descripction
        director
        gender
        year
        duration
        image
*/
import { Schema, model } from "mongoose";
 
const peliculasSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    director: {
      type: String,
      required: true,
     
    },
    gender: {
      type: String,
     
    },
    year: {
        type: String,
       
      },
      duration: {
        type: String,
       
      },
      image: {
        type: String,
       
      },
     
  },
  {
    timestamps: true,
    strict: false,
  }
);
 
export default model("peliculas", peliculasSchema);
 
 