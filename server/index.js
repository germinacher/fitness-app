require("dotenv").config();               // Carga variables de .env en process.env
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");        // Opcional, seguridad
const rateLimit = require("express-rate-limit"); // Opcional

const app = express();

// Middlewares globales
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" })); // permite peticiones desde frontend
app.use(express.json()); // parsea JSON entrante

// Limitar peticiones a 100 por 15 minutos (ejemplo del opcional)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Conexión a MongoDB
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/fitnessapp";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1);
  });

// Importar rutas
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes); // todas las rutas empiezan con /api

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});