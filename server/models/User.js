const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // puedes dejar _id autogenerado por MongoDB o definir uno manual
  credenciales: {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // guardaremos el hash
  },
  infoPersonal: {
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    altura: { type: Number, required: true }, // cm
    peso: { type: Number, required: true },   // kg
    edad: { type: Number, required: true },
  },
  genero: { type: String, required: true },
  objetivo: { type: String, required: true }, // ej 'perder peso'
  preferencias: { type: String, required: true }, // una sola preferencia alimentaria
  alergias: { type: [String], required: true },
  restricciones: { type: [String], required: true },
  intolerancias: { type: [String], required: true },
  dieta: { type: [String], default: [] }, // ids de platos
  rutina: { type: [String], default: [] }, // ids de ejercicios
}, { timestamps: true }); // añade createdAt y updatedAt

module.exports = mongoose.model("User", userSchema);