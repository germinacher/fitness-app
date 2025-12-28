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

  module.exports = { generateRutina };