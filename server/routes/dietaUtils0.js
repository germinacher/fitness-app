// BASE DE DATOS DE ALIMENTOS CON MACROS
const alimentosDB = {
    proteinas: {
      animales: [
        { nombre: 'Pechuga de pollo', proteina: 31, carbs: 0, grasa: 3.6, por: '100g', excluir: [] },
        { nombre: 'Pechuga de pavo', proteina: 29, carbs: 0, grasa: 1, por: '100g', excluir: [] },
        { nombre: 'Pescado blanco (merluza)', proteina: 17, carbs: 0, grasa: 2, por: '100g', excluir: [] },
        { nombre: 'Salmón', proteina: 20, carbs: 0, grasa: 13, por: '100g', excluir: [] },
        { nombre: 'Atún en agua', proteina: 25, carbs: 0, grasa: 1, por: '100g', excluir: [] },
        { nombre: 'Huevos', proteina: 6, carbs: 0.6, grasa: 5, por: 'unidad', excluir: ['Huevos'] },
        { nombre: 'Yogur griego natural', proteina: 10, carbs: 4, grasa: 0.4, por: '100g', excluir: ['Lácteos', 'Lactosa'] },
        { nombre: 'Queso cottage bajo en grasa', proteina: 11, carbs: 3.4, grasa: 4.3, por: '100g', excluir: ['Lácteos', 'Lactosa'] },
      ],
      vegetales: [
        { nombre: 'Tofu firme', proteina: 8, carbs: 2, grasa: 4, por: '100g', excluir: [] },
        { nombre: 'Tempeh', proteina: 19, carbs: 9, grasa: 11, por: '100g', excluir: [] },
        { nombre: 'Seitán', proteina: 25, carbs: 14, grasa: 2, por: '100g', excluir: ['Gluten'] },
        { nombre: 'Lentejas cocidas', proteina: 9, carbs: 20, grasa: 0.4, por: '100g', excluir: [] },
        { nombre: 'Garbanzos cocidos', proteina: 9, carbs: 27, grasa: 2.6, por: '100g', excluir: [] },
        { nombre: 'Frijoles negros cocidos', proteina: 8.9, carbs: 24, grasa: 0.5, por: '100g', excluir: [] },
        { nombre: 'Quinoa cocida', proteina: 4.4, carbs: 21, grasa: 1.9, por: '100g', excluir: [] },
      ]
    },
    carbohidratos: {
      sinGluten: [
        { nombre: 'Arroz integral', proteina: 2.6, carbs: 23, grasa: 0.9, por: '100g cocido', excluir: [] },
        { nombre: 'Arroz blanco', proteina: 2.7, carbs: 28, grasa: 0.3, por: '100g cocido', excluir: [] },
        { nombre: 'Quinoa', proteina: 4.4, carbs: 21, grasa: 1.9, por: '100g cocido', excluir: [] },
        { nombre: 'Patata cocida', proteina: 2, carbs: 20, grasa: 0.1, por: '100g', excluir: [] },
        { nombre: 'Batata/boniato', proteina: 1.6, carbs: 20, grasa: 0.1, por: '100g', excluir: [] },
        { nombre: 'Avena sin gluten', proteina: 2.4, carbs: 12, grasa: 1.4, por: '30g', excluir: [] },
      ],
      conGluten: [
        { nombre: 'Pasta integral', proteina: 5, carbs: 26, grasa: 0.9, por: '100g cocida', excluir: ['Gluten'] },
        { nombre: 'Pan integral', proteina: 3.5, carbs: 15, grasa: 1, por: 'rebanada (30g)', excluir: ['Gluten'] },
        { nombre: 'Avena tradicional', proteina: 2.4, carbs: 12, grasa: 1.4, por: '30g', excluir: ['Gluten'] },
        { nombre: 'Tortillas integrales', proteina: 2.5, carbs: 15, grasa: 1.5, por: 'unidad', excluir: ['Gluten'] },
      ]
    },
    grasasSaludables: [
      { nombre: 'Aguacate', proteina: 2, carbs: 9, grasa: 15, por: '100g', excluir: [] },
      { nombre: 'Aceite de oliva', proteina: 0, carbs: 0, grasa: 14, por: '1 cucharada', excluir: [] },
      { nombre: 'Almendras', proteina: 6, carbs: 6, grasa: 14, por: '30g (puñado)', excluir: ['Frutos secos'] },
      { nombre: 'Nueces', proteina: 4.3, carbs: 3.9, grasa: 18, por: '30g', excluir: ['Frutos secos'] },
      { nombre: 'Mantequilla de maní natural', proteina: 7, carbs: 6, grasa: 16, por: '2 cucharadas', excluir: ['Frutos secos'] },
      { nombre: 'Semillas de chía', proteina: 4.7, carbs: 12, grasa: 8.6, por: '30g', excluir: [] },
      { nombre: 'Semillas de calabaza', proteina: 5.2, carbs: 3.8, grasa: 12, por: '30g', excluir: [] },
    ],
    verduras: [
      { nombre: 'Brócoli', proteina: 2.8, carbs: 7, grasa: 0.4, por: '100g', excluir: [] },
      { nombre: 'Espinacas', proteina: 2.9, carbs: 3.6, grasa: 0.4, por: '100g', excluir: [] },
      { nombre: 'Lechuga mixta', proteina: 1.4, carbs: 2.9, grasa: 0.2, por: '100g', excluir: [] },
      { nombre: 'Tomate', proteina: 0.9, carbs: 3.9, grasa: 0.2, por: '100g', excluir: [] },
      { nombre: 'Zanahoria', proteina: 0.9, carbs: 10, grasa: 0.2, por: '100g', excluir: [] },
      { nombre: 'Calabacín', proteina: 1.2, carbs: 3.1, grasa: 0.3, por: '100g', excluir: [] },
    ],
    frutas: [
      { nombre: 'Manzana', proteina: 0.3, carbs: 14, grasa: 0.2, por: 'unidad mediana', excluir: ['Fructosa'] },
      { nombre: 'Plátano', proteina: 1.1, carbs: 23, grasa: 0.3, por: 'unidad', excluir: ['Fructosa'] },
      { nombre: 'Fresas', proteina: 0.7, carbs: 8, grasa: 0.3, por: '100g', excluir: ['Fructosa'] },
      { nombre: 'Arándanos', proteina: 0.7, carbs: 14, grasa: 0.3, por: '100g', excluir: ['Fructosa'] },
      { nombre: 'Naranja', proteina: 0.9, carbs: 12, grasa: 0.1, por: 'unidad', excluir: ['Fructosa'] },
    ]
  };

// FUNCIÓN PARA FILTRAR ALIMENTOS SEGÚN RESTRICCIONES
function filtrarAlimentos(categoria, alergias, intolerancias, preferencias) {
    let alimentos = [];
    
    if (categoria === 'proteinas') {
      if (preferencias === 'Vegano') {
        alimentos = alimentosDB.proteinas.vegetales;
      } else if (preferencias === 'Vegetariano') {
        alimentos = [...alimentosDB.proteinas.vegetales, ...alimentosDB.proteinas.animales];
      } else {
        alimentos = [...alimentosDB.proteinas.animales, ...alimentosDB.proteinas.vegetales];
      }
    } else if (categoria === 'carbohidratos') {
      if (intolerancias.includes('Gluten')) {
        alimentos = alimentosDB.carbohidratos.sinGluten;
      } else {
        alimentos = [...alimentosDB.carbohidratos.sinGluten, ...alimentosDB.carbohidratos.conGluten];
      }
    } else if (categoria === 'grasas') {
      alimentos = alimentosDB.grasasSaludables;
    } else if (categoria === 'verduras') {
      alimentos = alimentosDB.verduras;
    } else if (categoria === 'frutas') {
      alimentos = alimentosDB.frutas;
    }
    
    // Filtrar por alergias e intolerancias
    const restriccionesTotales = [...alergias, ...intolerancias].filter(r => r !== 'Ninguna' && r !== 'Otra');
    
    return alimentos.filter(alimento => {
      return !alimento.excluir.some(exc => restriccionesTotales.includes(exc));
    });
  }
  
  // FUNCIÓN PARA SELECCIONAR ALIMENTOS ALEATORIOS
  function seleccionarAlimento(alimentos, cantidad = 1) {
    if (alimentos.length === 0) return [];
    const seleccionados = [];
    const copiaAlimentos = [...alimentos];
    
    for (let i = 0; i < cantidad && copiaAlimentos.length > 0; i++) {
      const index = Math.floor(Math.random() * copiaAlimentos.length);
      seleccionados.push(copiaAlimentos[index]);
      copiaAlimentos.splice(index, 1);
    }
    
    return seleccionados;
  }
  
  // FUNCIÓN PARA CALCULAR PORCIONES SEGÚN CALORÍAS OBJETIVO
  //function calcularPorcion(alimento, caloriasObjetivo, macroObjetivo) {
    //const caloriasPor100g = (alimento.proteina * 4) + (alimento.carbs * 4) + (alimento.grasa * 9);
    //const factor = caloriasObjetivo / caloriasPor100g;
    
    //return {
      //...alimento,
      //cantidad: Math.round(factor * 100),
      //proteinaTotal: Math.round(alimento.proteina * factor),
      //carbsTotal: Math.round(alimento.carbs * factor),
      //grasaTotal: Math.round(alimento.grasa * factor),
      //caloriasTotal: Math.round(caloriasPor100g * factor)
    //};
  //}
  
  // FUNCIÓN PRINCIPAL MEJORADA
  function generateDieta(userInfo, answers) {
    const { objetivo, infoPersonal, preferencias, alergias, restricciones, intolerancias, genero } = userInfo;
    const { peso, altura, edad } = infoPersonal;
    const { horario_preferido, peso_objetivo } = answers;
    
    // ===== CÁLCULO DE CALORÍAS =====
    let caloriasBase = genero === "Masculino" 
      ? 10 * peso + 6.25 * altura - 5 * edad + 5
      : 10 * peso + 6.25 * altura - 5 * edad - 161;
    
    let factorActividad = 1.5;
    let caloriasDiarias = Math.round(caloriasBase * factorActividad);
    
    // Ajuste según objetivo y diferencia de peso
    const diferenciaPeso = Math.abs(peso - peso_objetivo);
    const velocidad = diferenciaPeso > 10 ? 'agresiva' : 'moderada';
    
    if (objetivo === "Perder grasa") {
      caloriasDiarias = velocidad === 'agresiva' 
        ? Math.round(caloriasDiarias * 0.80) 
        : Math.round(caloriasDiarias * 0.85);
    } else if (objetivo === "Aumentar masa muscular") {
      caloriasDiarias = velocidad === 'agresiva'
        ? Math.round(caloriasDiarias * 1.20)
        : Math.round(caloriasDiarias * 1.15);
    } else if (objetivo === "Mantener peso") {
      // Mantener calorías de mantenimiento sin ajustes
      caloriasDiarias = Math.round(caloriasDiarias);
    }
  
    // ===== MACRONUTRIENTES =====
    let proteinas, carbohidratos, grasas;
    let distribucionComidas = {};

    function calcularProteinas(peso, objetivo) {
      if (objetivo === "Perder grasa") return Math.round(peso * 2.2);
      if (objetivo === "Aumentar masa muscular") return Math.round(peso * 1.8);
      return Math.round(peso * 1.6);
    }
    
    function calcularGrasas(peso, objetivo) {
      if (objetivo === "Perder grasa") return Math.round(peso * 0.8);
      if (objetivo === "Aumentar masa muscular") return Math.round(peso * 1.0);
      return Math.round(peso * 0.9);
    }
    
    function calcularCarbohidratos(calorias, proteinas, grasas) {
      return Math.round(
        (calorias - (proteinas * 4) - (grasas * 9)) / 4
      );
    }
    
    if (objetivo === "Aumentar masa muscular") {
      // Mayor énfasis en proteína y carbohidratos para construcción muscular
      proteinas = calcularProteinas(peso, objetivo);
      grasas = calcularGrasas(peso, objetivo);
      carbohidratos = calcularCarbohidratos(caloriasDiarias, proteinas, grasas);
      
      // Distribución optimizada para ganancia muscular
      distribucionComidas = {
        desayuno: 0.25,
        mediaManana: 0.12,
        almuerzo: 0.30,
        merienda: 0.13,
        cena: 0.20
      };
    } else if (objetivo === "Perder grasa") {
      // Mayor proteína para preservar músculo, carbohidratos moderados
      proteinas = calcularProteinas(peso, objetivo);
      grasas = calcularGrasas(peso, objetivo);
      carbohidratos = calcularCarbohidratos(caloriasDiarias, proteinas, grasas);
      
      // Distribución para control del hambre y energía
      distribucionComidas = {
        desayuno: 0.25,
        mediaManana: 0.08,
        almuerzo: 0.35,
        merienda: 0.10,
        cena: 0.22
      };
    } else { // Mantener peso
      // Balance equilibrado para mantenimiento
      proteinas = calcularProteinas(peso, objetivo);
      grasas = calcularGrasas(peso, objetivo);
      carbohidratos = calcularCarbohidratos(caloriasDiarias, proteinas, grasas);
      
      // Distribución balanceada
      distribucionComidas = {
        desayuno: 0.25,
        mediaManana: 0.10,
        almuerzo: 0.30,
        merienda: 0.10,
        cena: 0.25
      };
    }
  
    // ===== FILTRAR ALIMENTOS DISPONIBLES =====
    const proteinasDisponibles = filtrarAlimentos('proteinas', alergias, intolerancias, preferencias);
    const carbohidratosDisponibles = filtrarAlimentos('carbohidratos', alergias, intolerancias, preferencias);
    const grasasDisponibles = filtrarAlimentos('grasas', alergias, intolerancias, preferencias);
    const verdurasDisponibles = filtrarAlimentos('verduras', alergias, intolerancias, preferencias);
    const frutasDisponibles = filtrarAlimentos('frutas', alergias, intolerancias, preferencias);
  
    // ===== GENERAR DIETA =====
    let dieta = `🍎 DIETA PERSONALIZADA\n\n`;
    dieta += `👤 INFORMACIÓN DEL USUARIO:\n`;
    dieta += `Edad: ${edad} años | Género: ${genero}\n`;
    dieta += `Peso actual: ${peso} kg | Peso objetivo: ${peso_objetivo} kg\n`;
    dieta += `Diferencia: ${diferenciaPeso} kg (Velocidad ${velocidad})\n`;
    dieta += `Objetivo: ${objetivo}\n`;
    dieta += `Preferencias: ${preferencias}\n\n`;
  
    // Restricciones
    const tieneRestricciones = alergias.some(a => a !== "Ninguna") || 
                              restricciones.some(r => r !== "Ninguna") ||
                              intolerancias.some(i => i !== "Ninguna");
    
    if (tieneRestricciones) {
      dieta += `⚠️ RESTRICCIONES CONSIDERADAS:\n`;
      if (alergias.some(a => a !== "Ninguna")) {
        dieta += `Alergias: ${alergias.filter(a => a !== "Ninguna" && a !== "Otra").join(", ")}\n`;
      }
      if (restricciones.some(r => r !== "Ninguna")) {
        dieta += `Restricciones médicas: ${restricciones.filter(r => r !== "Ninguna" && r !== "Otra").join(", ")}\n`;
      }
      if (intolerancias.some(i => i !== "Ninguna")) {
        dieta += `Intolerancias: ${intolerancias.filter(i => i !== "Ninguna" && i !== "Otra").join(", ")}\n`;
      }
      dieta += `\n`;
    }
  
    dieta += `🎯 CALORÍAS Y MACROS DIARIOS:\n`;
    dieta += `Calorías objetivo: ${caloriasDiarias} kcal`;
    
    if (objetivo === "Perder grasa") {
      dieta += ` (Déficit calórico del ${velocidad === 'agresiva' ? '20' : '15'}%)\n`;
    } else if (objetivo === "Aumentar masa muscular") {
      dieta += ` (Superávit calórico del ${velocidad === 'agresiva' ? '20' : '15'}%)\n`;
    } else {
      dieta += ` (Calorías de mantenimiento)\n`;
    }
    
    // calcular porcentajes reales

    const kcalProteinas = proteinas * 4;
    const kcalGrasas = grasas * 9;
    const kcalCarbs = carbohidratos * 4;

    const totalMacrosKcal = kcalProteinas + kcalGrasas + kcalCarbs;

    const pctProteinas = Math.round((kcalProteinas / totalMacrosKcal) * 100);
    const pctGrasas = Math.round((kcalGrasas / totalMacrosKcal) * 100);
    const pctCarbs = Math.round((kcalCarbs / totalMacrosKcal) * 100);

    dieta += `• Proteínas: ${proteinas} g (≈ ${(proteinas / peso).toFixed(1)} g/kg)\n`;
    dieta += `• Grasas: ${grasas} g (≈ ${(grasas / peso).toFixed(1)} g/kg)\n`;
    dieta += `• Carbohidratos: ${carbohidratos} g\n\n`;

    dieta += `Distribución calórica:\n`;
    dieta += `• Proteínas: ${pctProteinas}%\n`;
    dieta += `• Grasas: ${pctGrasas}%\n`;
    dieta += `• Carbohidratos: ${pctCarbs}%\n\n`;
  
    // ===== TIMING DE NUTRIENTES =====
    dieta += `⏰ TIMING DE NUTRIENTES:\n`;
    if (horario_preferido === "Mañana") {
      dieta += `Entrenas por la mañana:\n`;
      dieta += `• Pre-entreno: Carbohidratos de rápida absorción (plátano, avena) 30-60 min antes\n`;
      dieta += `• Post-entreno: Comida principal con proteína + carbohidratos dentro de 2 horas\n`;
      dieta += `• Resto del día: Distribuir calorías restantes equitativamente\n\n`;
    } else if (horario_preferido === "Tarde") {
      dieta += `Entrenas por la tarde:\n`;
      dieta += `• Almuerzo: Mayor carga de carbohidratos 2-3 horas antes\n`;
      dieta += `• Pre-entreno: Snack ligero 30-60 min antes\n`;
      dieta += `• Post-entreno: Cena con proteína + carbohidratos moderados\n\n`;
    } else {
      dieta += `Entrenas por la noche:\n`;
      dieta += `• Durante el día: Asegura consumir suficientes calorías y carbohidratos\n`;
      dieta += `• Pre-entreno: Comida 2-3 horas antes o snack 30-60 min antes\n`;
      dieta += `• Post-entreno: Cena ligera con proteína\n\n`;
    }
  
    // ===== PLAN DE COMIDAS ESPECÍFICO =====
    dieta += `🍽️ PLAN DE COMIDAS DETALLADO:\n\n`;
    
    // DESAYUNO
    const calDesayuno = Math.round(caloriasDiarias * distribucionComidas.desayuno);
    const protDesayuno = seleccionarAlimento(proteinasDisponibles, 1)[0];
    const carbDesayuno = seleccionarAlimento(carbohidratosDisponibles, 1)[0];
    const frutaDesayuno = seleccionarAlimento(frutasDisponibles, 1)[0];
    
    dieta += `DESAYUNO (~${calDesayuno} kcal):\n`;
    if (protDesayuno && carbDesayuno) {
      dieta += `• ${protDesayuno.nombre}: ${protDesayuno.por}\n`;
      
      if (objetivo === "Aumentar masa muscular") {
        dieta += `• ${carbDesayuno.nombre}: Porción generosa (${carbDesayuno.por} + 30%)\n`;
      } else if (objetivo === "Perder grasa") {
        dieta += `• ${carbDesayuno.nombre}: Porción moderada (${carbDesayuno.por})\n`;
      } else {
        dieta += `• ${carbDesayuno.nombre}: ${carbDesayuno.por}\n`;
      }
      
      if (frutaDesayuno) dieta += `• ${frutaDesayuno.nombre}: ${frutaDesayuno.por}\n`;
      if (grasasDisponibles.length > 0) {
        const grasaDesayuno = seleccionarAlimento(grasasDisponibles, 1)[0];
        dieta += `• ${grasaDesayuno.nombre}: ${grasaDesayuno.por}\n`;
      }
      
      if (objetivo === "Aumentar masa muscular") {
        dieta += `Ejemplo: ${preferencias === 'Vegano' ? 'Avena abundante con proteína vegana, 2 plátanos y almendras' : '4 huevos revueltos con 2 tostadas integrales, aguacate y jugo de naranja'}\n\n`;
      } else if (objetivo === "Perder grasa") {
        dieta += `Ejemplo: ${preferencias === 'Vegano' ? 'Avena con proteína vegana y frutos rojos' : '3 claras + 1 huevo entero con tostada integral y medio aguacate'}\n\n`;
      } else {
        dieta += `Ejemplo: ${preferencias === 'Vegano' ? 'Avena con proteína vegana, plátano y almendras' : 'Huevos revueltos con tostada integral y aguacate'}\n\n`;
      }
    }
  
    // MEDIA MAÑANA
    const calMediaManana = Math.round(caloriasDiarias * distribucionComidas.mediaManana);
    dieta += `MEDIA MAÑANA (~${calMediaManana} kcal):\n`;
    
    if (objetivo === "Aumentar masa muscular") {
      dieta += `• Batido de proteína con leche/bebida vegetal\n`;
      dieta += `• Fruta (plátano o mango)\n`;
      dieta += `• Puñado generoso de frutos secos\n`;
      dieta += `Objetivo: Snack denso en calorías para apoyar crecimiento muscular\n\n`;
    } else if (objetivo === "Perder grasa") {
      dieta += `• Fruta fresca (preferir bajas en calorías: fresas, manzana)\n`;
      dieta += `• Yogur griego light o proteína\n`;
      dieta += `Objetivo: Controlar el hambre con pocas calorías\n\n`;
    } else {
      const snack1 = seleccionarAlimento([...frutasDisponibles, ...grasasDisponibles], 2);
      snack1.forEach(s => dieta += `• ${s.nombre}: ${s.por}\n`);
      dieta += `Ejemplo: Fruta fresca + un puñado de frutos secos\n\n`;
    }
  
    // ALMUERZO
    const calAlmuerzo = Math.round(caloriasDiarias * distribucionComidas.almuerzo);
    const protAlmuerzo = seleccionarAlimento(proteinasDisponibles, 1)[0];
    const carbAlmuerzo = seleccionarAlimento(carbohidratosDisponibles, 1)[0];
    const verduraAlmuerzo = seleccionarAlimento(verdurasDisponibles, 2);
    
    dieta += `ALMUERZO (~${calAlmuerzo} kcal) - Comida principal:\n`;
    if (protAlmuerzo && carbAlmuerzo) {
      if (objetivo === "Aumentar masa muscular") {
        dieta += `• ${protAlmuerzo.nombre}: 200-250g (porción abundante)\n`;
        dieta += `• ${carbAlmuerzo.nombre}: 200-250g (porción generosa)\n`;
        verduraAlmuerzo.forEach(v => dieta += `• ${v.nombre}: 100g\n`);
        dieta += `• Aceite de oliva: 2 cucharadas para cocinar\n`;
        dieta += `• Postre: Fruta o yogur con granola\n`;
        dieta += `Macros aprox: P: ${Math.round(proteinas * 0.35)}g | C: ${Math.round(carbohidratos * 0.40)}g | G: ${Math.round(grasas * 0.30)}g\n`;
        dieta += `💪 Tip: Esta es tu comida más importante para construcción muscular\n\n`;
      } else if (objetivo === "Perder grasa") {
        dieta += `• ${protAlmuerzo.nombre}: 180-200g (alta proteína)\n`;
        dieta += `• ${carbAlmuerzo.nombre}: 100-120g (porción controlada)\n`;
        verduraAlmuerzo.forEach(v => dieta += `• ${v.nombre}: 150g (abundantes)\n`);
        dieta += `• Aceite de oliva: 1 cucharada\n`;
        dieta += `Macros aprox: P: ${Math.round(proteinas * 0.35)}g | C: ${Math.round(carbohidratos * 0.30)}g | G: ${Math.round(grasas * 0.30)}g\n`;
        dieta += `🔥 Tip: Llena el plato de verduras para saciedad con pocas calorías\n\n`;
      } else {
        dieta += `• ${protAlmuerzo.nombre}: 150-200g\n`;
        dieta += `• ${carbAlmuerzo.nombre}: 150-200g\n`;
        verduraAlmuerzo.forEach(v => dieta += `• ${v.nombre}: 100g\n`);
        dieta += `• Aceite de oliva: 1 cucharada para cocinar\n`;
        dieta += `Macros aprox: P: ${Math.round(proteinas * 0.3)}g | C: ${Math.round(carbohidratos * 0.35)}g | G: ${Math.round(grasas * 0.3)}g\n\n`;
      }
    }
  
    // MERIENDA
    const calMerienda = Math.round(caloriasDiarias * distribucionComidas.merienda);
    dieta += `MERIENDA (~${calMerienda} kcal):\n`;
    const snack2 = seleccionarAlimento(proteinasDisponibles, 1)[0];
    
    if (objetivo === "Aumentar masa muscular") {
      if (snack2) dieta += `• ${snack2.nombre}: ${snack2.por}\n`;
      dieta += `• Batido de proteína con avena y mantequilla de maní\n`;
      dieta += `• Plátano o dátiles\n`;
      dieta += `💪 Ideal antes de entrenar si entrenas en la tarde/noche\n\n`;
    } else if (objetivo === "Perder grasa") {
      dieta += `• Batido de proteína con agua o café\n`;
      dieta += `• Gelatina light (opcional para dulce)\n`;
      dieta += `🔥 Mantén alta la proteína para preservar músculo\n\n`;
    } else {
      if (snack2) dieta += `• ${snack2.nombre}: ${snack2.por}\n`;
      dieta += `• Batido de proteína o yogur con fruta\n\n`;
    }
  
    // CENA
    const calCena = Math.round(caloriasDiarias * distribucionComidas.cena);
    const protCena = seleccionarAlimento(proteinasDisponibles.filter(p => p.nombre !== protAlmuerzo?.nombre), 1)[0];
    const verduraCena = seleccionarAlimento(verdurasDisponibles, 2);
    
    dieta += `CENA (~${calCena} kcal):\n`;
    if (protCena) {
      dieta += `• ${protCena.nombre}: ${objetivo === "Aumentar masa muscular" ? "180-200g" : "150-180g"}\n`;
      verduraCena.forEach(v => dieta += `• ${v.nombre}: 150g\n`);
      dieta += `• Ensalada mixta con aceite de oliva\n`;
      
      if (objetivo === "Aumentar masa muscular") {
        dieta += `• Carbohidrato: ${carbAlmuerzo?.nombre || "Arroz/pasta"} (100g) - opcional según calorías restantes\n`;
        dieta += `Macros aprox: P: ${Math.round(proteinas * 0.25)}g | C: ${Math.round(carbohidratos * 0.25)}g | G: ${Math.round(grasas * 0.25)}g\n\n`;
      } else if (objetivo === "Perder grasa") {
        dieta += `• Sin carbohidratos adicionales (verduras cuentan)\n`;
        dieta += `Macros aprox: P: ${Math.round(proteinas * 0.30)}g | C: ${Math.round(carbohidratos * 0.15)}g | G: ${Math.round(grasas * 0.25)}g\n`;
        dieta += `🔥 Cena ligera para maximizar quema nocturna\n\n`;
      } else {
        dieta += `Macros aprox: P: ${Math.round(proteinas * 0.3)}g | C: ${Math.round(carbohidratos * 0.2)}g | G: ${Math.round(grasas * 0.25)}g\n\n`;
      }
    }
  
    // ===== RECOMENDACIONES ESPECÍFICAS POR RESTRICCIÓN =====
    if (restricciones.includes('Diabetes')) {
      dieta += `🩺 RECOMENDACIONES - DIABETES:\n`;
      dieta += `• Prioriza carbohidratos de bajo índice glucémico (avena, batata, quinoa)\n`;
      dieta += `• Distribuye carbohidratos uniformemente en las comidas\n`;
      dieta += `• Combina siempre carbohidratos con proteína y grasa\n`;
      dieta += `• Monitorea glucosa antes y después de entrenar\n`;
      dieta += `• Evita jugos de fruta y azúcares refinados\n\n`;
    }
  
    if (restricciones.includes('Hipertensión')) {
      dieta += `🩺 RECOMENDACIONES - HIPERTENSIÓN:\n`;
      dieta += `• Limita sodio a menos de 2300mg/día (1 cucharadita de sal)\n`;
      dieta += `• Evita alimentos procesados, embutidos y enlatados\n`;
      dieta += `• Aumenta potasio: plátanos, aguacate, espinacas\n`;
      dieta += `• No agregues sal a las comidas, usa especias\n\n`;
    }
  
    if (restricciones.includes('Colesterol alto')) {
      dieta += `🩺 RECOMENDACIONES - COLESTEROL ALTO:\n`;
      dieta += `• Limita grasas saturadas (carnes rojas, lácteos enteros)\n`;
      dieta += `• Aumenta fibra soluble: avena, legumbres, frutas\n`;
      dieta += `• Prioriza grasas insaturadas: pescado, aguacate, frutos secos\n`;
      dieta += `• Evita alimentos fritos y ultraprocesados\n\n`;
    }
  
    // ===== SUPLEMENTACIÓN =====
    dieta += `💊 SUPLEMENTACIÓN RECOMENDADA:\n`;
    dieta += `• Proteína en polvo: Si no alcanzas ${proteinas}g con alimentos\n`;
    dieta += `• Creatina: 5g diarios (${objetivo === "Aumentar masa muscular" ? "muy recomendada" : "opcional"})\n`;
    if (genero === "Femenino") {
      dieta += `• Hierro: Especialmente importante para mujeres\n`;
      dieta += `• Calcio y Vitamina D: Para salud ósea\n`;
    }
    if (preferencias === "Vegano") {
      dieta += `• Vitamina B12: Esencial para veganos (suplementar obligatoriamente)\n`;
      dieta += `• Omega-3 (DHA/EPA): De algas\n`;
    }
    dieta += `\n`;
  
    // ===== HIDRATACIÓN =====
    const aguaDiaria = Math.round(peso * 0.035);
    dieta += `💧 HIDRATACIÓN:\n`;
    dieta += `• Consumo mínimo: ${aguaDiaria} litros/día (35ml por kg de peso)\n`;
    dieta += `• Pre-entreno: 500ml 2 horas antes\n`;
    dieta += `• Durante entreno: 200-300ml cada 15-20 minutos\n`;
    dieta += `• Post-entreno: Reponer 150% del peso perdido en sudor\n\n`;
  
    // ===== TIPS GENERALES =====
    dieta += `📝 CONSEJOS CLAVE:\n`;
    dieta += `• Come cada 3-4 horas para mantener metabolismo activo\n`;
    dieta += `• Incluye proteína en CADA comida (${Math.round(proteinas/5)}g por comida)\n`;
    dieta += `• Prepara comidas con anticipación (meal prep domingos)\n`;
    dieta += `• Pésate 1 vez por semana en ayunas, mismo día y hora\n`;
    dieta += `• Ajusta calorías si no ves progreso en 2-3 semanas\n`;
    dieta += `• Prioriza alimentos integrales y poco procesados\n`;
    dieta += `• Duerme 7-9 horas para recuperación óptima\n\n`;
  
    dieta += `⚠️ AVISO IMPORTANTE:\n`;
    dieta += `Este plan es una guía general personalizada basada en tu información. NO reemplaza el consejo médico o nutricional profesional. Si tienes condiciones médicas, consulta con un nutricionista titulado antes de iniciar cualquier plan alimenticio. Los resultados varían según adherencia, genética y otros factores individuales.\n`;
  
    return dieta;
  }

  module.exports = { generateDieta };