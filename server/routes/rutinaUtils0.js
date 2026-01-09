// BASE DE DATOS DE EJERCICIOS
const ejerciciosDB = {
    pecho: {
      compuestos: ['Press de banca', 'Press inclinado', 'Fondos en paralelas'],
      aislamiento: ['Aperturas de pecho en máquina', 'Aperturas en polea alta', 'Press en máquina']
    },
    espalda: {
      compuestos: ['Jalón al pecho', 'Remo con barra', 'Remo en polea sentado', 'Dominadas'],
      aislamiento: ['Jalón agarre cerrado', 'Jalón agarre neutro', 'Remo con mancuerna unilateral', 'Pullover en polea']
    },
    hombros: {
      compuestos: ['Press militar', 'Press con mancuernas'],
      aislamiento: ['Elevaciones laterales', 'Aperturas invertidas en máquina', 'Elevaciones frontales', 'Encogimientos de trapecios']
    },
    piernas: {
      cuadriceps: ['Sentadillas', 'Prensa de piernas', 'Extensiones de cuádriceps', 'Sentadilla hack', 'Estocadas'],
      isquiotibiales: ['Curl femoral', 'Peso muerto rumano'],
      gluteos: ['Hip thrust', 'Patada de glúteo en polea', 'Abducción de cadera'],
      pantorrillas: ['Elevación de pantorrillas de pie', 'Elevación de pantorrillas sentado']
    },
    brazos: {
      biceps: ['Curl de bíceps en barra W', 'Bíceps martillo', 'Curl de bíceps en banco inclinado', 'Curl en polea baja', 'Curl concentrado'],
      triceps: ['Tríceps press francés', 'Extensión de tríceps con polea', 'Extensión de tríceps con soga', 'Fondos en paralelas para tríceps']
    },
    core: {
      general: ['Plancha', 'Abdominales con peso', 'Elevación de piernas', 'Russian twist', 'Bicycle crunches']
    }
};
  
  // CONFIGURACIÓN POR NIVEL DE EXPERIENCIA
  function getConfiguracionNivel(experiencia, objetivo) {
    const configs = {
      'Principiante': {
        reps: '10-12',
        series: 2,
        descansoSeries: '60-90',
        descansoEjercicios: '90-120',
        volumenMultiplicador: 0.7,
        mensaje: 'Aprender técnica y adaptarse sin sobrecarga'
      },
      'Intermedio': {
        reps: '8-12',
        series: 3,
        descansoSeries: '60-90',
        descansoEjercicios: '120-150',
        volumenMultiplicador: 1.0,
        mensaje: 'Progresar semana a semana'
      },
      'Avanzado': {
        reps: objetivo === 'Aumentar masa muscular' ? '6-10' : '8-12',
        series: objetivo === 'Aumentar masa muscular' ? 4 : 3,
        descansoSeries: '90-120',
        descansoEjercicios: '120-180',
        volumenMultiplicador: 1.3,
        mensaje: 'Máximo estímulo con volumen ' + (objetivo === 'Aumentar masa muscular' ? 'alto' : 'medio') + ' pero controlado'
      }
    };
    
    return configs[experiencia] || configs['Intermedio'];
  }
  
  // CALCULAR EJERCICIOS SEGÚN DURACIÓN
  function calcularEjerciciosPorDuracion(duracion, experiencia) {
    const minutosMap = {
      '30 minutos': 30,
      '45 minutos': 45,
      '60 minutos': 60,
      '90 minutos': 90
    };
    
    const minutos = minutosMap[duracion] || 60;
    const config = getConfiguracionNivel(experiencia);
    
    // Tiempo estimado por ejercicio: (series * descanso promedio entre series) + tiempo de ejecución
    const tiempoPorEjercicio = (config.series * 1.5) + 3; // ~3 min ejecución + descansos
    const calentamiento = 8; // 8 minutos de calentamiento
    const estiramiento = 5; // 5 minutos de estiramiento final
    
    const tiempoDisponible = minutos - calentamiento - estiramiento;
    const numEjercicios = Math.floor(tiempoDisponible / tiempoPorEjercicio);
    
    return {
      numEjercicios: Math.max(4, Math.min(numEjercicios, 10)), // Mínimo 4, máximo 10
      tiempoCalentamiento: calentamiento,
      tiempoEstiramiento: estiramiento
    };
  }
  
  // ADAPTACIONES POR GÉNERO
  function getAdaptacionesGenero(genero, objetivo, enfoque) {
    if (enfoque === 'Adaptada') {
      return {
        enfasisPiernas: true,
        enfasisGluteos: true,
        enfasisCore: true,
        reducirVolumenSuperior: 0.8, // 20% menos volumen en tren superior
        mensaje: '💪 Rutina adaptada con mayor énfasis en piernas, glúteos y core',
        ejerciciosExtra: {
          gluteos: ['Hip thrust', 'Patada de glúteo en polea'],
          core: ['Plancha lateral', 'Elevación de piernas colgada']
        },
        modificaciones: {
          'Press de banca': 'Press de banca o press con mancuernas (menor peso, más control)',
          'Fondos en paralelas': 'Fondos asistidos o press en máquina',
          'Dominadas': 'Jalón al pecho o dominadas asistidas'
        }
      };
    } else {
      return {
        enfasisPiernas: false,
        enfasisGluteos: false,
        enfasisCore: false,
        reducirVolumenSuperior: 1.0,
        mensaje: '💪 Rutina enfocada en desarrollo muscular balanceado',
        ejerciciosExtra: {},
        modificaciones: {}
      };
    }
  }
  
  // SELECCIONAR EJERCICIOS PARA UN GRUPO MUSCULAR
  function seleccionarEjercicios(grupoMuscular, cantidad, yaUsados = []) {
    let ejercicios = [];
    
    if (grupoMuscular === 'piernas') {
      ejercicios = [
        ...ejerciciosDB.piernas.cuadriceps,
        ...ejerciciosDB.piernas.isquiotibiales,
        ...ejerciciosDB.piernas.gluteos,
        ...ejerciciosDB.piernas.pantorrillas
      ];
    } else if (grupoMuscular === 'pecho') {
      ejercicios = [...ejerciciosDB.pecho.compuestos, ...ejerciciosDB.pecho.aislamiento];
    } else if (grupoMuscular === 'espalda') {
      ejercicios = [...ejerciciosDB.espalda.compuestos, ...ejerciciosDB.espalda.aislamiento];
    } else if (grupoMuscular === 'hombros') {
      ejercicios = [...ejerciciosDB.hombros.compuestos, ...ejerciciosDB.hombros.aislamiento];
    } else if (grupoMuscular === 'biceps') {
      ejercicios = ejerciciosDB.brazos.biceps;
    } else if (grupoMuscular === 'triceps') {
      ejercicios = ejerciciosDB.brazos.triceps;
    }
    
    // Filtrar los ya usados
    ejercicios = ejercicios.filter(e => !yaUsados.includes(e));
    
    // Seleccionar aleatoriamente
    const seleccionados = [];
    for (let i = 0; i < cantidad && ejercicios.length > 0; i++) {
      const index = Math.floor(Math.random() * ejercicios.length);
      seleccionados.push(ejercicios[index]);
      ejercicios.splice(index, 1);
    }
    
    return seleccionados;
  }
  
  // CONSTRUIR DÍA DE ENTRENAMIENTO
  function construirDia(nombre, grupos, config, tiempoInfo, adaptacionesGenero) {
    let diaTexto = `${nombre}:\n`;
    const { numEjercicios } = tiempoInfo;
    
    // Distribuir ejercicios entre grupos musculares
    const ejerciciosPorGrupo = Math.ceil(numEjercicios / grupos.length);
    
    grupos.forEach(grupo => {
      const ejercicios = seleccionarEjercicios(grupo.nombre, grupo.cantidad || ejerciciosPorGrupo);
      
      if (ejercicios.length > 0) {
        diaTexto += `${grupo.label || grupo.nombre.toUpperCase()}:\n`;
        
        ejercicios.forEach(ejercicio => {
          // Aplicar modificaciones de género si existen
          const ejercicioFinal = adaptacionesGenero.modificaciones[ejercicio] || ejercicio;
          
          // Ajustar series según género y grupo muscular
          let seriesAjustadas = config.series;
          if (adaptacionesGenero.enfasisPiernas && ['piernas', 'gluteos'].includes(grupo.nombre)) {
            seriesAjustadas = Math.ceil(config.series * 1.2); // 20% más series
          } else if (grupo.nombre === 'pecho' || grupo.nombre === 'espalda') {
            seriesAjustadas = Math.ceil(config.series * adaptacionesGenero.reducirVolumenSuperior);
          }
          
          diaTexto += `- ${ejercicioFinal}: ${seriesAjustadas} series x ${config.reps} repeticiones\n`;
        });
        diaTexto += `\n`;
      }
    });
    
    return diaTexto;
  }
  
  // FUNCIÓN PRINCIPAL MEJORADA
  function generateRutina(userInfo, answers) {
    const { objetivo, genero } = userInfo;
    const { dias_entrenamiento, duracion_entrenamiento, experiencia, enfoque } = answers;
    
    // Obtener configuraciones
    const config = getConfiguracionNivel(experiencia, objetivo);
    const tiempoInfo = calcularEjerciciosPorDuracion(duracion_entrenamiento, experiencia);
    const adaptacionesGenero = getAdaptacionesGenero(genero, objetivo, enfoque);
    
    // Construir rutina
    let rutina = `📋 RUTINA PERSONALIZADA\n\n`;
    
    // Información general
    rutina += `👤 PERFIL:\n`;
    rutina += `Género: ${genero}\n`;
    rutina += `Objetivo: ${objetivo}\n`;
    rutina += `Nivel: ${experiencia}\n`;
    rutina += `Días por semana: ${dias_entrenamiento}\n`;
    rutina += `Duración por sesión: ${duracion_entrenamiento}\n`;
    rutina += `Enfoque: ${config.mensaje}\n\n`;
    
    rutina += `⚙️ PARÁMETROS DE ENTRENAMIENTO:\n`;
    rutina += `Series por ejercicio: ${config.series}\n`;
    rutina += `Rango de repeticiones: ${config.reps}\n`;
    rutina += `Descanso entre series: ${config.descansoSeries} segundos\n`;
    rutina += `Descanso entre ejercicios: ${config.descansoEjercicios} segundos\n`;
    rutina += `Ejercicios por sesión: ~${tiempoInfo.numEjercicios}\n`;
    rutina += `Calentamiento: ${tiempoInfo.tiempoCalentamiento} minutos\n`;
    rutina += `Estiramiento final: ${tiempoInfo.tiempoEstiramiento} minutos\n\n`;
    
    // Mensaje de adaptación de rutina
    if (enfoque === 'Adaptada') {
      rutina += `${adaptacionesGenero.mensaje}\n`;
      rutina += `• Mayor volumen en piernas y glúteos (+20%)\n`;
      rutina += `• Énfasis en ejercicios de glúteo y core\n`;
      rutina += `• Ejercicios de tren superior adaptados para mejor técnica\n\n`;
    }
    
    // Determinar tipo de rutina según objetivo
    let tipoRutina = '';
    if (objetivo === 'Aumentar masa muscular') {
      tipoRutina = '💪 ENTRENAMIENTO DE FUERZA E HIPERTROFIA';
    } else if (objetivo === 'Perder grasa') {
      tipoRutina = '🔥 ENTRENAMIENTO DE QUEMA DE GRASA';
    } else {
      tipoRutina = '⚖️ ENTRENAMIENTO DE MANTENIMIENTO';
    }
    
    rutina += `${tipoRutina}\n\n`;
    
    // Generar días según frecuencia
    const numDias = parseInt(dias_entrenamiento);
    
    if (objetivo === 'Aumentar masa muscular') {
      rutina += generarRutinaHipertrofia(numDias, config, tiempoInfo, adaptacionesGenero, genero);
    } else if (objetivo === 'Perder grasa') {
      rutina += generarRutinaPerderGrasa(numDias, config, tiempoInfo, adaptacionesGenero, genero);
    } else {
      rutina += generarRutinaMantenimiento(numDias, config, tiempoInfo, adaptacionesGenero, genero);
    }
    
    // Notas finales
    rutina += `\n📝 INSTRUCCIONES IMPORTANTES:\n`;
    rutina += `• Calienta ${tiempoInfo.tiempoCalentamiento} minutos (cardio ligero + movilidad articular)\n`;
    rutina += `• Hidratación constante durante el entrenamiento\n`;
    rutina += `• Progresión: Aumenta peso cuando puedas hacer el límite superior de reps con buena técnica\n`;
    rutina += `• Escucha a tu cuerpo y ajusta la intensidad según necesites\n`;
    rutina += `• Estira ${tiempoInfo.tiempoEstiramiento} minutos al finalizar\n\n`;
    
    if (genero === 'Femenino') {
      rutina += `💡 TIPS PARA MUJERES:\n`;
      rutina += `• No temas usar peso en los ejercicios - no te pondrás "demasiado musculosa"\n`;
      rutina += `• El entrenamiento de fuerza ayuda a tonificar y define la figura\n`;
      rutina += `• Presta especial atención a la técnica en ejercicios de glúteos\n`;
      rutina += `• Ciclo menstrual: Ajusta intensidad si sientes fatiga excesiva\n\n`;
    }
    
    rutina += `⚠️ ADVERTENCIA:\n`;
    rutina += `Este plan es orientativo y no reemplaza la evaluación de un profesional. Si tienes lesiones, condiciones médicas o dolor durante los ejercicios, consulta con un especialista antes de continuar.\n`;
    
    return rutina;
  }
  
  // RUTINA PARA HIPERTROFIA
  function generarRutinaHipertrofia(numDias, config, tiempoInfo, adaptaciones, genero) {
    let rutina = '';
    
    if (numDias === 3) {
      rutina += construirDia('DÍA 1 - Tren Superior', [
        { nombre: 'pecho', cantidad: 2 },
        { nombre: 'espalda', cantidad: 2 },
        { nombre: 'hombros', cantidad: 1 },
        { nombre: 'biceps', cantidad: 1 },
        { nombre: 'triceps', cantidad: 1 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 2 - Tren Inferior', [
        { nombre: 'piernas', cantidad: adaptaciones.enfasisPiernas ? 5 : 4 },
        ...(adaptaciones.enfasisCore ? [{ nombre: 'core', label: 'CORE', cantidad: 1 }] : [])
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 3 - Tren Superior (Variación)', [
        { nombre: 'pecho', cantidad: 2 },
        { nombre: 'espalda', cantidad: 2 },
        { nombre: 'hombros', cantidad: 1 },
        { nombre: 'biceps', cantidad: 1 },
        { nombre: 'triceps', cantidad: 1 }
      ], config, tiempoInfo, adaptaciones);
      
    } else if (numDias === 4) {
      rutina += construirDia('DÍA 1 - Jalón (Pull)', [
        { nombre: 'espalda', label: 'ESPALDA', cantidad: 3 },
        { nombre: 'biceps', label: 'BÍCEPS', cantidad: 2 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 2 - Empuje (Push)', [
        { nombre: 'pecho', label: 'PECHO', cantidad: 2 },
        { nombre: 'hombros', label: 'HOMBROS', cantidad: 2 },
        { nombre: 'triceps', label: 'TRÍCEPS', cantidad: 2 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 3 - Piernas', [
        { nombre: 'piernas', cantidad: adaptaciones.enfasisPiernas ? 6 : 5 },
        ...(adaptaciones.enfasisCore ? [{ nombre: 'core', label: 'CORE', cantidad: 1 }] : [])
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 4 - Tren Superior (Full)', [
        { nombre: 'pecho', cantidad: 2 },
        { nombre: 'espalda', cantidad: 2 },
        { nombre: 'hombros', cantidad: 1 },
        { nombre: 'biceps', cantidad: 1 },
        { nombre: 'triceps', cantidad: 1 }
      ], config, tiempoInfo, adaptaciones);
      
    } else if (numDias === 5) {
      rutina += construirDia('DÍA 1 - Jalón (Pull)', [
        { nombre: 'espalda', label: 'ESPALDA', cantidad: 4 },
        { nombre: 'biceps', label: 'BÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 2 - Empuje (Push)', [
        { nombre: 'pecho', label: 'PECHO', cantidad: 4 },
        { nombre: 'triceps', label: 'TRÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 3 - Hombros y Piernas', [
        { nombre: 'hombros', label: 'HOMBROS', cantidad: 3 },
        { nombre: 'piernas', label: 'PIERNAS', cantidad: adaptaciones.enfasisPiernas ? 5 : 4 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 4 - Jalón (Pull - Variación)', [
        { nombre: 'espalda', label: 'ESPALDA', cantidad: 4 },
        { nombre: 'biceps', label: 'BÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 5 - Empuje (Push - Variación)', [
        { nombre: 'pecho', label: 'PECHO', cantidad: 4 },
        { nombre: 'triceps', label: 'TRÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones);
      
    } else { // 6 días
      rutina += construirDia('DÍA 1 - Hombros y Piernas', [
        { nombre: 'hombros', label: 'HOMBROS', cantidad: 3 },
        { nombre: 'piernas', label: 'PIERNAS', cantidad: 5 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 2 - Jalón (Pull)', [
        { nombre: 'espalda', label: 'ESPALDA', cantidad: 4 },
        { nombre: 'biceps', label: 'BÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 3 - Empuje (Push)', [
        { nombre: 'pecho', label: 'PECHO', cantidad: 4 },
        { nombre: 'triceps', label: 'TRÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 4 - Hombros y Piernas (Variación)', [
        { nombre: 'hombros', label: 'HOMBROS', cantidad: 3 },
        { nombre: 'piernas', label: 'PIERNAS', cantidad: 5 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 5 - Jalón (Pull - Variación)', [
        { nombre: 'espalda', label: 'ESPALDA', cantidad: 4 },
        { nombre: 'biceps', label: 'BÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 6 - Empuje (Push - Variación)', [
        { nombre: 'pecho', label: 'PECHO', cantidad: 4 },
        { nombre: 'triceps', label: 'TRÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones);
    }
    
    return rutina;
  }
  
  // RUTINA PARA PERDER GRASA
  function generarRutinaPerderGrasa(numDias, config, tiempoInfo, adaptaciones, genero) {
    let rutina = '';
    const cardioZona2 = Math.min(20, Math.floor(tiempoInfo.numEjercicios * 3)); // Cardio proporcional al tiempo
    
    if (numDias === 3) {
      rutina += construirDia('DÍA 1 - Tren Inferior + Cardio', [
        { nombre: 'piernas', cantidad: 5 }
      ], config, tiempoInfo, adaptaciones);
      rutina += `- Cardio: ${cardioZona2} minutos zona 2 (correr, bici, elíptica)\n\n`;
      
      rutina += `DÍA 2 - HIIT:\n`;
      rutina += `- 10 minutos de cardio zona 3 (calentamiento)\n`;
      rutina += `- 5-7 intervalos: 1 min alta intensidad (90%) + 2 min recuperación (zona 2)\n`;
      rutina += `- 5 minutos de enfriamiento zona 2\n\n`;
      
      rutina += construirDia('DÍA 3 - Full Body Fuerza', [
        { nombre: 'pecho', cantidad: 2 },
        { nombre: 'espalda', cantidad: 2 },
        { nombre: 'piernas', cantidad: 2 },
        { nombre: 'hombros', cantidad: 1 }
      ], config, tiempoInfo, adaptaciones);
      
    } else if (numDias >= 4) {
      rutina += construirDia('DÍA 1 - Tren Inferior + Cardio', [
        { nombre: 'piernas', cantidad: 5 }
      ], config, tiempoInfo, adaptaciones);
      rutina += `- Cardio: ${cardioZona2} minutos zona 2\n\n`;
      
      rutina += construirDia('DÍA 2 - Jalón (Pull)', [
        { nombre: 'espalda', label: 'ESPALDA', cantidad: 4 },
        { nombre: 'biceps', label: 'BÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 3 - Empuje (Push)', [
        { nombre: 'pecho', label: 'PECHO', cantidad: 2 },
        { nombre: 'hombros', label: 'HOMBROS', cantidad: 2 },
        { nombre: 'triceps', label: 'TRÍCEPS', cantidad: 2 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += `DÍA 4 - HIIT:\n`;
      rutina += `- 10 minutos de cardio zona 3\n`;
      rutina += `- 5-7 intervalos: 1 min alta intensidad + 2 min recuperación\n`;
      rutina += `- 5 minutos de enfriamiento\n\n`;
      
      if (numDias >= 5) {
        rutina += construirDia('DÍA 5 - Tren Superior Full', [
          { nombre: 'pecho', cantidad: 2 },
          { nombre: 'espalda', cantidad: 2 },
          { nombre: 'hombros', cantidad: 1 },
          { nombre: 'biceps', cantidad: 1 },
          { nombre: 'triceps', cantidad: 1 }
        ], config, tiempoInfo, adaptaciones);
      }
      
      if (numDias === 6) {
        rutina += construirDia('DÍA 6 - Empuje + Core', [
          { nombre: 'pecho', cantidad: 3 },
          { nombre: 'triceps', cantidad: 2 },
          { nombre: 'core', label: 'CORE', cantidad: 2 }
        ], config, tiempoInfo, adaptaciones);
      }
    }
    
    return rutina;
  }
  
  // RUTINA PARA MANTENIMIENTO
  function generarRutinaMantenimiento(numDias, config, tiempoInfo, adaptaciones, genero) {
    let rutina = '';
    
    if (numDias === 3) {
      rutina += construirDia('DÍA 1 - Tren Superior', [
        { nombre: 'pecho', cantidad: 2 },
        { nombre: 'espalda', cantidad: 2 },
        { nombre: 'hombros', cantidad: 1 },
        { nombre: 'biceps', cantidad: 1 },
        { nombre: 'triceps', cantidad: 1 }
      ], config, tiempoInfo, adaptaciones);
      
      rutina += construirDia('DÍA 2 - Tren Inferior + Cardio', [
        { nombre: 'piernas', cantidad: 5 }
      ], config, tiempoInfo, adaptaciones);
      rutina += `- Cardio moderado: 20-25 minutos\n\n`;
      
      rutina += construirDia('DÍA 3 - Full Body', [
        { nombre: 'pecho', cantidad: 1 },
        { nombre: 'espalda', cantidad: 2 },
        { nombre: 'hombros', cantidad: 1 },
        { nombre: 'piernas', cantidad: 2 },
        { nombre: 'biceps', cantidad: 1 }
      ], config, tiempoInfo, adaptaciones);
      
    } else {
      // Para 4+ días usar división similar a hipertrofia pero con menos volumen
      return generarRutinaHipertrofia(numDias, config, tiempoInfo, adaptaciones, genero);
    }
    
    return rutina;
  }
  

// Función para generar rutina personalizada
function generateRutinaViejo(userInfo, answers) {
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