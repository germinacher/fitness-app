const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const transporter = require("../config/email.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateDieta } = require("./dietaUtils.js");
const { generateRutina, completarSemana } = require("./rutinaUtils.js");
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 👈 MUY IMPORTANTE
  message: {
    error: "Demasiadas solicitudes. Intenta nuevamente en 15 minutos."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

if (!process.env.FRONTEND_URL) {
  throw new Error('FRONTEND_URL no está definida');
}

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
  body("preferencias").isIn(["Vegano", "Vegetariano", "Ninguna"]).withMessage("Preferencia inválida"),
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
  body("preferencias").notEmpty().withMessage("La preferencia es obligatoria").isIn(["Vegano", "Vegetariano", "Ninguna"]).withMessage("Preferencia inválida"),
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
    const rutina = generateRutina(userInfo, answers, 1);
    const dieta = generateDieta(userInfo, answers);

    // Actualizar usuario con la rutina y dieta generadas
    user.rutina = rutina.split('\n').filter(line => line.trim());
    user.dieta = dieta.split('\n').filter(line => line.trim());

    user.semanaActual = 1; // Primera semana del ciclo

    // Guardar respuestas del chatbot para futuras regeneraciones
    user.dias_entrenamiento = answers.dias_entrenamiento;
    user.duracion_entrenamiento = answers.duracion_entrenamiento;
    user.experiencia = answers.experiencia;
    user.enfoque = answers.enfoque;
    user.peso_objetivo = answers.peso_objetivo;
    user.horario_preferido = answers.horario_preferido;

    await user.save();

    return res.status(200).json({
      message: "Plan generado exitosamente",
      rutina,
      dieta,
      semanaActual: 1
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post('/users/:id/completar-semana', async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Preparar userInfo
    const userInfo = {
      objetivo: user.objetivo,
      infoPersonal: user.infoPersonal,
      preferencias: user.preferencias,
      alergias: user.alergias,
      restricciones: user.restricciones,
      intolerancias: user.intolerancias,
      genero: user.genero
    };

    // ========== USAR ANSWERS GUARDADOS ==========
    const answers = {
      dias_entrenamiento: user.dias_entrenamiento,
      duracion_entrenamiento: user.duracion_entrenamiento,
      experiencia: user.experiencia,
      enfoque: user.enfoque,
      horario_preferido: user.horario_preferido,
      peso_objetivo: user.peso_objetivo
    };

    const semanaActual = user.semanaActual || 1;

    // Llamar a completarSemana
    const resultado = completarSemana(userInfo, answers, semanaActual);

    // Actualizar BD
    user.rutina = resultado.rutina.split('\n');
    user.semanaActual = resultado.semanaActual;
    await user.save();

    res.json({
      message: 'Rutina actualizada',
      rutina: user.rutina,
      semanaActual: resultado.semanaActual,
      cicloCompletado: resultado.cicloCompletado
    });

  } catch (err) {
    console.error('Error al completar semana:', err);
    res.status(500).json({ error: 'Error al generar nueva rutina' });
  }
});

// POST /api/forgot-password
router.post('/forgot-password', forgotPasswordLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    // Buscar usuario
    const user = await User.findOne({ 'credenciales.email': email });
    if (!user) {
      // No revelar si el email existe o no (seguridad)
      return res.json({ 
        message: 'Si el correo existe, recibirás un enlace de recuperación' 
      });
    }

    // Generar token único
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Guardar token hasheado y expiración (1 hora)
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    
    await user.save();

    // Crear URL de reseteo
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    // Enviar email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de Contraseña - Fitness App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A84FF;">Recuperación de Contraseña</h2>
          <p>Hola ${user.infoPersonal.nombre},</p>
          <p>Recibimos una solicitud para restablecer tu contraseña.</p>
          <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
          <a href="${resetUrl}" 
             style="display: inline-block; background-color: #0A84FF; color: white; 
                    padding: 12px 24px; text-decoration: none; border-radius: 8px; 
                    margin: 20px 0;">
            Restablecer Contraseña
          </a>
          <p>O copia y pega este enlace en tu navegador:</p>
          <p style="color: #666; word-break: break-all;">${resetUrl}</p>
          <p style="color: #999; font-size: 0.9em;">
            Este enlace expirará en 1 hora.
          </p>
          <p style="color: #999; font-size: 0.9em;">
            Si no solicitaste esto, ignora este correo.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      message: 'Si el correo existe, recibirás un enlace de recuperación' 
    });

  } catch (err) {
    console.error('Error en forgot-password:', err);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

// POST /api/reset-password/:token
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Validar contraseña
    if (!password || password.length < 6) {
      return res.status(400).json({ 
        error: 'La contraseña debe tener al menos 6 caracteres' 
      });
    }

    // Hashear token recibido
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Buscar usuario con token válido y no expirado
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        error: 'Token inválido o expirado. Solicita un nuevo enlace.' 
      });
    }

    // Actualizar contraseña
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    user.credenciales.password = hashedPassword;
    
    // Limpiar campos de reseteo
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();

    res.json({ message: 'Contraseña actualizada exitosamente' });

  } catch (err) {
    console.error('Error en reset-password:', err);
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
});


module.exports = router;