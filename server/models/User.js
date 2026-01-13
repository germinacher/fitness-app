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

  // Respuestas del chatbot para regenerar rutinas
  dias_entrenamiento: { type: String }, // "3 días", "4 días", etc.
  duracion_entrenamiento: { type: String }, // "30 minutos", "60 minutos", etc.
  experiencia: { type: String }, // "Principiante", "Intermedio", "Avanzado"
  enfoque: { type: String }, // "Adaptada", "Balanceada"
  peso_objetivo: { type: Number }, // kg
  horario_preferido: { type: String }, // "Mañana", "Tarde", etc.
  
  // Control de progresión semanal
  semanaActual: { type: Number, default: 1, min: 1, max: 4 },

  // Reseteo de contraseña
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true }); // añade createdAt y updatedAt

module.exports = mongoose.model("User", userSchema);