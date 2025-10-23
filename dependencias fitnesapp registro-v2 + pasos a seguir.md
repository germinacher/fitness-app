**dependencias fitnesapp registro**



npm install express mongoose bcryptjs dotenv cors express-validator



* express → framework HTTP.
* mongoose → ORM/ODM para MongoDB (define modelos y facilita consultas).
* bcryptjs → para hashear contraseñas (seguro).
* dotenv → manejar variables de entorno (.env).
* cors → permitir que tu frontend (localhost:3000) haga peticiones.
* express-validator → validación de inputs.



nodemon también fue instalada



**Opcional (recomendado en producción):**



npm install express-rate-limit helmet



* express-rate-limit → limitar peticiones para evitar abuso.
* helmet → cabeceras de seguridad HTTP.



**Buenas prácticas y próximos pasos (recomendaciones)**



* No envíes contraseñas en claro por redes inseguras: usar HTTPS en producción (Cloud Run, Render, Vercel + API).
* Validaciones más estrictas (email formato, longitud contraseña, límites de altura/peso).
* Verificación por email: enviar link para verificar cuenta.
* Autenticación: implementar login y JWT/session para manejar sesión del usuario.
* Sanitizar inputs si vas a usar valores en consultas dinámicas.
* Backups de la base de datos, índices en credenciales.email para performance.
* Logs y monitoreo.



**PARA EJECUTAR**

en server: npm run dev

en registro\_v1: npm start

