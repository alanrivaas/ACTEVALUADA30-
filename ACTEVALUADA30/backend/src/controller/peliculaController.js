const peliculaController = {};
import peliculasModel from "../models/peliculas.js";
 
peliculaController.getMovies = async (req, res) => {
  const pelicula = await peliculasModel.find();
  res.json(pelicula);
};
 
peliculaController.createMovies = async (req, res) => {
  const { name, description, director, gender, year, duration, image } = req.body;
  const newPelicula = new peliculasModel({ name, description, director, gender, year, duration, image });
  await newPelicula.save();
  res.json({ message: "pelicula Guardada" });
};
 
peliculaController.deleteMovies = async (req, res) => {
  const deletedPelicula = await peliculasModel.findByIdAndDelete(req.params.id);
  if (!deletedPelicula) {
    return res.status(404).json({ message: "Pelicula no encontrada" });
  }
  res.json({ message: "pelicula eliminada" });
};
 
peliculaController.updateMovies = async (req, res) => {
  const { name, description, director, gender, year, duration, image } = req.body;
  await peliculasModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      director,
      gender,
      year,
      duration,
      image
    },
    { new: true }
  );
  res.json({ message: "pelicula actualizada" });
};
 
export default peliculaController;
 