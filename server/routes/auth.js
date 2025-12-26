const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// POST /api/register
router.post("/register",
  // Validaciones con express-validator
  body("email").isEmail().withMessage("Email inválido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("nombre").notEmpty().withMessage("El nombre es requerido"),
  body("apellido").notEmpty().withMessage("El apellido es requerido"),
  body("altura").isFloat({ min: 100, max: 300 }).withMessage("Altura inválida"),
  body("peso").isFloat({ min: 35, max: 300 }).withMessage("Peso inválido"),
  body("edad").isInt({ min: 18, max: 120 }).withMessage("Edad inválida"),
  body("genero").isIn(["Masculino", "Femenino", "Otro"]).withMessage("Género inválido"),
  body("objetivo").isIn(["Aumentar masa muscular", "Perder grasa", "Mantener peso"]).withMessage("Objetivo inválido"),
  body("preferencias").isIn(["Vegano", "Vegetariano", "Pescetariano", "Ninguna"]).withMessage("Preferencia inválida"),
  body("alergias").isArray().withMessage("Las alergias deben ser un array"),
  body("restricciones").isArray().withMessage("Las restricciones deben ser un array"),
  body("intolerancias").isArray().withMessage("Las intolerancias deben ser un array"),
  async (req, res) => {
    // 1) validar inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password, nombre, apellido, altura, peso, edad, genero, objetivo, preferencias, alergias, restricciones, intolerancias } = req.body;

      // 2) comprobar si ya existe email
      const existing = await User.findOne({ "credenciales.email": email });
      if (existing) return res.status(409).json({ error: "Email ya registrado" });

      // 3) hashear contraseña
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      // 4) procesar arrays vacíos - si están vacíos, poner "Ninguna"
      const procesarArray = (arr) => {
        return Array.isArray(arr) && arr.length > 0 ? arr : ["Ninguna"];
      };

      // 5) crear usuario con la estructura deseada
      const newUser = new User({
        credenciales: { email, password: hashed },
        infoPersonal: { 
          nombre: nombre.trim(), 
          apellido: apellido.trim(), 
          altura: Number(altura), 
          peso: Number(peso), 
          edad: Number(edad) 
        },
        genero: genero,
        objetivo: objetivo,
        preferencias: preferencias,
        alergias: procesarArray(alergias),
        restricciones: procesarArray(restricciones),
        intolerancias: procesarArray(intolerancias),
        dieta: [], // vacío por defecto
        rutina: [] // vacío por defecto
      });

      await newUser.save();

      return res.status(201).json({
        message: "Usuario creado",
        userId: newUser._id,
        email: newUser.credenciales.email,
      });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);

// POST /api/login
router.post("/login",
  // Validaciones
  body("email").isEmail().withMessage("Email inválido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  async (req, res) => {
    // Validar inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;

      // Buscar usuario por email
      const user = await User.findOne({ "credenciales.email": email });
      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Verificar contraseña
      const isValidPassword = await bcrypt.compare(password, user.credenciales.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Respuesta exitosa (sin contraseña)
      return res.status(200).json({
        message: "Inicio de sesión exitoso",
        userId: user._id,
        email: user.credenciales.email,
        token: "user-authenticated", // Token simple para verificar autenticación
      });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);

// GET /api/users/:id - obtener perfil (sin contraseña)
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).lean();
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // ocultar hash
    if (user.credenciales) {
      delete user.credenciales.password;
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

// PUT /api/users/:id - actualizar perfil editable
router.put(
  "/users/:id",
  body("altura").notEmpty().withMessage("La altura es obligatoria").isFloat({ min: 100, max: 300 }).withMessage("Altura inválida"),
  body("peso").notEmpty().withMessage("El peso es obligatorio").isFloat({ min: 35, max: 300 }).withMessage("Peso inválido"),
  body("edad").notEmpty().withMessage("La edad es obligatoria").isInt({ min: 18, max: 120 }).withMessage("Edad inválida"),
  body("objetivo").notEmpty().withMessage("El objetivo es obligatorio").isIn(["Aumentar masa muscular", "Perder grasa", "Mantener peso"]).withMessage("Objetivo inválido"),
  body("preferencias").notEmpty().withMessage("La preferencia es obligatoria").isIn(["Vegano", "Vegetariano", "Pescetariano", "Ninguna"]).withMessage("Preferencia inválida"),
  body("alergias").optional().isArray(),
  body("restricciones").optional().isArray(),
  body("intolerancias").optional().isArray(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { id } = req.params;
      const {
        altura,
        peso,
        edad,
        objetivo,
        preferencias,
        alergias,
        restricciones,
        intolerancias,
      } = req.body;

      const procesarArray = (arr) => (Array.isArray(arr) && arr.length > 0 ? arr : ["Ninguna"]);

      const update = {};
      if (altura !== undefined) update["infoPersonal.altura"] = Number(altura);
      if (peso !== undefined) update["infoPersonal.peso"] = Number(peso);
      if (edad !== undefined) update["infoPersonal.edad"] = Number(edad);
      if (objetivo !== undefined) update.objetivo = objetivo;
      if (preferencias !== undefined) update.preferencias = preferencias;
      if (alergias !== undefined) update.alergias = procesarArray(alergias);
      if (restricciones !== undefined) update.restricciones = procesarArray(restricciones);
      if (intolerancias !== undefined) update.intolerancias = procesarArray(intolerancias);

      const updated = await User.findByIdAndUpdate(id, update, { new: true }).lean();
      if (!updated) return res.status(404).json({ error: "Usuario no encontrado" });
      if (updated.credenciales) delete updated.credenciales.password;
      return res.status(200).json({ message: "Perfil actualizado", user: updated });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);

// PUT /api/users/:id/password - cambiar contraseña
router.put(
  "/users/:id/password",
  body("currentPassword").isLength({ min: 6 }),
  body("newPassword").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      const ok = await bcrypt.compare(currentPassword, user.credenciales.password);
      if (!ok) return res.status(401).json({ error: "Contraseña actual incorrecta" });

      const salt = await bcrypt.genSalt(10);
      user.credenciales.password = await bcrypt.hash(newPassword, salt);
      await user.save();
      return res.status(200).json({ message: "Contraseña actualizada" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);

// POST /api/users/:id/generate-plan - Generar rutina y dieta personalizada
router.post("/users/:id/generate-plan", async (req, res) => {
  try {
    const { id } = req.params;
    const { userInfo, answers } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // Generar rutina basada en la información
    const rutina = generateRutina(userInfo, answers);
    const dieta = generateDieta(userInfo, answers);

    // Actualizar usuario con la rutina y dieta generadas
    user.rutina = rutina.split('\n').filter(line => line.trim());
    user.dieta = dieta.split('\n').filter(line => line.trim());
    await user.save();

    return res.status(200).json({
      message: "Plan generado exitosamente",
      rutina,
      dieta
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Función para generar rutina personalizada
function generateRutina(userInfo, answers) {
  const { objetivo, infoPersonal, genero } = userInfo;
  const { dias_entrenamiento, duracion_entrenamiento, experiencia } = answers;

  let reps;
  let series;
  let busqueda;
  if (experiencia === "Principiante"){
    reps = "10-12";
    series = "2";
    busqueda = "Aprender técnica y adaptarse sin sobrecarga";
  }
  else if (experiencia === "Intermedio"){
    reps = "8-12";
    series = "3";
    busqueda = "Progresar semana a semana";
  }
  else if (experiencia === "Avanzado" && objetivo === "Aumentar masa muscular") {
    reps = "6-10";
    series = "4";
    busqueda = "Máximo estímulo con volumen alto pero controlado";
  }
  else {
    reps = "8-12";
    series = "3";
    busqueda = "Máximo estímulo con volumen medio";
  }
  
  let rutina = `📋 RUTINA PERSONALIZADA\n\n`;
  rutina += `Objetivo: ${objetivo}\n`;
  rutina += `Días de entrenamiento: ${dias_entrenamiento}\n`;
  rutina += `Duración por sesión: ${duracion_entrenamiento}\n`;
  rutina += `Búsqueda: ${busqueda}\n`;
  rutina += `Nivel: ${experiencia}\n\n`;

  // Rutina según objetivo
  if (objetivo === "Aumentar masa muscular") {
    rutina += `💪 ENTRENAMIENTO DE FUERZA E HIPERTROFIA\n\n`;

    if (dias_entrenamiento.includes("3")) {
      rutina += `Día 1 - Tren Superior:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con barra: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Tríceps en polea: ${series} series x ${reps} repeticiones\n\n`;
      
      rutina += `Día 2 - Tren Inferior:\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Prensa de piernas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensiones de cuádriceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl femoral: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 3 - Tren Superior (Variación):\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Dominadas o jalon al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevaciones laterales: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Triceps press francés: ${series} series x ${reps} repeticiones\n\n`;
    }
    else if (dias_entrenamiento.includes("4")) {
      rutina += `Día 1 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre cerrado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con mancuerna (unilateral): ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps con mancuernas en banco inclinado: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 2 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `HOMBROS:\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevaciones laterales: ${series} series x ${reps} repeticiones\n`;
      rutina += `TRÍCEPS:\n`;
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 3 - Piernas:\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Prensa de piernas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensiones de cuádriceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl femoral: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 4 - Tren Superior:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con barra: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Tríceps en polea: ${series} series x ${reps} repeticiones\n\n`;
    }
    else if (dias_entrenamiento.includes("5")) {
      rutina += `Día 1 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre cerrado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con mancuerna (unilateral): ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps con mancuernas en banco inclinado: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 2 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas de pecho en maquina: ${series} series x ${reps} repeticiones\n`
      rutina += `- Fondos en paralelas: ${series} series x ${reps} repeticiones\n`
      rutina += `TRÍCEPS:\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 3 - Hombros y Piernas:\n`;
      rutina += `HOMBROS:\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevaciones laterales: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas invertidas en maquina: ${series} series x ${reps} repeticiones\n`
      rutina += `- Encogimientos de trapecios: ${series} series x ${reps} repeticiones\n`
      rutina += `PIERNAS:\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Prensa de piernas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensiones de cuádriceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl femoral: ${series} series x ${reps} repeticiones\n\n`;
      
      rutina += `Día 4 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre neutro: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con mancuerna (unilateral): ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps en polea baja: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 5 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas de pecho en maquina: ${series} series x ${reps} repeticiones\n`
      rutina += `- Aperturas en polea alta: ${series} series x ${reps} repeticiones\n`
      rutina += `TRÍCEPS:\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;
    }
    else {
      rutina += `Día 1 - Hombros y Piernas:\n`;
      rutina += `HOMBROS:\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevaciones laterales: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas invertidas en maquina: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Encogimientos de trapecios: ${series} series x ${reps} repeticiones\n`;
      rutina += `PIERNAS:\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Prensa de piernas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensiones de cuádriceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl femoral: ${series} series x ${reps} repeticiones\n\n`;
      
      rutina += `Día 2 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre cerrado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con mancuerna (unilateral): ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps con mancuernas en banco inclinado: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 3 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas de pecho en maquina: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Fondos en paralelas: ${series} series x ${reps} repeticiones\n`;
      rutina += `TRÍCEPS:\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 4 - Hombros y Piernas:\n`;
      rutina += `HOMBROS:\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevaciones laterales: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas invertidas en maquina: ${series} series x ${reps} repeticiones\n`
      rutina += `- Encogimientos de trapecios: ${series} series x ${reps} repeticiones\n`
      rutina += `PIERNAS:\n`;
      rutina += `- Sentadilla en maquina Hack Squat: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Estocadas con mancuernas (unilateral): ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensiones de cuádriceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl femoral: ${series} series x ${reps} repeticiones\n\n`;
      
      rutina += `Día 5 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre neutro: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con mancuerna (unilateral): ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps en polea baja: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 6 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas de pecho en maquina: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas en polea alta: ${series} series x ${reps} repeticiones\n`;
      rutina += `TRÍCEPS:\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;
    }
  } 
  
  if (objetivo === "Perder grasa") {
    rutina += `🔥 ENTRENAMIENTO DE QUEMA DE GRASA\n\n`;

    if (dias_entrenamiento.includes("3")) {
      rutina += `Día 1 - Tren Inferior + Cardio:\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Prensa de piernas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensiones de cuádriceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl femoral: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Cardio: 20-30 minutos zona 2 (correr, bici, elíptica)\n\n`;
      
      rutina += `Día 2 - HIIT:\n`;
      rutina += `- 10 minutos de cardio, zona 3\n`;
      rutina += `- 5-7 pasadas de 1 minuto de alta intensidad (90%)\n`;
      rutina += `- Descanso activo de 2 minutos entre pasadas, zona 2-3\n`;
      rutina += `- 5 minutos de enfriamiento, zona 2-3\n\n`;
      
      rutina += `Día 3 - Full Body Fuerza:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con barra: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n\n`;
    }
    else if (dias_entrenamiento.includes("4")) {
      rutina += `Día 1 - Tren Inferior + Cardio:\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Prensa de piernas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensiones de cuádriceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl femoral: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Cardio: 20-30 minutos zona 2 (correr, bici, elíptica)\n\n`;
      
      rutina += `Día 2 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre cerrado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con mancuerna (unilateral): ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps con mancuernas en banco inclinado: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 3 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `HOMBROS:\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevaciones laterales: ${series} series x ${reps} repeticiones\n`;
      rutina += `TRÍCEPS:\n`;
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 4 - HIIT:\n`;
      rutina += `- 10 minutos de cardio, zona 3\n`;
      rutina += `- 5-7 pasadas de 1 minuto de alta intensidad (90%)\n`;
      rutina += `- Descanso activo de 2 minutos entre pasadas, zona 2-3\n`;
      rutina += `- 5 minutos de enfriamiento, zona 2-3\n\n`;
    }
    else if (dias_entrenamiento.includes("5")) {
      rutina += `Día 1 - Tren Inferior + Cardio:\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Prensa de piernas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensiones de cuádriceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl femoral: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Cardio: 20-30 minutos zona 2 (correr, bici, elíptica)\n\n`;

      rutina += `Día 2 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre cerrado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con mancuerna (unilateral): ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps con mancuernas en banco inclinado: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 3 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas de pecho en maquina: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Fondos en paralelas: ${series} series x ${reps} repeticiones\n`;
      rutina += `TRÍCEPS:\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 4 - HIIT:\n`;
      rutina += `- 10 minutos de cardio, zona 3\n`;
      rutina += `- 5-7 pasadas de 1 minuto de alta intensidad (90%)\n`;
      rutina += `- Descanso activo de 2 minutos entre pasadas, zona 2-3\n`;
      rutina += `- 5 minutos de enfriamiento, zona 2-3\n\n`;

      rutina += `Día 5 - Tren Superior Fuerza:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con barra: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevaciones laterales: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Tríceps en polea: ${series} series x ${reps} repeticiones\n\n`;
    }
    else {
      rutina += `Día 1 - Hombros y Piernas + Cardio:\n`;
      rutina += `HOMBROS:\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevaciones laterales: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas invertidas en maquina: ${series} series x ${reps} repeticiones\n`
      rutina += `PIERNAS:\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Prensa de piernas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Cardio: 20-30 minutos zona 2 (correr, bici, elíptica)\n\n`;

      rutina += `Día 2 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre cerrado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con mancuerna (unilateral): ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps con mancuernas en banco inclinado: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 3 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas de pecho en maquina: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Fondos en paralelas: ${series} series x ${reps} repeticiones\n`;
      rutina += `TRÍCEPS:\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 4 - HIIT:\n`;
      rutina += `- 10 minutos de cardio, zona 3\n`;
      rutina += `- 5-7 pasadas de 1 minuto de alta intensidad (90%)\n`;
      rutina += `- Descanso activo de 2 minutos entre pasadas, zona 2-3\n`;
      rutina += `- 5 minutos de enfriamiento, zona 2-3\n\n`;

      rutina += `Día 5 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre neutro: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con mancuerna (unilateral): ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps en polea baja: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 6 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas de pecho en maquina: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas en polea alta: ${series} series x ${reps} repeticiones\n`;
      rutina += `TRÍCEPS:\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;
    }
  } 
  
  if (objetivo === "Mantener peso") {
    rutina += `⚖️ ENTRENAMIENTO DE MANTENIMIENTO\n\n`;

    if (dias_entrenamiento.includes("3")) {
      rutina += `Día 1 - Tren Superior:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevaciones laterales: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n\n`;
      
      rutina += `Día 2 - Tren Inferior + Cardio:\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Prensa de piernas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensiones de cuádriceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl femoral: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Cardio: 20-30 minutos zona 2 (correr, bici, elíptica)\n\n`;
      
      rutina += `Día 3 - Full Body:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con barra: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`;
    }
    else if (dias_entrenamiento.includes("4")) {
      rutina += `Día 1 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre cerrado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps con mancuernas en banco inclinado: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 2 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Fondos en paralelas: ${series} series x ${reps} repeticiones\n`
      rutina += `TRÍCEPS:\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 3 - Piernas y Hombros:\n`;
      rutina += `HOMBROS:\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevaciones laterales: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas invertidas en maquina: ${series} series x ${reps} repeticiones\n`
      rutina += `PIERNAS:\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Prensa de piernas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensiones de cuádriceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl femoral: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 4 - Tren Superior:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con barra: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Tríceps en polea: ${series} series x ${reps} repeticiones\n\n`;
    }
    else if (dias_entrenamiento.includes("5")) {
      rutina += `Día 1 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre cerrado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps con mancuernas en banco inclinado: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 2 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Fondos en paralelas: ${series} series x ${reps} repeticiones\n`
      rutina += `TRÍCEPS:\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 3 - Hombros y Piernas:\n`;
      rutina += `HOMBROS:\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevaciones laterales: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas invertidas en maquina: ${series} series x ${reps} repeticiones\n`
      rutina += `PIERNAS:\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Prensa de piernas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensiones de cuádriceps: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl femoral: ${series} series x ${reps} repeticiones\n\n`;
      
      rutina += `Día 4 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre neutro: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con mancuerna (unilateral): ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps en polea baja: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 5 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas de pecho en maquina: ${series} series x ${reps} repeticiones\n`
      rutina += `TRÍCEPS:\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;
    }
    else {
      rutina += `Día 1 - Hombros y Piernas:\n`;
      rutina += `HOMBROS:\n`;
      rutina += `- Press militar: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevaciones laterales: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas invertidas en maquina: ${series} series x ${reps} repeticiones\n`
      rutina += `PIERNAS:\n`;
      rutina += `- Sentadillas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Prensa de piernas: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Elevación de pantorrillas: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 2 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre cerrado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo con mancuerna (unilateral): ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps con mancuernas en banco inclinado: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 3 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas de pecho en maquina: ${series} series x ${reps} repeticiones\n`;
      rutina += `TRÍCEPS:\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 4 - HIIT:\n`;
      rutina += `- 10 minutos de cardio, zona 3\n`;
      rutina += `- 5-7 pasadas de 1 minuto de alta intensidad (90%)\n`;
      rutina += `- Descanso activo de 2 minutos entre pasadas, zona 2-3\n`;
      rutina += `- 5 minutos de enfriamiento, zona 2-3\n\n`;

      rutina += `Día 5 - Jalón (Pull):\n`;
      rutina += `ESPALDA:\n`;
      rutina += `- Jalón al pecho: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Jalón al pecho agarre neutro: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Remo en polea sentado: ${series} series x ${reps} repeticiones\n`;
      rutina += `BÍCEPS:\n`;
      rutina += `- Curl de bíceps en barra W: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Bíceps martillo: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Curl de bíceps en polea baja: ${series} series x ${reps} repeticiones\n\n`;

      rutina += `Día 6 - Empuje (Push):\n`;
      rutina += `PECHO:\n`;
      rutina += `- Press de banca: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Press inclinado: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Aperturas en polea alta: ${series} series x ${reps} repeticiones\n`;
      rutina += `TRÍCEPS:\n`;
      rutina += `- Tríceps press francés: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con polea: ${series} series x ${reps} repeticiones\n`;
      rutina += `- Extensión de tríceps con soga: ${series} series x ${reps} repeticiones\n\n`;
    }
  }

  rutina += `📝 NOTAS:\n`;
  rutina += `- Calienta 5-10 minutos antes de entrenar\n`;
  rutina += `- Descansa 60-90 segundos entre series y 120-180 segundos entre ejercicios\n`;
  rutina += `- Hidrátate constantemente\n`;
  rutina += `- Duerme al menos 8 horas diarias, tus músculos necesitan regenerarse\n`;
  rutina += `- Escucha a tu cuerpo y ajusta la intensidad\n\n`;

  rutina += `⚠️ Este plan es orientativo y no reemplaza la evaluación de un profesional de la salud. Si tienes lesiones o condiciones médicas, consulta con un especialista\n.`;

  return rutina;
}

// Función para generar dieta personalizada
function generateDieta(userInfo, answers) {
  const { objetivo, infoPersonal, preferencias, alergias, restricciones, intolerancias } = userInfo;
  const { peso, altura, edad, genero } = infoPersonal;
  const {horario_preferido, peso_objetivo} = answers;
  
  // Calcular calorías aproximadas (fórmula simplificada)
  const alturaMetros = altura / 100;
  let caloriasBase = genero === "Masculino" 
    ? 10 * peso + 6.25 * altura - 5 * edad + 5
    : 10 * peso + 6.25 * altura - 5 * edad - 161;
  
  let factorActividad = 1.5; // Moderadamente activo
  let caloriasDiarias = Math.round(caloriasBase * factorActividad);
  
  if (objetivo === "Perder grasa") {
    caloriasDiarias = Math.round(caloriasDiarias * 0.85); // Déficit del 15%
  } else if (objetivo === "Aumentar masa muscular") {
    caloriasDiarias = Math.round(caloriasDiarias * 1.15); // Superávit del 15%
  }

  let dieta = `🍎 DIETA PERSONALIZADA\n\n`;
  dieta += `Calorías diarias objetivo: ${caloriasDiarias} kcal\n`;
  dieta += `Objetivo: ${objetivo}\n`;
  dieta += `Peso actual: ${peso}\n`;
  dieta += `Peso objetivo: ${peso_objetivo}\n`;
  dieta += `Preferencias: ${preferencias}\n\n`;

  // Considerar restricciones
  const tieneRestricciones = alergias.some(a => a !== "Ninguna") || 
                            restricciones.some(r => r !== "Ninguna") ||
                            intolerancias.some(i => i !== "Ninguna");
  
  if (tieneRestricciones) {
    dieta += `⚠️ RESTRICCIONES CONSIDERADAS:\n`;
    if (alergias.some(a => a !== "Ninguna")) dieta += `Alergias: ${alergias.filter(a => a !== "Ninguna").join(", ")}\n`;
    if (restricciones.some(r => r !== "Ninguna")) dieta += `Restricciones: ${restricciones.filter(r => r !== "Ninguna").join(", ")}\n`;
    if (intolerancias.some(i => i !== "Ninguna")) dieta += `Intolerancias: ${intolerancias.filter(i => i !== "Ninguna").join(", ")}\n`;
    dieta += `\n`;
  }

  // Distribución de macronutrientes
  let proteinas, carbohidratos, grasas;
  
  if (objetivo === "Aumentar masa muscular") {
    proteinas = Math.round(caloriasDiarias * 0.30 / 4); // 30% proteínas
    carbohidratos = Math.round(caloriasDiarias * 0.45 / 4); // 45% carbohidratos
    grasas = Math.round(caloriasDiarias * 0.25 / 9); // 25% grasas
  } else if (objetivo === "Perder grasa") {
    proteinas = Math.round(caloriasDiarias * 0.35 / 4); // 35% proteínas
    carbohidratos = Math.round(caloriasDiarias * 0.35 / 4); // 35% carbohidratos
    grasas = Math.round(caloriasDiarias * 0.30 / 9); // 30% grasas
  } else {
    proteinas = Math.round(caloriasDiarias * 0.30 / 4); // 30% proteínas
    carbohidratos = Math.round(caloriasDiarias * 0.40 / 4); // 40% carbohidratos
    grasas = Math.round(caloriasDiarias * 0.30 / 9); // 30% grasas
  }

  dieta += `📊 MACRONUTRIENTES DIARIOS:\n`;
  dieta += `- Proteínas: ${proteinas}g (${Math.round(proteinas * 4)} kcal)\n`;
  dieta += `- Carbohidratos: ${carbohidratos}g (${Math.round(carbohidratos * 4)} kcal)\n`;
  dieta += `- Grasas: ${grasas}g (${Math.round(grasas * 9)} kcal)\n\n`;

  // Plan de comidas
  dieta += `🍽️ PLAN DE COMIDAS:\n\n`;
  
  dieta += `DESAYUNO (${Math.round(caloriasDiarias * 0.25)} kcal):\n`;
  if (preferencias === "Vegano") {
    dieta += `- Avena con frutas y frutos secos\n`;
    dieta += `- Batido de proteína vegana\n`;
    dieta += `- Tostadas integrales con aguacate\n`;
  } else if (preferencias === "Vegetariano") {
    dieta += `- Huevos revueltos con verduras\n`;
    dieta += `- Avena con frutas\n`;
    dieta += `- Yogur griego con granola\n`;
  } else {
    dieta += `- Huevos con pan integral\n`;
    dieta += `- Avena o cereales integrales\n`;
    dieta += `- Frutas frescas\n`;
  }
  dieta += `\n`;

  dieta += `MEDIA MAÑANA (${Math.round(caloriasDiarias * 0.10)} kcal):\n`;
  dieta += `- Fruta fresca\n`;
  dieta += `- Frutos secos (un puñado)\n`;
  dieta += `- Yogur o batido de proteína\n`;
  dieta += `\n`;

  dieta += `ALMUERZO (${Math.round(caloriasDiarias * 0.30)} kcal):\n`;
  if (preferencias === "Vegano") {
    dieta += `- Ensalada de quinoa con verduras\n`;
    dieta += `- Legumbres (lentejas, garbanzos, frijoles)\n`;
    dieta += `- Verduras al vapor o salteadas\n`;
  } else if (preferencias === "Vegetariano") {
    dieta += `- Proteína vegetal (tofu, tempeh) o huevos\n`;
    dieta += `- Arroz integral o quinoa\n`;
    dieta += `- Ensalada o verduras\n`;
  } else {
    dieta += `- Proteína magra (pollo, pescado, pavo)\n`;
    dieta += `- Carbohidrato complejo (arroz, pasta integral, patata)\n`;
    dieta += `- Verduras variadas\n`;
  }
  dieta += `\n`;

  dieta += `MERIENDA (${Math.round(caloriasDiarias * 0.10)} kcal):\n`;
  dieta += `- Fruta o batido de proteína\n`;
  dieta += `- Frutos secos\n`;
  dieta += `- Barrita de proteína (opcional)\n`;
  dieta += `\n`;

  dieta += `CENA (${Math.round(caloriasDiarias * 0.25)} kcal):\n`;
  if (preferencias === "Vegano") {
    dieta += `- Proteína vegetal (tofu, seitán, legumbres)\n`;
    dieta += `- Verduras al horno o salteadas\n`;
    dieta += `- Ensalada variada\n`;
  } else if (preferencias === "Vegetariano") {
    dieta += `- Proteína vegetal o huevos\n`;
    dieta += `- Verduras variadas\n`;
    dieta += `- Ensalada\n`;
  } else {
    dieta += `- Proteína magra (pescado, pollo, pavo)\n`;
    dieta += `- Verduras al vapor o salteadas\n`;
    dieta += `- Ensalada ligera\n`;
  }
  dieta += `\n`;

  dieta += `💧 HIDRATACIÓN:\n`;
  dieta += `- 2-3 litros de agua al día\n`;
  dieta += `- Agua antes, durante y después del entrenamiento\n`;
  dieta += `- Evitar bebidas azucaradas\n\n`;

  dieta += `📝 RECOMENDACIONES:\n`;
  dieta += `- Come cada 3-4 horas\n`;
  dieta += `- Incluye proteína en cada comida\n`;
  dieta += `- Prioriza alimentos integrales y naturales\n`;
  dieta += `- Cocina al vapor, horno o plancha\n`;
  dieta += `- Limita alimentos procesados\n\n`;

  dieta += `⚠️ Este plan es orientativo y no reemplaza la evaluación de un profesional de la salud. Si tienes lesiones o condiciones médicas, consulta con un especialista\n.`;

  return dieta;
}

module.exports = router;