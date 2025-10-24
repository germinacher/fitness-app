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
  body("altura").isNumeric().withMessage("La altura debe ser un número"),
  body("peso").isNumeric().withMessage("El peso debe ser un número"),
  body("edad").isInt({ min: 13, max: 120 }).withMessage("La edad debe ser entre 13 y 120 años"),
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

      // 5) devolver respuesta sin password
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

module.exports = router;