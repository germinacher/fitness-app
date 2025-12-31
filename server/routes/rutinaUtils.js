// BASE DE DATOS DE EJERCICIOS CON CLASIFICACIÓN
const ejerciciosDB = {
    pecho: {
      compuestos: [
        { nombre: 'Press de banca', complejidad: 'alta', prioridad: 1, tipo: 'dinamico' },
        { nombre: 'Press inclinado', complejidad: 'alta', prioridad: 2, tipo: 'dinamico' },
        { nombre: 'Fondos en paralelas', complejidad: 'media', prioridad: 3, tipo: 'dinamico' }
      ],
      aislamiento: [
        { nombre: 'Aperturas de pecho en máquina', complejidad: 'baja', prioridad: 4, tipo: 'dinamico' },
        { nombre: 'Aperturas en polea alta', complejidad: 'baja', prioridad: 5, tipo: 'dinamico' },
        { nombre: 'Press en máquina', complejidad: 'baja', prioridad: 6, tipo: 'dinamico' }
      ]
    },
    espalda: {
      compuestos: [
        { nombre: 'Dominadas', complejidad: 'alta', prioridad: 1, tipo: 'dinamico' },
        { nombre: 'Jalón al pecho', complejidad: 'alta', prioridad: 1, tipo: 'dinamico' },
        { nombre: 'Remo con barra', complejidad: 'alta', prioridad: 2, tipo: 'dinamico' },
        { nombre: 'Remo en polea sentado', complejidad: 'media', prioridad: 3, tipo: 'dinamico' }
      ],
      aislamiento: [
        { nombre: 'Jalón agarre cerrado', complejidad: 'baja', prioridad: 4, tipo: 'dinamico' },
        { nombre: 'Jalón agarre neutro', complejidad: 'baja', prioridad: 4, tipo: 'dinamico' },
        { nombre: 'Remo con mancuerna unilateral', complejidad: 'baja', prioridad: 5, tipo: 'dinamico' },
        { nombre: 'Pullover en polea', complejidad: 'baja', prioridad: 6, tipo: 'dinamico' }
      ]
    },
    hombros: {
      compuestos: [
        { nombre: 'Press militar', complejidad: 'alta', prioridad: 1, tipo: 'dinamico' },
        { nombre: 'Press con mancuernas', complejidad: 'alta', prioridad: 2, tipo: 'dinamico' }
      ],
      aislamiento: [
        { nombre: 'Elevaciones laterales', complejidad: 'media', prioridad: 3, tipo: 'dinamico' },
        { nombre: 'Aperturas invertidas en máquina', complejidad: 'baja', prioridad: 4, tipo: 'dinamico' },
        { nombre: 'Elevaciones frontales', complejidad: 'baja', prioridad: 5, tipo: 'dinamico' },
        { nombre: 'Encogimientos de trapecios', complejidad: 'baja', prioridad: 6, tipo: 'dinamico' }
      ]
    },
    piernas: {
      cuadriceps: [
        { nombre: 'Sentadillas', complejidad: 'alta', prioridad: 1, tipo: 'dinamico' },
        { nombre: 'Prensa de piernas', complejidad: 'alta', prioridad: 2, tipo: 'dinamico' },
        { nombre: 'Sentadilla hack', complejidad: 'media', prioridad: 3, tipo: 'dinamico' },
        { nombre: 'Estocadas', complejidad: 'media', prioridad: 4, tipo: 'dinamico' },
        { nombre: 'Extensiones de cuádriceps', complejidad: 'baja', prioridad: 5, tipo: 'dinamico' }
      ],
      isquiotibiales: [
        { nombre: 'Peso muerto rumano', complejidad: 'alta', prioridad: 1, tipo: 'dinamico' },
        { nombre: 'Curl femoral', complejidad: 'baja', prioridad: 2, tipo: 'dinamico' }
      ],
      gluteos: [
        { nombre: 'Hip thrust', complejidad: 'media', prioridad: 1, tipo: 'dinamico' },
        { nombre: 'Patada de glúteo en polea', complejidad: 'baja', prioridad: 2, tipo: 'dinamico' },
        { nombre: 'Abducción de cadera', complejidad: 'baja', prioridad: 3, tipo: 'dinamico' },
        { nombre: 'Sentadilla búlgara', complejidad: 'media', prioridad: 2, tipo: 'dinamico' }
      ],
      pantorrillas: [
        { nombre: 'Elevación de pantorrillas de pie', complejidad: 'baja', prioridad: 1, tipo: 'dinamico' },
        { nombre: 'Elevación de pantorrillas sentado', complejidad: 'baja', prioridad: 2, tipo: 'dinamico' }
      ]
    },
    brazos: {
      biceps: [
        { nombre: 'Curl de bíceps en barra W', complejidad: 'media', prioridad: 1, tipo: 'dinamico' },
        { nombre: 'Bíceps martillo', complejidad: 'baja', prioridad: 2, tipo: 'dinamico' },
        { nombre: 'Curl de bíceps en banco inclinado', complejidad: 'baja', prioridad: 3, tipo: 'dinamico' },
        { nombre: 'Curl en polea baja', complejidad: 'baja', prioridad: 4, tipo: 'dinamico' },
        { nombre: 'Curl concentrado', complejidad: 'baja', prioridad: 5, tipo: 'dinamico' }
      ],
      triceps: [
        { nombre: 'Fondos en paralelas para tríceps', complejidad: 'alta', prioridad: 1, tipo: 'dinamico' },
        { nombre: 'Tríceps press francés', complejidad: 'media', prioridad: 2, tipo: 'dinamico' },
        { nombre: 'Extensión de tríceps con polea', complejidad: 'baja', prioridad: 3, tipo: 'dinamico' },
        { nombre: 'Extensión de tríceps con soga', complejidad: 'baja', prioridad: 4, tipo: 'dinamico' }
      ]
    },
    core: {
      general: [
        { nombre: 'Plancha', complejidad: 'baja', prioridad: 1, tipo: 'isometrico' },
        { nombre: 'Plancha lateral', complejidad: 'baja', prioridad: 2, tipo: 'isometrico' },
        { nombre: 'Abdominales con peso', complejidad: 'media', prioridad: 3, tipo: 'dinamico' },
        { nombre: 'Elevación de piernas', complejidad: 'media', prioridad: 4, tipo: 'dinamico' },
        { nombre: 'Russian twist', complejidad: 'baja', prioridad: 5, tipo: 'dinamico' }
      ]
    }
  };
  
  // SISTEMA RIR (Reps In Reserve)
  const rir_info = {
    explicacion: `
  RIR (Reps In Reserve) = Repeticiones en Reserva
  Es cuántas repeticiones podrías hacer MÁS antes de llegar al fallo muscular.
  
  Ejemplos:
  • RIR 0 = Fallo total (no puedes hacer ni 1 rep más)
  • RIR 1 = Podrías hacer 1 rep más
  • RIR 2 = Podrías hacer 2 reps más (punto óptimo de entrenamiento)
  • RIR 3 = Podrías hacer 3 reps más (muy fácil)
  
  ¿Por qué es importante?
  - RIR 0-1: Máximo estímulo pero mayor fatiga y riesgo de lesión
  - RIR 2-3: Estímulo óptimo con buena recuperación (RECOMENDADO)
  - RIR 4+: Poco estímulo, no hay suficiente intensidad
  
  Cómo aplicarlo:
  Si dice "3x10 @RIR2", haz 10 reps dejando 2 en reserva.
  Si llegas a 10 reps y podrías hacer 12, el peso es correcto.
  Si llegas a 10 y podrías hacer 15, aumenta el peso la próxima vez.
    `,
    valores: {
      'Principiante': { inicio: 3, fin: 2 },
      'Intermedio': { inicio: 2, fin: 1 },
      'Avanzado': { inicio: 2, fin: 0 }
    }
  };
  
  // CONFIGURACIÓN POR NIVEL Y SEMANA
  function getConfiguracionNivel(experiencia, objetivo, semana) {
    const esDeload = semana % 4 === 0;
    
    const configs = {
      'Principiante': {
        reps: '10-12',
        series: esDeload ? 2 : 3,
        rir: esDeload ? 4 : (semana % 4 === 1 ? 3 : 2),
        descansoSeries: '60-90',
        descansoEjercicios: '90-120',
        volumenMultiplicador: esDeload ? 0.6 : 0.7,
        carga: esDeload ? '60-70%' : '70-80%',
        mensaje: 'Aprender técnica y adaptarse progresivamente'
      },
      'Intermedio': {
        reps: '8-12',
        series: esDeload ? 2 : 3,
        rir: esDeload ? 4 : (semana % 4 <= 2 ? 2 : 1),
        descansoSeries: '60-90',
        descansoEjercicios: '120-150',
        volumenMultiplicador: esDeload ? 0.65 : 1.0,
        carga: esDeload ? '65-75%' : '75-85%',
        mensaje: 'Progresar semana a semana con intensidad controlada'
      },
      'Avanzado': {
        reps: objetivo === 'Aumentar masa muscular' ? '6-10' : '8-12',
        series: esDeload ? 2 : (objetivo === 'Aumentar masa muscular' ? 4 : 3),
        rir: esDeload ? 4 : (semana % 4 === 3 ? 0 : 1),
        descansoSeries: '90-120',
        descansoEjercicios: '120-180',
        volumenMultiplicador: esDeload ? 0.7 : 1.3,
        carga: esDeload ? '70-80%' : '80-90%',
        mensaje: 'Máximo estímulo con volumen ' + (objetivo === 'Aumentar masa muscular' ? 'alto' : 'medio')
      }
    };
    
    const config = configs[experiencia] || configs['Intermedio'];
    
    if (esDeload) {
      config.esDeload = true;
      config.mensajeDeload = '⚠️ SEMANA DE DESCARGA - Reduce volumen e intensidad para recuperación';
    }
    
    return config;
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
    const config = getConfiguracionNivel(experiencia, 'Mantener peso', 1);
    
    const tiempoPorEjercicio = (config.series * 1.5) + 3;
    const calentamiento = 8;
    const estiramiento = 5;
    
    const tiempoDisponible = minutos - calentamiento - estiramiento;
    const numEjercicios = Math.floor(tiempoDisponible / tiempoPorEjercicio);
    
    return {
      numEjercicios: Math.max(4, Math.min(numEjercicios, 10)),
      tiempoCalentamiento: calentamiento,
      tiempoEstiramiento: estiramiento
    };
  }
  
  // ADAPTACIONES POR ENFOQUE
  function getAdaptacionesEnfoque(enfoque, objetivo) {
    if (enfoque === 'Adaptada') {
      return {
        enfasisPiernas: true,
        enfasisGluteos: true,
        enfasisCore: true,
        reducirVolumenSuperior: 0.85,
        mensaje: '💪 Rutina adaptada con mayor énfasis en tren inferior y core',
        ejerciciosExtra: {
          gluteos: ['Hip thrust', 'Patada de glúteo en polea', 'Sentadilla búlgara'],
          core: ['Plancha lateral', 'Elevación de piernas']
        },
        modificaciones: {
          'Press de banca': 'Press de banca o press con mancuernas',
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
  
  // ORDENAR EJERCICIOS POR COMPLEJIDAD (COMPUESTOS PRIMERO)
  function ordenarEjerciciosPorComplejidad(ejercicios) {
    return ejercicios.sort((a, b) => {
      // Primero por prioridad (más bajo = primero)
      if (a.prioridad !== b.prioridad) {
        return a.prioridad - b.prioridad;
      }
      // Luego por complejidad
      const complejidadOrden = { 'alta': 1, 'media': 2, 'baja': 3 };
      return complejidadOrden[a.complejidad] - complejidadOrden[b.complejidad];
    });
  }
  
  // SELECCIONAR EJERCICIOS PARA UN GRUPO MUSCULAR
  function seleccionarEjercicios(grupoMuscular, cantidad, yaUsados = [], enfoque = 'Estándar') {
    let ejercicios = [];
    
    if (grupoMuscular === 'piernas') {
      ejercicios = [
        ...ejerciciosDB.piernas.cuadriceps,
        ...ejerciciosDB.piernas.isquiotibiales,
        ...(enfoque === 'Adaptada' ? ejerciciosDB.piernas.gluteos : []),
        ...ejerciciosDB.piernas.pantorrillas
      ];
    } else if (grupoMuscular === 'gluteos') {
      ejercicios = ejerciciosDB.piernas.gluteos;
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
    } else if (grupoMuscular === 'core') {
      ejercicios = ejerciciosDB.core.general;
    }
    
    // Filtrar los ya usados
    ejercicios = ejercicios.filter(e => !yaUsados.includes(e.nombre));
    
    // Ordenar por complejidad
    ejercicios = ordenarEjerciciosPorComplejidad(ejercicios);
    
    // Seleccionar primeros N ejercicios (ya están ordenados)
    return ejercicios.slice(0, cantidad);
  }
  
  // CONSTRUIR DÍA DE ENTRENAMIENTO
  function construirDia(nombre, grupos, config, tiempoInfo, adaptaciones, semana) {
    let diaTexto = `${nombre}${config.esDeload ? ' (DELOAD)' : ''}:\n`;
    const { numEjercicios } = tiempoInfo;
    
    const ejerciciosPorGrupo = Math.ceil(numEjercicios / grupos.length);
    let ejerciciosTotales = 0;
    
    grupos.forEach(grupo => {
      const cantidadEjercicios = Math.min(grupo.cantidad ?? ejerciciosPorGrupo, numEjercicios - ejerciciosTotales);
      if (cantidadEjercicios <= 0) return;
      
      const ejercicios = seleccionarEjercicios(grupo.nombre, cantidadEjercicios, [], adaptaciones.enfasisGluteos ? 'Adaptada' : 'Estándar');
      
      if (ejercicios.length > 0) {
        diaTexto += `${grupo.label || grupo.nombre.toUpperCase()}:\n`;
        
        ejercicios.forEach((ejercicio, index) => {
          const ejercicioFinal = adaptaciones.modificaciones[ejercicio.nombre] || ejercicio.nombre;
          
          // Ajustar series según adaptaciones
          let seriesAjustadas = config.series;
          if (adaptaciones.enfasisPiernas && ['piernas', 'gluteos'].includes(grupo.nombre)) {
            seriesAjustadas = Math.ceil(config.series * 1.2);
          } else if (['pecho', 'espalda'].includes(grupo.nombre)) {
            seriesAjustadas = Math.ceil(config.series * adaptaciones.reducirVolumenSuperior);
          }
          
          // RIR progresivo: compuestos más intensos
          let rirEjercicio = config.rir;
          if (index === 0 && ejercicio.complejidad === 'alta') {
            rirEjercicio = Math.max(1, config.rir - 1); // Primer compuesto más intenso
          }

          // diferencia ejercicios dinamicos de isometricos
          if (grupo.nombre === 'core') {
            if (ejercicio.tipo === 'isometrico') {
              diaTexto += `${index + 1}. ${ejercicioFinal}: ${seriesAjustadas} x 30-60seg\n`;
            } else {
              diaTexto += `${index + 1}. ${ejercicioFinal}: ${seriesAjustadas}x${config.reps} @RIR${rirEjercicio}\n`;
            }
          } else {
            diaTexto += `${index + 1}. ${ejercicioFinal}: ${seriesAjustadas}x${config.reps} @RIR${rirEjercicio}`;
          }
          
          // Nota de intensidad
          if (rirEjercicio <= 1) {
            diaTexto += ` 💪`; //(cerca del fallo)
          }
          diaTexto += `\n`;
        });
        
        diaTexto += `\n`;
        ejerciciosTotales += ejercicios.length;
      }
    });
    
    // Agregar descansos
    diaTexto += `⏱️ Descanso: ${config.descansoSeries}seg entre series | ${config.descansoEjercicios}seg entre ejercicios\n\n`;
    
    return diaTexto;
  }
  
  // FUNCIÓN PRINCIPAL MEJORADA
  function generateRutina(userInfo, answers, semanaActual = 1) {
    const { objetivo } = userInfo;
    const { dias_entrenamiento, duracion_entrenamiento, experiencia, enfoque } = answers;
    
    // Obtener configuraciones
    const config = getConfiguracionNivel(experiencia, objetivo, semanaActual);
    const tiempoInfo = calcularEjerciciosPorDuracion(duracion_entrenamiento, experiencia);
    const adaptaciones = getAdaptacionesEnfoque(enfoque, objetivo);
    
    // Construir rutina
    let rutina = `📋 RUTINA PERSONALIZADA - SEMANA ${semanaActual}\n\n`;
    
    // Alerta de deload
    if (config.esDeload) {
      rutina += `🔄 ${config.mensajeDeload}\n`;
      rutina += `Esta semana es de RECUPERACIÓN ACTIVA para permitir que tus músculos se regeneren.\n`;
      rutina += `Reduce el peso al ${config.carga} de tu carga habitual.\n\n`;
    }
    
    // Información general
    rutina += `👤 PERFIL:\n`;
    rutina += `Objetivo: ${objetivo}\n`;
    rutina += `Nivel: ${experiencia}\n`;
    rutina += `Días por semana: ${dias_entrenamiento}\n`;
    rutina += `Duración por sesión: ${duracion_entrenamiento}\n`;
    rutina += `Enfoque: ${config.mensaje}\n`;
    rutina += `Semana del ciclo: ${semanaActual % 4 || 4}/4\n\n`;
    
    rutina += `⚙️ PARÁMETROS DE ENTRENAMIENTO:\n`;
    rutina += `Series por ejercicio: ${config.series}${config.esDeload ? ' (reducido)' : ''}\n`;
    rutina += `Rango de repeticiones: ${config.reps}\n`;
    rutina += `RIR (Reps in Reserve): ${config.rir}${config.esDeload ? ' (muy fácil)' : ''}\n`;
    rutina += `Carga recomendada: ${config.carga} de tu 1RM\n`;
    rutina += `Descanso entre series: ${config.descansoSeries}seg\n`;
    rutina += `Descanso entre ejercicios: ${config.descansoEjercicios}seg\n`;
    rutina += `Ejercicios por sesión: ~${tiempoInfo.numEjercicios}\n\n`;
    
    // Explicación RIR
    rutina += `📚 ¿QUÉ ES RIR?\n`;
    rutina += `RIR = Reps In Reserve (Repeticiones en Reserva)\n`;
    rutina += `Es cuántas repeticiones más podrías hacer antes del fallo muscular.\n\n`;
    rutina += `Ejemplos prácticos:\n`;
    rutina += `• @RIR0 = Fallo total (no puedes hacer ni 1 más) ❌\n`;
    rutina += `• @RIR1 = Podrías hacer 1 más ⚠️ Muy cerca del fallo\n`;
    rutina += `• @RIR2 = Podrías hacer 2 más ✅ PUNTO ÓPTIMO\n`;
    rutina += `• @RIR3 = Podrías hacer 3 más ✅ Bueno para técnica\n`;
    rutina += `• @RIR4+ = Muy fácil ❌ Poco estímulo\n\n`;
    rutina += `💡 Tip: Si haces 10 reps @RIR2, significa que al terminar la 10ª rep podrías hacer 2 más.\n`;
    rutina += `Si llegas a 10 y podrías hacer 15, aumenta el peso la próxima vez.\n\n`;
    
    // Mensaje de adaptación
    if (enfoque === 'Adaptada') {
      rutina += `${adaptaciones.mensaje}\n`;
      rutina += `• Mayor volumen en tren inferior (+20%)\n`;
      rutina += `• Énfasis en glúteos y core\n`;
      rutina += `• Ejercicios de tren superior adaptados\n\n`;
    }
    
    // Determinar tipo de rutina según objetivo
    let tipoRutina = '';
    if (objetivo === 'Aumentar masa muscular') {
      tipoRutina = '💪 ENTRENAMIENTO DE FUERZA E HIPERTROFIA';
    } else if (objetivo === 'Perder grasa') {
      tipoRutina = '🔥 ENTRENAMIENTO DE FUERZA (PRIORIDAD) + CARDIO MODERADO';
    } else {
      tipoRutina = '⚖️ ENTRENAMIENTO DE MANTENIMIENTO';
    }
    
    rutina += `${tipoRutina}\n\n`;
    
    // Mensaje importante para perder grasa
    if (objetivo === 'Perder grasa') {
      rutina += `⚠️ IMPORTANTE - PERDER GRASA:\n`;
      rutina += `❌ ERROR COMÚN: Hacer solo cardio y perder músculo\n`;
      rutina += `✅ CORRECTO: Mantener fuerza + déficit calórico + cardio moderado\n\n`;
      rutina += `Prioridades:\n`;
      rutina += `1. Entrenar FUERZA ${dias_entrenamiento} días/semana (mantener músculo)\n`;
      rutina += `2. Déficit calórico controlado en la dieta (lo más importante)\n`;
      rutina += `3. Cardio moderado 2-3x/semana OPCIONAL (no obligatorio)\n\n`;
      rutina += `El músculo quema calorías. Si solo haces cardio, pierdes músculo y bajas tu metabolismo.\n`;
      rutina += `Con fuerza + dieta, pierdes SOLO grasa y mantienes el músculo.\n\n`;
    }
    
    // Generar días según frecuencia
    const numDias = parseInt(dias_entrenamiento);
    
    if (objetivo === 'Aumentar masa muscular') {
      rutina += generarRutinaHipertrofia(numDias, config, tiempoInfo, adaptaciones, semanaActual);
    } else if (objetivo === 'Perder grasa') {
      rutina += generarRutinaPerderGrasa(numDias, config, tiempoInfo, adaptaciones, semanaActual);
    } else {
      rutina += generarRutinaMantenimiento(numDias, config, tiempoInfo, adaptaciones, semanaActual);
    }
    
    // PROGRESIÓN SEMANAL
    if (!config.esDeload) {
      rutina += `\n📈 PROGRESIÓN PARA ESTA SEMANA:\n`;
      if (semanaActual % 4 === 1) {
        rutina += `• Mantén los mismos pesos esta semana\n`;
        rutina += `• Enfócate en perfeccionar la técnica\n`;
        rutina += `• Asegúrate de sentir el músculo trabajando\n`;
      } else if (semanaActual % 4 === 2) {
        rutina += `• Intenta aumentar 2.5-5kg en ejercicios grandes (sentadilla, press)\n`;
        rutina += `• O haz 1-2 reps más con el mismo peso\n`;
        rutina += `• RIR bajará a ${config.rir - 1} la próxima semana\n`;
      } else if (semanaActual % 4 === 3) {
        rutina += `• Esta es tu SEMANA MÁS INTENSA\n`;
        rutina += `• Lleva los ejercicios principales cerca del fallo (RIR 0-1)\n`;
        rutina += `• Es normal sentirse más cansado\n`;
        rutina += `• Próxima semana será DELOAD (descanso activo)\n`;
      }
      rutina += `\n`;
    } else {
      rutina += `\n🔄 DESPUÉS DEL DELOAD:\n`;
      rutina += `• La próxima semana vuelves al ciclo normal\n`;
      rutina += `• Deberías sentirte más fuerte y recuperado\n`;
      rutina += `• Intenta superar los pesos de hace 4 semanas\n\n`;
    }
    
    // Notas finales
    rutina += `📝 CALENTAMIENTO (${tiempoInfo.tiempoCalentamiento} minutos):\n`;
    rutina += `1. Cardio ligero: 3-5 min (bici, elíptica, caminata rápida)\n`;
    rutina += `2. Movilidad articular: 2-3 min (círculos de brazos, rotaciones de cadera)\n`;
    rutina += `3. Series de activación: 1-2 series del primer ejercicio con peso muy ligero\n\n`;
    
    rutina += `📝 DURANTE EL ENTRENAMIENTO:\n`;
    rutina += `• Hidratación constante entre series\n`;
    rutina += `• Respeta los descansos (no menos, no más)\n`;
    rutina += `• Si el RIR no coincide, ajusta el peso inmediatamente\n`;
    rutina += `• La técnica es MÁS importante que el peso\n\n`;
    
    rutina += `📝 ESTIRAMIENTO (${tiempoInfo.tiempoEstiramiento} minutos):\n`;
    rutina += `• Estira todos los grupos musculares trabajados\n`;
    rutina += `• Mantén cada estiramiento 20-30 segundos\n`;
    rutina += `• NO rebotes, estira suavemente y constante\n\n`;
    
    if (enfoque === 'Adaptada') {
      rutina += `💡 TIPS ADICIONALES:\n`;
      rutina += `• Presta especial atención a la conexión mente-músculo en glúteos\n`;
      rutina += `• En hip thrust, aprieta fuerte el glúteo arriba por 1-2 segundos\n`;
      rutina += `• El core se fortalece mejor con estabilidad (planchas) que con abdominales tradicionales\n`;
      rutina += `• Si un ejercicio causa molestias, usa la variación sugerida\n\n`;
    }
    
    rutina += `⚠️ ADVERTENCIA:\n`;
    rutina += `Este plan es orientativo y no reemplaza la evaluación de un profesional. Si tienes lesiones, dolor durante los ejercicios, o condiciones médicas, consulta con un especialista antes de continuar. Detente inmediatamente si sientes dolor agudo.\n`;
    
    return rutina;
  }
  
  // RUTINA PARA HIPERTROFIA

function generarRutinaHipertrofia(numDias, config, tiempoInfo, adaptaciones, semana) {
    const { series, reps, rir } = config;
    const seriesPiernas = adaptaciones.enfasisPiernas ? Math.ceil(series * 1.2) : series;
    let r = '';
    
    if (numDias === 3) {
      r += construirDia('DÍA 1 - Tren Superior', [
        { nombre: 'pecho', cantidad: adaptaciones.enfasisCore ? 1 : 2 },
        { nombre: 'espalda', cantidad: adaptaciones.enfasisCore ? 1 : 2 },
        { nombre: 'hombros', cantidad: 1 },
        { nombre: 'biceps', cantidad: adaptaciones.enfasisCore ? 0 : 1 },
        { nombre: 'triceps', cantidad: adaptaciones.enfasisCore ? 0 : 1 },
        //  si hay énfasis en core, lo agrego acá
        ...(adaptaciones.enfasisCore ? [{ nombre: 'core', label: 'CORE', cantidad: 3 }] : [])
      ], config, tiempoInfo, adaptaciones, semana);
      
      r += construirDia('DÍA 2 - Tren Inferior', [
        { nombre: 'piernas', cantidad: adaptaciones.enfasisPiernas ? 5 : 4 },
        //  solo agrego core si NO hay énfasis en core
        ...(adaptaciones.enfasisCore ? [] : [{ nombre: 'core', label: 'CORE', cantidad: 1 }])
      ], config, tiempoInfo, adaptaciones, semana);
      
      r += construirDia('DÍA 3 - Tren Superior (Variación)', [
        { nombre: 'pecho', cantidad: adaptaciones.enfasisCore ? 1 : 2 },
        { nombre: 'espalda', cantidad: adaptaciones.enfasisCore ? 1 : 2 },
        { nombre: 'hombros', cantidad: 1 },
        { nombre: 'biceps', cantidad: adaptaciones.enfasisCore ? 0 : 1 },
        { nombre: 'triceps', cantidad: adaptaciones.enfasisCore ? 0 : 1 },
        //  si hay énfasis en core, lo agrego acá
        ...(adaptaciones.enfasisCore ? [{ nombre: 'core', label: 'CORE', cantidad: 3 }] : [])
      ], config, tiempoInfo, adaptaciones, semana);
      
    } else if (numDias === 4) {
      r += construirDia('DÍA 1 - Jalón (Pull)', [
        { nombre: 'espalda', label: 'ESPALDA', cantidad: 3 },
        { nombre: 'biceps', label: 'BÍCEPS', cantidad: 2 }
      ], config, tiempoInfo, adaptaciones, semana);
      
      r += construirDia('DÍA 2 - Empuje (Push)', [
        { nombre: 'pecho', label: 'PECHO', cantidad: 2 },
        { nombre: 'hombros', label: 'HOMBROS', cantidad: 2 },
        { nombre: 'triceps', label: 'TRÍCEPS', cantidad: 2 }
      ], config, tiempoInfo, adaptaciones, semana);
      
      // Día 3 - Piernas
      r += construirDia('DÍA 3 - Piernas', [
        { nombre: 'piernas', cantidad: adaptaciones.enfasisPiernas ? 6 : 5 },
        //  solo agrego core si NO hay énfasis en core
        ...(adaptaciones.enfasisCore ? [] : [{ nombre: 'core', label: 'CORE', cantidad: 1 }])
      ], config, tiempoInfo, adaptaciones, semana);

      // Día 4 - Tren Superior
      r += construirDia('DÍA 4 - Tren Superior (Full)', [
        { nombre: 'pecho', cantidad: adaptaciones.enfasisCore ? 1 : 2 },
        { nombre: 'espalda', cantidad: adaptaciones.enfasisCore ? 1 : 2 },
        { nombre: 'hombros', cantidad: 1 },
        { nombre: 'biceps', cantidad: adaptaciones.enfasisCore ? 0 : 1 },
        { nombre: 'triceps', cantidad: adaptaciones.enfasisCore ? 0 : 1 },
        //  si hay énfasis en core, lo agrego acá
        ...(adaptaciones.enfasisCore ? [{ nombre: 'core', label: 'CORE', cantidad: 3 }] : [])
      ], config, tiempoInfo, adaptaciones, semana);

      
    } else if (numDias === 5) {
      r += construirDia('DÍA 1 - Jalón (Pull)', [
        { nombre: 'espalda', label: 'ESPALDA', cantidad: adaptaciones.enfasisPiernas ? 3 : 4 },
        { nombre: 'biceps', label: 'BÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones, semana);
      
      r += construirDia('DÍA 2 - Empuje (Push)', [
        { nombre: 'pecho', label: 'PECHO', cantidad: adaptaciones.enfasisPiernas ? 3 : 4 },
        { nombre: 'triceps', label: 'TRÍCEPS', cantidad: adaptaciones.enfasisPiernas ? 2 : 3 },
        ...(adaptaciones.enfasisCore ? [{ nombre: 'core', label: 'CORE', cantidad: 2 }] : [])
      ], config, tiempoInfo, adaptaciones, semana);
      
      r += construirDia('DÍA 3 - Piernas y Hombros', [
        { nombre: 'hombros', label: 'HOMBROS', cantidad: 3 },
        { nombre: 'piernas', label: 'PIERNAS', cantidad: adaptaciones.enfasisPiernas ? 5 : 4 }
      ], config, tiempoInfo, adaptaciones, semana);
      
      r += construirDia('DÍA 4 - Jalón (Pull - Variación)', [
        { nombre: 'espalda', label: 'ESPALDA', cantidad: adaptaciones.enfasisPiernas ? 3 : 4 },
        { nombre: 'biceps', label: 'BÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones, semana);
      
      r += construirDia('DÍA 5 - Empuje (Push - Variación)', [
        { nombre: 'pecho', label: 'PECHO', cantidad: adaptaciones.enfasisPiernas ? 3 : 4 },
        { nombre: 'triceps', label: 'TRÍCEPS', cantidad: adaptaciones.enfasisPiernas ? 2 : 3 },
        ...(adaptaciones.enfasisCore ? [{ nombre: 'core', label: 'CORE', cantidad: 3 }] : [])
      ], config, tiempoInfo, adaptaciones, semana);
      
    } else { // 6 días
      r += construirDia('DÍA 1 - Piernas y Hombros', [
        { nombre: 'hombros', label: 'HOMBROS', cantidad: 3 },
        { nombre: 'piernas', label: 'PIERNAS', cantidad: adaptaciones.enfasisPiernas ? 5 : 4 }
      ], config, tiempoInfo, adaptaciones, semana);
      
      r += construirDia('DÍA 2 - Jalón (Pull)', [
        { nombre: 'espalda', label: 'ESPALDA', cantidad: adaptaciones.enfasisPiernas ? 3 : 4 },
        { nombre: 'biceps', label: 'BÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones, semana);
      
      r += construirDia('DÍA 3 - Empuje (Push)', [
        { nombre: 'pecho', label: 'PECHO', cantidad: adaptaciones.enfasisPiernas ? 3 : 4 },
        { nombre: 'triceps', label: 'TRÍCEPS', cantidad: adaptaciones.enfasisPiernas ? 2 : 3 },
        ...(adaptaciones.enfasisCore ? [{ nombre: 'core', label: 'CORE', cantidad: 3 }] : [])
      ], config, tiempoInfo, adaptaciones, semana);
      
      r += construirDia('DÍA 4 - Piernas y Hombros (Variación)', [
        { nombre: 'hombros', label: 'HOMBROS', cantidad: 3 },
        { nombre: 'piernas', label: 'PIERNAS', cantidad: adaptaciones.enfasisPiernas ? 5 : 4 }
      ], config, tiempoInfo, adaptaciones, semana);
      
      r += construirDia('DÍA 5 - Jalón (Pull - Variación)', [
        { nombre: 'espalda', label: 'ESPALDA', cantidad: adaptaciones.enfasisPiernas ? 3 : 4 },
        { nombre: 'biceps', label: 'BÍCEPS', cantidad: 3 }
      ], config, tiempoInfo, adaptaciones, semana);
      
      r += construirDia('DÍA 6 - Empuje (Push - Variación)', [
        { nombre: 'pecho', label: 'PECHO', cantidad: adaptaciones.enfasisPiernas ? 3 : 4 },
        { nombre: 'triceps', label: 'TRÍCEPS', cantidad: adaptaciones.enfasisPiernas ? 2 : 3 },
        ...(adaptaciones.enfasisCore ? [{ nombre: 'core', label: 'CORE', cantidad: 3 }] : [])
      ], config, tiempoInfo, adaptaciones, semana);
    }
    
    return r;
  }
  
  function generarRutinaPerderGrasa(numDias, config, tiempoInfo, adaptaciones, semana) {
    let rutina = '';
    
    if (numDias === 3) {
      rutina += construirDia('DÍA 1 - Fuerza Inferior', [
        { nombre: 'piernas', cantidad: 5 }
      ], config, tiempoInfo, adaptaciones, semana);
      
      rutina += construirDia('DÍA 2 - Fuerza Superior', [
        { nombre: 'pecho', cantidad: adaptaciones.enfasisCore ? 1 : 2 },
        { nombre: 'espalda', cantidad: adaptaciones.enfasisCore ? 1 : 2 },
        { nombre: 'hombros', cantidad: 1 },
        { nombre: 'biceps', cantidad: adaptaciones.enfasisCore ? 0 : 1 },
        { nombre: 'triceps', cantidad: adaptaciones.enfasisCore ? 0 : 1 },
        //  si hay énfasis en core, lo agrego acá
        ...(adaptaciones.enfasisCore ? [{ nombre: 'core', label: 'CORE', cantidad: 3 }] : [])
      ], config, tiempoInfo, adaptaciones, semana);
      
      rutina += construirDia('DÍA 3 - Full Body', [
        { nombre: 'piernas', cantidad: adaptaciones.enfasisCore ? 2 : 1 },
        { nombre: 'pecho', cantidad: adaptaciones.enfasisCore ? 1 : 2 },
        { nombre: 'espalda', cantidad: adaptaciones.enfasisCore ? 1 : 2 },
        { nombre: 'hombros', cantidad: 1 },
        { nombre: 'biceps', cantidad: adaptaciones.enfasisCore ? 0 : 1 },
        { nombre: 'triceps', cantidad: adaptaciones.enfasisCore ? 0 : 1 },
        //  si hay énfasis en core, lo agrego acá
        ...(adaptaciones.enfasisCore ? [{ nombre: 'core', label: 'CORE', cantidad: 3 }] : [])
      ], config, tiempoInfo, adaptaciones, semana);
      
      rutina += `\n💡 CARDIO OPCIONAL (NO OBLIGATORIO):\n`;
      rutina += `• 2x/semana: 30-40 min caminata (Zona 2) en días libres\n`;
      rutina += `• PRIORIZA LA FUERZA sobre el cardio\n\n`;
      
    } else {
      // Para 4+ días, usa misma estructura que hipertrofia
      rutina = generarRutinaHipertrofia(numDias, config, tiempoInfo, adaptaciones, semana);
      rutina += `\n💡 CARDIO OPCIONAL: 2-3x/semana, 30 min Zona 2 en días libres\n\n`;
    }
    
    return rutina;
  }
  
  function generarRutinaMantenimiento(numDias, config, tiempoInfo, adaptaciones, semana) {
    // Para mantenimiento, usar misma estructura que hipertrofia
    return generarRutinaHipertrofia(numDias, config, tiempoInfo, adaptaciones, semana);
  }
  
  module.exports = { generateRutina };
  