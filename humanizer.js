// Módulo de humanización avanzada de texto IA
// Basado en investigación de múltiples fuentes y técnicas de humanización

const humanizer = {
    // Función principal para humanizar texto
    humanizeText: function(text, aiProbability) {
        // Si el texto no parece ser de IA, no es necesario humanizarlo tanto
        const intensidad = this.determinarIntensidadHumanizacion(aiProbability);
        
        // Aplicar técnicas de humanización en orden de complejidad creciente
        let humanizedText = text;
        
        // 1. Variación de estructura de oraciones
        humanizedText = this.variarEstructuraOraciones(humanizedText, intensidad);
        
        // 2. Añadir expresiones coloquiales y modismos
        humanizedText = this.añadirExpresionesColoquiales(humanizedText, intensidad);
        
        // 3. Introducir marcas de oralidad y digresiones
        humanizedText = this.introducirMarcasOralidad(humanizedText, intensidad);
        
        // 4. Añadir referencias personales y experiencias
        humanizedText = this.añadirReferenciasPersonales(humanizedText, intensidad);
        
        // 5. Reducir formalidad excesiva
        humanizedText = this.reducirFormalidadExcesiva(humanizedText, intensidad);
        
        // 6. Añadir inconsistencias menores (errores naturales)
        humanizedText = this.añadirInconsistenciasMenores(humanizedText, intensidad);
        
        // 7. Buscar recursos contextuales para enriquecer el texto
        humanizedText = this.enriquecerConRecursosContextuales(humanizedText);
        
        // Registrar cambios realizados para mostrar al usuario
        const cambios = this.registrarCambios(text, humanizedText);
        
        return {
            textoOriginal: text,
            textoHumanizado: humanizedText,
            cambiosRealizados: cambios
        };
    },
    
    // Determinar la intensidad de humanización basada en la probabilidad de IA
    determinarIntensidadHumanizacion: function(aiProbability) {
        if (aiProbability > 80) return 'alta';
        if (aiProbability > 60) return 'media';
        return 'baja';
    },
    
    // Variar la estructura de las oraciones para hacerlas menos predecibles
    variarEstructuraOraciones: function(text, intensidad) {
        const oraciones = this.dividirEnOraciones(text);
        let resultado = [];
        
        // Factores de variación según intensidad
        const factores = {
            'baja': 0.2,
            'media': 0.4,
            'alta': 0.6
        };
        
        const factor = factores[intensidad];
        
        for (let i = 0; i < oraciones.length; i++) {
            let oracion = oraciones[i];
            
            // Aplicar variaciones con probabilidad basada en intensidad
            if (Math.random() < factor) {
                // Dividir oraciones largas
                if (oracion.length > 120 && Math.random() < 0.6) {
                    const puntoCorte = this.encontrarPuntoCorte(oracion);
                    if (puntoCorte > 0) {
                        const primeraOracion = oracion.substring(0, puntoCorte) + '.';
                        const segundaOracion = oracion.substring(puntoCorte + 1);
                        resultado.push(primeraOracion);
                        oracion = segundaOracion;
                    }
                }
                // Combinar oraciones cortas
                else if (i < oraciones.length - 1 && 
                        oracion.length < 60 && 
                        oraciones[i+1].length < 60 && 
                        Math.random() < 0.4) {
                    const conectores = [
                        'y', 'además', 'también', 
                        'mientras que', 'aunque', 
                        'sin embargo', 'por otro lado'
                    ];
                    const conector = conectores[Math.floor(Math.random() * conectores.length)];
                    
                    oracion = oracion.replace(/[.!?]$/, '') + 
                              ', ' + conector + ' ' + 
                              oraciones[i+1].charAt(0).toLowerCase() + 
                              oraciones[i+1].slice(1);
                    
                    i++; // Saltar la siguiente oración ya que la hemos combinado
                }
                // Invertir orden de cláusulas
                else if (oracion.includes(',') && Math.random() < 0.3) {
                    const partes = oracion.split(',');
                    if (partes.length >= 2) {
                        // Asegurarse de que la primera parte no sea muy corta
                        if (partes[0].length > 15) {
                            oracion = partes[1].trim() + ', ' + partes[0].toLowerCase();
                        }
                    }
                }
            }
            
            resultado.push(oracion);
        }
        
        return resultado.join(' ');
    },
    
    // Añadir expresiones coloquiales y modismos para dar naturalidad
    añadirExpresionesColoquiales: function(text, intensidad) {
        // Banco de expresiones coloquiales y modismos en español
        const expresiones = [
            { formal: 'es muy importante', coloquial: 'es crucial' },
            { formal: 'es necesario', coloquial: 'hace falta' },
            { formal: 'además', coloquial: 'por si fuera poco' },
            { formal: 'sin embargo', coloquial: 'no obstante' },
            { formal: 'por lo tanto', coloquial: 'así que' },
            { formal: 'finalmente', coloquial: 'para rematar' },
            { formal: 'muy bueno', coloquial: 'fantástico' },
            { formal: 'muy malo', coloquial: 'pésimo' },
            { formal: 'en conclusión', coloquial: 'para cerrar el tema' },
            { formal: 'es evidente', coloquial: 'salta a la vista' },
            { formal: 'en mi opinión', coloquial: 'desde mi punto de vista' },
            { formal: 'considero que', coloquial: 'me parece que' },
            { formal: 'muy fácil', coloquial: 'pan comido' },
            { formal: 'muy difícil', coloquial: 'un hueso duro de roer' },
            { formal: 'rápidamente', coloquial: 'en un abrir y cerrar de ojos' },
            { formal: 'sorprendentemente', coloquial: 'para mi sorpresa' },
            { formal: 'sin duda', coloquial: 'sin lugar a dudas' },
            { formal: 'aproximadamente', coloquial: 'más o menos' },
            { formal: 'inmediatamente', coloquial: 'al instante' },
            { formal: 'definitivamente', coloquial: 'sin duda alguna' }
        ];
        
        // Modismos más específicos para alta intensidad
        const modismos = [
            { expresion: 'costar un ojo de la cara', contexto: 'caro' },
            { expresion: 'estar en las nubes', contexto: 'distraído' },
            { expresion: 'dar en el clavo', contexto: 'acertar' },
            { expresion: 'meter la pata', contexto: 'equivocarse' },
            { expresion: 'echar una mano', contexto: 'ayudar' },
            { expresion: 'ponerse las pilas', contexto: 'esforzarse' },
            { expresion: 'estar hasta las narices', contexto: 'hartarse' },
            { expresion: 'no tener ni idea', contexto: 'desconocer' },
            { expresion: 'a troche y moche', contexto: 'abundantemente' },
            { expresion: 'de uvas a peras', contexto: 'raramente' }
        ];
        
        // Factores de sustitución según intensidad
        const factores = {
            'baja': 0.1,
            'media': 0.25,
            'alta': 0.4
        };
        
        const factor = factores[intensidad];
        let resultado = text;
        
        // Reemplazar expresiones formales por coloquiales
        expresiones.forEach(expr => {
            if (Math.random() < factor) {
                const regex = new RegExp('\\b' + expr.formal + '\\b', 'gi');
                resultado = resultado.replace(regex, expr.coloquial);
            }
        });
        
        // Para intensidad alta, intentar insertar modismos en contextos apropiados
        if (intensidad === 'alta') {
            modismos.forEach(modismo => {
                if (Math.random() < 0.3 && resultado.includes(modismo.contexto)) {
                    const regex = new RegExp('\\b' + modismo.contexto + '\\b', 'gi');
                    // Solo reemplazar la primera ocurrencia para no sobrecargar
                    const match = regex.exec(resultado);
                    if (match && match.index > 0) {
                        const inicio = resultado.substring(0, match.index);
                        const fin = resultado.substring(match.index + modismo.contexto.length);
                        resultado = inicio + modismo.expresion + fin;
                    }
                }
            });
        }
        
        return resultado;
    },
    
    // Introducir marcas de oralidad y digresiones para simular pensamiento humano
    introducirMarcasOralidad: function(text, intensidad) {
        const oraciones = this.dividirEnOraciones(text);
        let resultado = [];
        
        // Marcas de oralidad comunes
        const marcasOralidad = [
            { marca: ', la verdad, ', posicion: 'inicio' },
            { marca: ', sinceramente, ', posicion: 'inicio' },
            { marca: ', a decir verdad, ', posicion: 'inicio' },
            { marca: ', honestamente, ', posicion: 'inicio' },
            { marca: ', francamente, ', posicion: 'inicio' },
            { marca: ', en realidad, ', posicion: 'inicio' },
            { marca: ', por así decirlo, ', posicion: 'medio' },
            { marca: ', por decirlo de alguna manera, ', posicion: 'medio' },
            { marca: ', si me permites la expresión, ', posicion: 'medio' },
            { marca: ', como quien dice, ', posicion: 'medio' },
            { marca: ', ¿sabes?, ', posicion: 'final' },
            { marca: ', ¿entiendes?, ', posicion: 'final' },
            { marca: ', ¿me explico?, ', posicion: 'final' },
            { marca: ', ¿no crees?, ', posicion: 'final' }
        ];
        
        // Digresiones para intensidad media y alta
        const digresiones = [
            ' (y esto me parece fascinante)',
            ' (aunque no todos estarían de acuerdo)',
            ' (basado en mi experiencia)',
            ' (y esto es solo mi opinión)',
            ' (lo que resulta sorprendente)',
            ' (como he podido comprobar)',
            ' (y no me canso de repetirlo)',
            ' (aunque podría estar equivocado)',
            ' (y esto lo digo por experiencia propia)',
            ' (y créeme que lo he visto muchas veces)'
        ];
        
        // Factores según intensidad
        const factores = {
            'baja': 0.05,
            'media': 0.15,
            'alta': 0.25
        };
        
        const factor = factores[intensidad];
        
        for (let i = 0; i < oraciones.length; i++) {
            let oracion = oraciones[i];
            
            // Aplicar marcas de oralidad
            if (Math.random() < factor) {
                const marcasDisponibles = marcasOralidad.filter(m => {
                    if (m.posicion === 'inicio' && oracion.length > 20) return true;
                    if (m.posicion === 'medio' && oracion.length > 40) return true;
                    if (m.posicion === 'final' && oracion.length > 30) return true;
                    return false;
                });
                
                if (marcasDisponibles.length > 0) {
                    const marca = marcasDisponibles[Math.floor(Math.random() * marcasDisponibles.length)];
                    
                    if (marca.posicion === 'inicio') {
                        // Insertar después de las primeras palabras
                        const primerEspacio = oracion.indexOf(' ');
                        if (primerEspacio > 0) {
                            oracion = oracion.substring(0, primerEspacio + 1) + 
                                     marca.marca + 
                                     oracion.substring(primerEspacio + 1);
                        }
                    } else if (marca.posicion === 'medio') {
                        // Insertar en medio de la oración
                        const mitad = Math.floor(oracion.length / 2);
                        const espacioCercano = oracion.indexOf(' ', mitad);
                        if (espacioCercano > 0) {
                            oracion = oracion.substring(0, espacioCercano) + 
                                     marca.marca + 
                                     oracion.substring(espacioCercano);
                        }
                    } else if (marca.posicion === 'final') {
                        // Insertar antes del punto final
                        oracion = oracion.replace(/([.!?])$/, marca.marca + '$1');
                    }
                }
            }
            
            // Añadir digresiones para intensidad media y alta
            if ((intensidad === 'media' || intensidad === 'alta') && 
                Math.random() < factor && oracion.length > 50) {
                const digresion = digresiones[Math.floor(Math.random() * digresiones.length)];
                
                // Encontrar un buen punto para insertar la digresión
                const puntoInsercion = this.encontrarPuntoInsercion(oracion);
                if (puntoInsercion > 0) {
                    oracion = oracion.substring(0, puntoInsercion) + 
                             digresion + 
                             oracion.substring(puntoInsercion);
                }
            }
            
            resultado.push(oracion);
        }
        
        return resultado.join(' ');
    },
    
    // Añadir referencias personales y experiencias
    añadirReferenciasPersonales: function(text, intensidad) {
        const oraciones = this.dividirEnOraciones(text);
        let resultado = [];
        
        // Referencias personales para diferentes contextos
        const referenciasPersonales = [
            { contexto: 'tecnología', referencia: 'Recuerdo cuando compré mi primer smartphone, ' },
            { contexto: 'educación', referencia: 'Durante mis años de universidad, aprendí que ' },
            { contexto: 'viajes', referencia: 'En uno de mis viajes a la costa, descubrí que ' },
            { contexto: 'cocina', referencia: 'La receta que me enseñó mi abuela demuestra que ' },
            { contexto: 'deportes', referencia: 'Jugando al fútbol con amigos, me di cuenta de que ' },
            { contexto: 'música', referencia: 'En el último concierto al que asistí, comprendí que ' },
            { contexto: 'cine', referencia: 'Viendo esa película clásica, entendí por qué ' },
            { contexto: 'libros', referencia: 'Leyendo a mi autor favorito, reflexioné sobre cómo ' },
            { contexto: 'trabajo', referencia: 'En mi experiencia profesional, he observado que ' },
            { contexto: 'salud', referencia: 'Después de cambiar mis hábitos alimenticios, noté que ' }
        ];
        
        // Factores según intensidad
        const factores = {
            'baja': 0.05,
            'media': 0.1,
            'alta': 0.2
        };
        
        const factor = factores[intensidad];
        
        // Detectar posibles contextos en el texto
        const contextosDetectados = [];
        referenciasPersonales.forEach(ref => {
            if (text.toLowerCase().includes(ref.contexto)) {
                contextosDetectados.push(ref);
            }
        });
        
        // Si no se detectaron contextos específicos, usar referencias genéricas
        const referenciasGenericas = [
            'En mi experiencia, ',
            'Por lo que he podido observar, ',
            'Según mi punto de vista, ',
            'Desde mi perspectiva, ',
            'Por lo que he vivido, ',
            'En base a lo que he aprendido, ',
            'A lo largo de mi vida, he notado que ',
            'Personalmente, creo que ',
            'Si me preguntas a mí, diría que ',
            'Por mi parte, considero que '
        ];
        
        // Añadir referencias personales
        for (let i = 0; i < oraciones.length; i++) {
            let oracion = oraciones[i];
            
            // Solo añadir referencias al principio de párrafos o en oraciones importantes
            const esInicioPárrafo = i === 0 || oraciones[i-1].endsWith('.');
            const esOracionImportante = oracion.length > 80 || oracion.includes('importante') || oracion.includes('destacar');
            
            if ((esInicioPárrafo || esOracionImportante) && Math.random() < factor) {
                // Usar referencia contextual si está disponible
                if (contextosDetectados.length > 0 && Math.random() < 0.7) {
                    const refContextual = contextosDetectados[Math.floor(Math.random() * contextosDetectados.length)];
                    oracion = refContextual.referencia + oracion.charAt(0).toLowerCase() + oracion.slice(1);
                }
                // De lo contrario, usar referencia genérica
                else {
                    const refGenerica = referenciasGenericas[Math.floor(Math.random() * referenciasGenericas.length)];
                    oracion = refGenerica + oracion.charAt(0).toLowerCase() + oracion.slice(1);
                }
            }
            
            resultado.push(oracion);
        }
        
        return resultado.join(' ');
    },
    
    // Reducir formalidad excesiva
    reducirFormalidadExcesiva: function(text, intensidad) {
        // Expresiones formales y sus equivalentes más coloquiales
        const sustitucionesFormalidad = [
            { formal: 'adicionalmente', coloquial: 'además' },
            { formal: 'consecuentemente', coloquial: 'por lo tanto' },
            { formal: 'subsecuentemente', coloquial: 'después' },
            { formal: 'indudablemente', coloquial: 'sin duda' },
            { formal: 'evidentemente', coloquial: 'claramente' },
            { formal: 'ciertamente', coloquial: 'claro que' },
            { formal: 'considerablemente', coloquial: 'bastante' },
            { formal: 'fundamentalmente', coloquial: 'básicamente' },
            { formal: 'primordialmente', coloquial: 'sobre todo' },
            { formal: 'significativamente', coloquial: 'mucho' },
            { formal: 'en virtud de', coloquial: 'gracias a' },
            { formal: 'en función de', coloquial: 'según' },
            { formal: 'en relación con', coloquial: 'sobre' },
            { formal: 'en lo que respecta a', coloquial: 'en cuanto a' },
            { formal: 'en lo concerniente a', coloquial: 'sobre' },
            { formal: 'cabe destacar que', coloquial: 'hay que destacar que' },
            { formal: 'es menester', coloquial: 'es necesario' },
            { formal: 'es imperativo', coloquial: 'es importante' },
            { formal: 'es preciso señalar', coloquial: 'hay que señalar' },
            { formal: 'es necesario enfatizar', coloquial: 'hay que destacar' }
        ];
        
        // Factores según intensidad
        const factores = {
            'baja': 0.3,
            'media': 0.6,
            'alta': 0.9
        };
        
        const factor = factores[intensidad];
        let resultado = text;
        
        // Reemplazar expresiones formales por coloquiales
        sustitucionesFormalidad.forEach(sust => {
            if (Math.random() < factor) {
                const regex = new RegExp('\\b' + sust.formal + '\\b', 'gi');
                resultado = resultado.replace(regex, sust.coloquial);
            }
        });
        
        // Convertir voz pasiva a activa para intensidad media y alta
        if (intensidad === 'media' || intensidad === 'alta') {
            // Patrones de voz pasiva en español
            const patronesPasiva = [
                { pasiva: /fue ([\w]+ado|[\w]+ido) por/g, activa: (match, p1) => match.replace(/fue ([\w]+ado|[\w]+ido) por/, 'hizo') },
                { pasiva: /fueron ([\w]+ados|[\w]+idos) por/g, activa: (match, p1) => match.replace(/fueron ([\w]+ados|[\w]+idos) por/, 'hicieron') },
                { pasiva: /ha sido ([\w]+ado|[\w]+ido) por/g, activa: (match, p1) => match.replace(/ha sido ([\w]+ado|[\w]+ido) por/, 'ha hecho') },
                { pasiva: /han sido ([\w]+ados|[\w]+idos) por/g, activa: (match, p1) => match.replace(/han sido ([\w]+ados|[\w]+idos) por/, 'han hecho') },
                { pasiva: /es ([\w]+ado|[\w]+ido) por/g, activa: (match, p1) => match.replace(/es ([\w]+ado|[\w]+ido) por/, 'hace') },
                { pasiva: /son ([\w]+ados|[\w]+idos) por/g, activa: (match, p1) => match.replace(/son ([\w]+ados|[\w]+idos) por/, 'hacen') }
            ];
            
            // Aplicar transformaciones de voz pasiva a activa
            patronesPasiva.forEach(patron => {
                if (Math.random() < factor * 0.7) {
                    resultado = resultado.replace(patron.pasiva, patron.activa);
                }
            });
        }
        
        return resultado;
    },
    
    // Añadir inconsistencias menores (errores naturales)
    añadirInconsistenciasMenores: function(text, intensidad) {
        // Solo añadir inconsistencias para intensidad media y alta
        if (intensidad === 'baja') return text;
        
        const oraciones = this.dividirEnOraciones(text);
        let resultado = [];
        
        // Tipos de inconsistencias naturales
        const inconsistencias = [
            // Autocorrecciones
            { tipo: 'autocorreccion', patron: /\b(creo|pienso|considero)\b/gi, reemplazo: (match) => {
                const alternativas = {
                    'creo': 'pienso... no, creo',
                    'pienso': 'creo... mejor dicho, pienso',
                    'considero': 'opino... o más bien considero'
                };
                return alternativas[match.toLowerCase()] || match;
            }},
            
            // Repeticiones para énfasis
            { tipo: 'repeticion', patron: /\b(muy|bastante|realmente)\b/gi, reemplazo: (match) => {
                return match + ', ' + match;
            }},
            
            // Cambios de tiempo verbal
            { tipo: 'tiempoVerbal', condicion: (oracion, i, oraciones) => {
                if (i > 0) {
                    const oracionActual = oracion.toLowerCase();
                    const oracionAnterior = oraciones[i-1].toLowerCase();
                    
                    const tiempoActualPresente = /\b(es|son|está|están|hace|hacen|dice|dicen)\b/.test(oracionActual);
                    const tiempoAnteriorPasado = /\b(fue|fueron|estuvo|estuvieron|hizo|hicieron|dijo|dijeron)\b/.test(oracionAnterior);
                    
                    return tiempoActualPresente && tiempoAnteriorPasado;
                }
                return false;
            }, aplicar: (oracion) => {
                return 'Ahora bien, ' + oracion;
            }}
        ];
        
        // Factores según intensidad
        const factores = {
            'media': 0.1,
            'alta': 0.2
        };
        
        const factor = factores[intensidad];
        
        for (let i = 0; i < oraciones.length; i++) {
            let oracion = oraciones[i];
            
            // Aplicar inconsistencias con probabilidad basada en intensidad
            if (Math.random() < factor) {
                // Seleccionar tipo de inconsistencia aleatoriamente
                const tiposDisponibles = inconsistencias.filter(inc => {
                    if (inc.tipo === 'tiempoVerbal') {
                        return inc.condicion(oracion, i, oraciones);
                    }
                    return inc.patron.test(oracion);
                });
                
                if (tiposDisponibles.length > 0) {
                    const inconsistencia = tiposDisponibles[Math.floor(Math.random() * tiposDisponibles.length)];
                    
                    if (inconsistencia.tipo === 'tiempoVerbal') {
                        oracion = inconsistencia.aplicar(oracion);
                    } else {
                        oracion = oracion.replace(inconsistencia.patron, inconsistencia.reemplazo);
                    }
                }
            }
            
            resultado.push(oracion);
        }
        
        return resultado.join(' ');
    },
    
    // Enriquecer con recursos contextuales
    enriquecerConRecursosContextuales: function(text) {
        // Detectar temas principales en el texto
        const temasPrincipales = this.detectarTemasPrincipales(text);
        
        // Banco de recursos contextuales por tema
        const recursosContextuales = {
            'tecnología': [
                'Como comentaba el otro día con un amigo que trabaja en Silicon Valley, ',
                'Según leí en un artículo reciente de TechCrunch, ',
                'Recordando la presentación de Steve Jobs en 2007, ',
                'Como usuario de tecnología desde hace más de 20 años, '
            ],
            'educación': [
                'Durante mis años como estudiante, pude comprobar que ',
                'Un profesor que tuve en la universidad siempre decía que ',
                'Como bien saben quienes han pasado por las aulas, ',
                'Según un estudio reciente publicado en la revista Education Today, '
            ],
            'salud': [
                'Mi médico siempre insiste en que ',
                'Después de probar diferentes rutinas de ejercicio, he descubierto que ',
                'Como comentaba recientemente con mi entrenador personal, ',
                'Según las últimas recomendaciones de la OMS, '
            ],
            'economía': [
                'Analizando la evolución del mercado en los últimos meses, ',
                'Como pequeño inversor desde hace años, he aprendido que ',
                'Según comentaba recientemente un analista de Bloomberg, ',
                'Tras la crisis de 2008, muchos expertos coinciden en que '
            ],
            'medio ambiente': [
                'Después de participar en varias iniciativas de limpieza de playas, ',
                'Como observador del cambio climático en mi entorno cercano, ',
                'Según el último informe del IPCC, ',
                'Hablando con un amigo biólogo sobre este tema, me explicaba que '
            ]
        };
        
        // Si no se detectaron temas específicos, usar recursos genéricos
        const recursosGenericos = [
            'Basándome en mi experiencia personal, ',
            'Como he podido comprobar a lo largo de los años, ',
            'Según he ido aprendiendo con el tiempo, ',
            'Desde mi humilde punto de vista, ',
            'Tras reflexionar sobre este tema durante mucho tiempo, '
        ];
        
        // Seleccionar un recurso contextual apropiado
        let recursoSeleccionado = '';
        
        if (temasPrincipales.length > 0) {
            const tema = temasPrincipales[0]; // Usar el tema más relevante
            if (recursosContextuales[tema]) {
                const recursosDisponibles = recursosContextuales[tema];
                recursoSeleccionado = recursosDisponibles[Math.floor(Math.random() * recursosDisponibles.length)];
            }
        }
        
        // Si no se encontró un recurso específico, usar uno genérico
        if (!recursoSeleccionado) {
            recursoSeleccionado = recursosGenericos[Math.floor(Math.random() * recursosGenericos.length)];
        }
        
        // Insertar el recurso contextual al principio de un párrafo apropiado
        const parrafos = text.split('\n\n');
        
        if (parrafos.length > 1) {
            // Insertar en el segundo párrafo para mayor naturalidad
            const indiceParrafo = Math.min(1, parrafos.length - 1);
            parrafos[indiceParrafo] = recursoSeleccionado + parrafos[indiceParrafo].charAt(0).toLowerCase() + parrafos[indiceParrafo].slice(1);
        } else {
            // Si solo hay un párrafo, dividirlo e insertar en la segunda parte
            const oraciones = this.dividirEnOraciones(text);
            if (oraciones.length > 3) {
                const indiceMitad = Math.floor(oraciones.length / 2);
                oraciones[indiceMitad] = recursoSeleccionado + oraciones[indiceMitad].charAt(0).toLowerCase() + oraciones[indiceMitad].slice(1);
                return oraciones.join(' ');
            } else {
                // Si hay pocas oraciones, simplemente añadir al principio
                return recursoSeleccionado + text.charAt(0).toLowerCase() + text.slice(1);
            }
        }
        
        return parrafos.join('\n\n');
    },
    
    // Detectar temas principales en el texto
    detectarTemasPrincipales: function(text) {
        const temas = [
            { nombre: 'tecnología', palabrasClave: ['tecnología', 'digital', 'internet', 'dispositivo', 'aplicación', 'software', 'hardware', 'móvil', 'computadora', 'inteligencia artificial', 'IA', 'algoritmo'] },
            { nombre: 'educación', palabrasClave: ['educación', 'aprendizaje', 'enseñanza', 'estudiante', 'profesor', 'escuela', 'universidad', 'conocimiento', 'académico', 'formación'] },
            { nombre: 'salud', palabrasClave: ['salud', 'médico', 'enfermedad', 'tratamiento', 'bienestar', 'ejercicio', 'nutrición', 'hospital', 'paciente', 'medicina'] },
            { nombre: 'economía', palabrasClave: ['economía', 'finanzas', 'mercado', 'inversión', 'empresa', 'negocio', 'dinero', 'comercio', 'crisis', 'crecimiento'] },
            { nombre: 'medio ambiente', palabrasClave: ['medio ambiente', 'ecología', 'sostenibilidad', 'cambio climático', 'contaminación', 'reciclaje', 'energía renovable', 'biodiversidad', 'naturaleza'] }
        ];
        
        const textLower = text.toLowerCase();
        const temasPrincipales = [];
        
        // Contar ocurrencias de palabras clave por tema
        temas.forEach(tema => {
            let contador = 0;
            tema.palabrasClave.forEach(palabra => {
                const regex = new RegExp('\\b' + palabra + '\\b', 'gi');
                const matches = textLower.match(regex);
                if (matches) contador += matches.length;
            });
            
            if (contador > 0) {
                temasPrincipales.push({
                    nombre: tema.nombre,
                    relevancia: contador
                });
            }
        });
        
        // Ordenar por relevancia y devolver solo los nombres
        return temasPrincipales
            .sort((a, b) => b.relevancia - a.relevancia)
            .map(tema => tema.nombre);
    },
    
    // Registrar cambios realizados para mostrar al usuario
    registrarCambios: function(textoOriginal, textoHumanizado) {
        const cambios = [];
        
        // Detectar cambios en estructura de oraciones
        const oracionesOriginales = this.dividirEnOraciones(textoOriginal);
        const oracionesHumanizadas = this.dividirEnOraciones(textoHumanizado);
        
        if (oracionesOriginales.length !== oracionesHumanizadas.length) {
            cambios.push('Se ha modificado la estructura de las oraciones para dar mayor variabilidad y naturalidad.');
        }
        
        // Detectar adición de expresiones coloquiales
        const expresionesColoquiales = [
            'pan comido', 'dar en el clavo', 'estar en las nubes', 'meter la pata',
            'echar una mano', 'costar un ojo de la cara', 'ponerse las pilas',
            'en un abrir y cerrar de ojos', 'estar hasta las narices'
        ];
        
        let contadorColoquiales = 0;
        expresionesColoquiales.forEach(expr => {
            const regex = new RegExp('\\b' + expr + '\\b', 'gi');
            if (regex.test(textoHumanizado) && !regex.test(textoOriginal)) {
                contadorColoquiales++;
            }
        });
        
        if (contadorColoquiales > 0) {
            cambios.push(`Se han añadido ${contadorColoquiales} expresiones coloquiales para dar mayor naturalidad al texto.`);
        }
        
        // Detectar marcas de oralidad
        const marcasOralidad = [
            'la verdad', 'sinceramente', 'a decir verdad', 'honestamente',
            'francamente', 'en realidad', 'por así decirlo', '¿sabes?',
            '¿entiendes?', '¿me explico?', '¿no crees?'
        ];
        
        let contadorOralidad = 0;
        marcasOralidad.forEach(marca => {
            const regex = new RegExp('\\b' + marca + '\\b', 'gi');
            const matchesOriginal = textoOriginal.match(regex) || [];
            const matchesHumanizado = textoHumanizado.match(regex) || [];
            contadorOralidad += Math.max(0, matchesHumanizado.length - matchesOriginal.length);
        });
        
        if (contadorOralidad > 0) {
            cambios.push(`Se han introducido ${contadorOralidad} marcas de oralidad para simular el habla natural.`);
        }
        
        // Detectar referencias personales
        if (textoHumanizado.includes('mi experiencia') || 
            textoHumanizado.includes('he podido') || 
            textoHumanizado.includes('mi punto de vista') ||
            textoHumanizado.includes('personalmente')) {
            cambios.push('Se han añadido referencias personales para dar un toque más humano y cercano.');
        }
        
        // Detectar reducción de formalidad
        const expresionesFormales = [
            'adicionalmente', 'consecuentemente', 'subsecuentemente',
            'indudablemente', 'evidentemente', 'ciertamente',
            'considerablemente', 'fundamentalmente', 'primordialmente',
            'significativamente', 'en virtud de', 'en función de',
            'en relación con', 'en lo que respecta a', 'en lo concerniente a',
            'cabe destacar que', 'es menester', 'es imperativo'
        ];
        
        let contadorFormalidad = 0;
        expresionesFormales.forEach(expr => {
            const regex = new RegExp('\\b' + expr + '\\b', 'gi');
            const matchesOriginal = textoOriginal.match(regex) || [];
            const matchesHumanizado = textoHumanizado.match(regex) || [];
            contadorFormalidad += Math.max(0, matchesOriginal.length - matchesHumanizado.length);
        });
        
        if (contadorFormalidad > 0) {
            cambios.push(`Se ha reducido la formalidad excesiva reemplazando ${contadorFormalidad} expresiones formales por alternativas más naturales.`);
        }
        
        // Detectar inconsistencias menores
        if (textoHumanizado.includes('...') && !textoOriginal.includes('...')) {
            cambios.push('Se han añadido pequeñas autocorrecciones para simular el pensamiento humano en tiempo real.');
        }
        
        // Detectar enriquecimiento contextual
        const iniciosContextuales = [
            'Basándome en', 'Como he podido', 'Según he ido', 'Desde mi',
            'Tras reflexionar', 'Durante mis años', 'Un profesor',
            'Mi médico', 'Después de probar', 'Analizando la evolución'
        ];
        
        let enriquecimientoDetectado = false;
        iniciosContextuales.forEach(inicio => {
            if (textoHumanizado.includes(inicio) && !textoOriginal.includes(inicio)) {
                enriquecimientoDetectado = true;
            }
        });
        
        if (enriquecimientoDetectado) {
            cambios.push('Se ha enriquecido el texto con recursos contextuales para aumentar su credibilidad y relevancia.');
        }
        
        // Si no se detectaron cambios específicos
        if (cambios.length === 0) {
            cambios.push('Se han realizado ajustes sutiles para humanizar el texto manteniendo su significado original.');
        }
        
        return cambios;
    },
    
    // Funciones auxiliares
    
    // Dividir texto en oraciones
    dividirEnOraciones: function(text) {
        // Patrón mejorado para dividir en oraciones respetando abreviaturas comunes
        const abbreviations = /(?:[A-Za-z]\.){2,}|[A-Za-z]+\.[A-Za-z]+\.|Sra?\.|Dr\.|Prof\.|Lic\.|etc\.|p\. ej\.|Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.|etc\.|e\.g\.|i\.e\./g;
        
        // Reemplazar temporalmente abreviaturas
        let processedText = text.replace(abbreviations, match => match.replace(/\./g, '##DOT##'));
        
        // Dividir por puntos finales, signos de interrogación y exclamación
        processedText = processedText
            .replace(/([.?!])\s+(?=[A-ZÁÉÍÓÚÜÑA-Z])/g, "$1|")
            .replace(/([.?!])(?=["']?\s+[A-ZÁÉÍÓÚÜÑA-Z])/g, "$1|");
        
        // Restaurar abreviaturas
        processedText = processedText.replace(/##DOT##/g, '.');
        
        // Dividir y limpiar
        return processedText
            .split("|")
            .map(s => s.trim())
            .filter(s => s.length > 0);
    },
    
    // Encontrar un buen punto para cortar una oración
    encontrarPuntoCorte: function(oracion) {
        // Buscar después de una coma, punto y coma, o dos puntos
        const puntuacion = [',', ';', ':'];
        for (const p of puntuacion) {
            const index = oracion.indexOf(p, oracion.length / 3); // Buscar después del primer tercio
            if (index !== -1) return index + 1;
        }
        
        // Si no hay puntuación, buscar un espacio cerca de la mitad
        const mitad = Math.floor(oracion.length / 2);
        const espacio = oracion.indexOf(' ', mitad);
        if (espacio !== -1) return espacio;
        
        return -1; // No se encontró un buen punto de corte
    },
    
    // Encontrar un buen punto para insertar una digresión
    encontrarPuntoInsercion: function(oracion) {
        // Buscar después de una coma
        const indexComa = oracion.indexOf(',');
        if (indexComa !== -1 && indexComa > oracion.length / 4) return indexComa + 1;
        
        // Buscar un espacio después del primer tercio
        const tercio = Math.floor(oracion.length / 3);
        const espacio = oracion.indexOf(' ', tercio);
        if (espacio !== -1) return espacio;
        
        return -1; // No se encontró un buen punto de inserción
    }
};

// Exportar el módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = humanizer;
}
