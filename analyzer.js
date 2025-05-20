// Controlador principal para la interfaz de usuario
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const clearBtn = document.getElementById('clear-btn');
    const charCount = document.getElementById('char-count');
    const resultsSection = document.getElementById('results-section');
    const loadingContainer = document.getElementById('loading-container');
    const resultsContainer = document.getElementById('results-container');
    const sampleAiBtn = document.getElementById('sample-ai');
    const sampleHumanBtn = document.getElementById('sample-human');
    const sampleMixedBtn = document.getElementById('sample-mixed');
    
    // Crear favicon para evitar error 404
    createFavicon();

    // Actualizar contador de caracteres
    textInput.addEventListener('input', () => {
        const count = textInput.value.length;
        charCount.textContent = count;
    });

    // Manejar clic en botón de análisis
    analyzeBtn.addEventListener('click', () => {
        const text = textInput.value.trim();
        const currentLang = localStorage.getItem('preferred-language') || 'es';
        
        // Validar longitud mínima
        if (text.length < 100) {
            alert(translations[currentLang].minCharsWarning);
            return;
        }
        
        // Mostrar pantalla de carga
        resultsSection.style.display = 'block';
        loadingContainer.style.display = 'flex';
        resultsContainer.style.display = 'none';
        
        // Simular delay de 10 segundos como solicitado
        setTimeout(() => {
            // Analizar texto
            const results = metrics.analyzeText(text);
            
            // Guardar resultados para posible recuperación
            saveResults(results);
            
            // Mostrar resultados
            displayResults(results, currentLang);
            
            // Ocultar carga y mostrar resultados
            loadingContainer.style.display = 'none';
            resultsContainer.style.display = 'block';
            
            // Desplazar a resultados
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }, 10000); // 10 segundos de delay
    });
    
    // Manejar clic en botón de borrar
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            // Limpiar el área de texto
            textInput.value = '';
            charCount.textContent = '0';
            
            // Ocultar sección de resultados si está visible
            if (resultsSection.style.display !== 'none') {
                resultsSection.style.display = 'none';
            }
            
            // Enfocar el área de texto para nueva entrada
            textInput.focus();
            
            // Limpiar resultados guardados
            localStorage.removeItem('last-analysis-results');
        });
    }

    // Manejar textos de ejemplo
    sampleAiBtn.addEventListener('click', () => {
        textInput.value = getSampleText('ai');
        charCount.textContent = textInput.value.length;
    });
    
    sampleHumanBtn.addEventListener('click', () => {
        textInput.value = getSampleText('human');
        charCount.textContent = textInput.value.length;
    });
    
    sampleMixedBtn.addEventListener('click', () => {
        textInput.value = getSampleText('mixed');
        charCount.textContent = textInput.value.length;
    });
    
    // Añadir botón de nuevo análisis en la sección de resultados
    addNewAnalysisButton();
});

// Función para crear favicon dinámicamente
function createFavicon() {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">🤖</text></svg>';
    document.head.appendChild(link);
}

// Función para añadir botón de nuevo análisis
function addNewAnalysisButton() {
    document.addEventListener('DOMContentLoaded', () => {
        const resultsContainer = document.getElementById('results-container');
        if (!resultsContainer) return;
        
        // Verificar si ya existe el botón
        if (document.getElementById('new-analysis-btn')) return;
        
        // Crear botón de nuevo análisis
        const newAnalysisBtn = document.createElement('button');
        newAnalysisBtn.id = 'new-analysis-btn';
        newAnalysisBtn.classList.add('primary-btn');
        newAnalysisBtn.innerHTML = '<i class="fas fa-redo"></i> Nuevo análisis';
        
        // Añadir evento al botón
        newAnalysisBtn.addEventListener('click', () => {
            // Ocultar sección de resultados
            const resultsSection = document.getElementById('results-section');
            if (resultsSection) {
                resultsSection.style.display = 'none';
            }
            
            // Limpiar el área de texto
            const textInput = document.getElementById('text-input');
            if (textInput) {
                textInput.value = '';
                textInput.focus();
                
                // Actualizar contador de caracteres
                const charCount = document.getElementById('char-count');
                if (charCount) {
                    charCount.textContent = '0';
                }
            }
            
            // Desplazar al inicio de la página
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Añadir botón al final del contenedor de resultados
        resultsContainer.appendChild(newAnalysisBtn);
    });
    
    // Si el DOM ya está cargado, ejecutar inmediatamente
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        const resultsContainer = document.getElementById('results-container');
        if (!resultsContainer) return;
        
        // Verificar si ya existe el botón
        if (document.getElementById('new-analysis-btn')) return;
        
        // Crear botón de nuevo análisis
        const newAnalysisBtn = document.createElement('button');
        newAnalysisBtn.id = 'new-analysis-btn';
        newAnalysisBtn.classList.add('primary-btn');
        newAnalysisBtn.innerHTML = '<i class="fas fa-redo"></i> Nuevo análisis';
        
        // Añadir evento al botón
        newAnalysisBtn.addEventListener('click', () => {
            // Ocultar sección de resultados
            const resultsSection = document.getElementById('results-section');
            if (resultsSection) {
                resultsSection.style.display = 'none';
            }
            
            // Limpiar el área de texto
            const textInput = document.getElementById('text-input');
            if (textInput) {
                textInput.value = '';
                textInput.focus();
                
                // Actualizar contador de caracteres
                const charCount = document.getElementById('char-count');
                if (charCount) {
                    charCount.textContent = '0';
                }
            }
            
            // Desplazar al inicio de la página
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Añadir botón al final del contenedor de resultados
        resultsContainer.appendChild(newAnalysisBtn);
    }
}

// Función para mostrar resultados
function displayResults(results, lang) {
    // Asegurarse de que los elementos existen antes de manipularlos
    const gaugeFill = document.getElementById('gauge-fill');
    const gaugePercentage = document.getElementById('gauge-percentage');
    const aiProbability = document.getElementById('ai-probability');
    const scoreSummary = document.getElementById('score-summary');
    const comparisonTbody = document.getElementById('comparison-tbody');
    const metricsGrid = document.getElementById('metrics-grid');
    const sentenceContainer = document.getElementById('sentence-container');
    
    // Verificar que todos los elementos necesarios existen
    if (!gaugeFill || !gaugePercentage || !aiProbability || !scoreSummary || 
        !comparisonTbody || !metricsGrid || !sentenceContainer) {
        console.error('Elementos necesarios no encontrados en el DOM');
        return;
    }
    
    // Animar llenado del medidor
    gaugeFill.style.height = `${results.aiProbability}%`;
    gaugePercentage.textContent = `${results.aiProbability}%`;
    aiProbability.textContent = `${results.aiProbability}%`;
    
    // Actualizar texto de resumen
    if (results.aiProbability > 50) {
        scoreSummary.textContent = translations[lang].aiProbability.replace('{0}', results.aiProbability);
    } else {
        const humanProb = 100 - results.aiProbability;
        scoreSummary.textContent = translations[lang].humanProbability.replace('{0}', humanProb);
    }
    
    // Añadir explicación detallada
    if (results.explanations && results.explanations.summary) {
        const explanationDiv = document.createElement('div');
        explanationDiv.classList.add('explanation-summary');
        explanationDiv.textContent = results.explanations.summary;
        
        // Insertar después del resumen
        scoreSummary.parentNode.insertBefore(explanationDiv, scoreSummary.nextSibling);
        
        // Añadir botón de humanización si la probabilidad de IA es alta
        if (results.aiProbability > 40) {
            const humanizeBtn = document.createElement('button');
            humanizeBtn.classList.add('secondary-btn');
            humanizeBtn.innerHTML = '<i class="fas fa-magic"></i> Humanizar texto';
            humanizeBtn.addEventListener('click', () => humanizeText(results));
            
            scoreSummary.parentNode.insertBefore(humanizeBtn, explanationDiv.nextSibling);
        }
    }
    
    // Llenar tabla de comparación
    comparisonTbody.innerHTML = '';
    
    results.platformResults.forEach(platform => {
        const row = document.createElement('tr');
        
        // Celda de plataforma
        const nameCell = document.createElement('td');
        nameCell.textContent = platform.name;
        row.appendChild(nameCell);
        
        // Celda de puntuación
        const scoreCell = document.createElement('td');
        scoreCell.textContent = `${platform.score}%`;
        row.appendChild(scoreCell);
        
        // Celda de confianza
        const confidenceCell = document.createElement('td');
        const confidenceBadge = document.createElement('span');
        confidenceBadge.classList.add('confidence-badge', `confidence-${platform.confidence}`);
        
        // Traducir nivel de confianza
        if (platform.confidence === 'high') {
            confidenceBadge.textContent = translations[lang].highConfidence;
        } else if (platform.confidence === 'medium') {
            confidenceBadge.textContent = translations[lang].mediumConfidence;
        } else {
            confidenceBadge.textContent = translations[lang].lowConfidence;
        }
        
        confidenceCell.appendChild(confidenceBadge);
        row.appendChild(confidenceCell);
        
        comparisonTbody.appendChild(row);
    });
    
    // Mostrar métricas detalladas
    metricsGrid.innerHTML = '';
    
    const metricData = [
        { type: 'perplexity', value: results.metrics.perplexity },
        { type: 'burstiness', value: results.metrics.burstiness },
        { type: 'entropy', value: results.metrics.entropy },
        { type: 'coherence', value: results.metrics.coherence },
        { type: 'variety', value: results.metrics.lexicalVariety },
        { type: 'fluency', value: results.metrics.fluency },
        { type: 'relevance', value: results.metrics.relevance },
        { type: 'repetitivePatterns', value: results.metrics.repetitivePatterns },
        { type: 'errorsAndNaturalness', value: results.metrics.errorsAndNaturalness },
        { type: 'transitionAbruptness', value: results.metrics.transitionAbruptness },
        { type: 'excessiveFormality', value: results.metrics.excessiveFormality }
    ];
    
    metricData.forEach(metric => {
        const card = document.createElement('div');
        card.classList.add('metric-card');
        card.setAttribute('data-metric', metric.type);
        
        const nameElement = document.createElement('div');
        nameElement.classList.add('metric-name');
        nameElement.textContent = translations[lang][`${metric.type}Metric`] || metric.type;
        
        const valueElement = document.createElement('div');
        valueElement.classList.add('metric-value');
        valueElement.textContent = `${metric.value}/100`;
        
        const descElement = document.createElement('div');
        descElement.classList.add('metric-description');
        descElement.textContent = translations[lang][`${metric.type}Desc`] || '';
        
        // Añadir interpretación si está disponible
        if (results.explanations && results.explanations.details && results.explanations.details[metric.type]) {
            const interpretationElement = document.createElement('div');
            interpretationElement.classList.add('metric-interpretation');
            interpretationElement.textContent = results.explanations.details[metric.type].interpretation;
            
            card.appendChild(nameElement);
            card.appendChild(valueElement);
            card.appendChild(descElement);
            card.appendChild(interpretationElement);
        } else {
            card.appendChild(nameElement);
            card.appendChild(valueElement);
            card.appendChild(descElement);
        }
        
        metricsGrid.appendChild(card);
    });
    
    // Mostrar análisis por oraciones
    sentenceContainer.innerHTML = '';
    
    results.sentenceAnalysis.forEach(sentence => {
        const sentenceSpan = document.createElement('span');
        sentenceSpan.classList.add('sentence', sentence.class);
        sentenceSpan.textContent = sentence.text + ' ';
        sentenceSpan.title = `Probabilidad IA: ${sentence.aiProbability}%`;
        
        sentenceContainer.appendChild(sentenceSpan);
    });
    
    // Añadir recomendaciones si están disponibles
    if (results.explanations && results.explanations.recommendations && results.explanations.recommendations.length > 0) {
        const recommendationsContainer = document.createElement('div');
        recommendationsContainer.classList.add('recommendations-container');
        
        const recommendationsTitle = document.createElement('h3');
        recommendationsTitle.textContent = 'Recomendaciones';
        recommendationsContainer.appendChild(recommendationsTitle);
        
        const recommendationsList = document.createElement('ul');
        results.explanations.recommendations.forEach(rec => {
            const recItem = document.createElement('li');
            recItem.textContent = rec;
            recommendationsList.appendChild(recItem);
        });
        
        recommendationsContainer.appendChild(recommendationsList);
        
        // Añadir después del análisis por oraciones
        const sentenceAnalysis = document.querySelector('.sentence-analysis');
        if (sentenceAnalysis) {
            sentenceAnalysis.parentNode.insertBefore(recommendationsContainer, sentenceAnalysis.nextSibling);
        }
    }
    
    // Añadir sección para comparación con Studocu
    addStudocuComparisonSection();
    
    // Añadir botón de nuevo análisis
    addNewAnalysisButtonToResults();
}

// Función para añadir botón de nuevo análisis a los resultados
function addNewAnalysisButtonToResults() {
    const resultsContainer = document.getElementById('results-container');
    if (!resultsContainer) return;
    
    // Verificar si ya existe el botón
    if (document.getElementById('new-analysis-btn')) return;
    
    // Crear botón de nuevo análisis
    const newAnalysisBtn = document.createElement('button');
    newAnalysisBtn.id = 'new-analysis-btn';
    newAnalysisBtn.classList.add('primary-btn', 'new-analysis-btn');
    newAnalysisBtn.innerHTML = '<i class="fas fa-redo"></i> Nuevo análisis';
    
    // Añadir evento al botón
    newAnalysisBtn.addEventListener('click', () => {
        // Ocultar sección de resultados
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
        
        // Limpiar el área de texto
        const textInput = document.getElementById('text-input');
        if (textInput) {
            textInput.value = '';
            textInput.focus();
            
            // Actualizar contador de caracteres
            const charCount = document.getElementById('char-count');
            if (charCount) {
                charCount.textContent = '0';
            }
        }
        
        // Desplazar al inicio de la página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Crear contenedor para el botón
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container', 'text-center', 'mt-4');
    buttonContainer.appendChild(newAnalysisBtn);
    
    // Añadir botón al final del contenedor de resultados
    resultsContainer.appendChild(buttonContainer);
}

// Función para humanizar texto
function humanizeText(results) {
    const textInput = document.getElementById('text-input');
    const text = textInput.value.trim();
    
    // Humanizar el texto
    const humanizedResult = metrics.humanizeText(text, results.aiProbability, results.sentenceAnalysis);
    
    // Mostrar resultado humanizado
    const humanizedModal = document.createElement('div');
    humanizedModal.classList.add('humanized-modal');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('humanized-modal-content');
    
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(humanizedModal);
    });
    
    const title = document.createElement('h2');
    title.textContent = 'Texto Humanizado';
    
    const changesTitle = document.createElement('h3');
    changesTitle.textContent = 'Cambios realizados:';
    
    const changesList = document.createElement('ul');
    humanizedResult.changes.forEach(change => {
        const changeItem = document.createElement('li');
        changeItem.textContent = change;
        changesList.appendChild(changeItem);
    });
    
    const textArea = document.createElement('textarea');
    textArea.classList.add('humanized-textarea');
    textArea.value = humanizedResult.humanizedText;
    textArea.readOnly = true;
    
    const useBtn = document.createElement('button');
    useBtn.classList.add('primary-btn');
    useBtn.textContent = 'Usar este texto';
    useBtn.addEventListener('click', () => {
        textInput.value = humanizedResult.humanizedText;
        document.body.removeChild(humanizedModal);
        
        // Actualizar contador de caracteres
        const charCount = document.getElementById('char-count');
        if (charCount) {
            charCount.textContent = humanizedResult.humanizedText.length;
        }
        
        // Ocultar resultados anteriores
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
        
        // Desplazar al inicio de la página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(changesTitle);
    modalContent.appendChild(changesList);
    modalContent.appendChild(textArea);
    modalContent.appendChild(useBtn);
    
    humanizedModal.appendChild(modalContent);
    document.body.appendChild(humanizedModal);
}

// Función para añadir sección de comparación con Studocu
function addStudocuComparisonSection() {
    // Verificar si ya existe la sección
    if (document.getElementById('studocu-section')) {
        return;
    }
    
    const resultsContainer = document.getElementById('results-container');
    if (!resultsContainer) {
        return;
    }
    
    const studocuSection = document.createElement('div');
    studocuSection.id = 'studocu-section';
    studocuSection.classList.add('studocu-section');
    
    const studocuTitle = document.createElement('h3');
    studocuTitle.textContent = 'Comparación con documentos de Studocu';
    
    const studocuDescription = document.createElement('p');
    studocuDescription.textContent = 'Compara este texto con documentos existentes en Studocu para verificar originalidad.';
    
    const googleAuthBtn = document.createElement('button');
    googleAuthBtn.classList.add('google-auth-btn');
    googleAuthBtn.innerHTML = '<i class="fab fa-google"></i> Iniciar sesión con Google';
    googleAuthBtn.addEventListener('click', () => {
        alert('Esta función requiere autenticación con Google. En una implementación real, se abriría el flujo de autenticación de Google.');
    });
    
    studocuSection.appendChild(studocuTitle);
    studocuSection.appendChild(studocuDescription);
    studocuSection.appendChild(googleAuthBtn);
    
    resultsContainer.appendChild(studocuSection);
}

// Función para guardar resultados en localStorage
function saveResults(results) {
    try {
        localStorage.setItem('last-analysis-results', JSON.stringify(results));
    } catch (e) {
        console.error('Error al guardar resultados:', e);
    }
}

// Función para obtener textos de ejemplo
function getSampleText(type) {
    if (type === 'ai') {
        return `La inteligencia artificial (IA) es una rama de la informática que se enfoca en la creación de máquinas capaces de realizar tareas que normalmente requieren inteligencia humana. Estas tareas incluyen el reconocimiento de voz, la toma de decisiones, la traducción entre idiomas y la percepción visual. La IA se divide generalmente en dos categorías: IA débil o estrecha, que está diseñada para realizar una tarea específica, y la IA fuerte o general, que teóricamente podría realizar cualquier tarea intelectual que un ser humano pueda hacer.

Los avances recientes en aprendizaje automático, especialmente en redes neuronales profundas, han impulsado significativamente el campo de la IA. Estos sistemas aprenden de grandes cantidades de datos y pueden mejorar su rendimiento con el tiempo sin ser programados explícitamente para cada tarea. Aplicaciones como asistentes virtuales, vehículos autónomos y sistemas de recomendación utilizan estas tecnologías.

A pesar de estos avances, la IA también plantea desafíos éticos y sociales importantes. Preocupaciones sobre la privacidad, la seguridad, el desplazamiento laboral y la toma de decisiones algorítmicas sesgadas son temas de debate activo. Es crucial desarrollar marcos regulatorios y éticos para garantizar que la IA beneficie a la humanidad en su conjunto.`;
    } else if (type === 'human') {
        return `Anoche tuve un sueño extrañísimo que no me puedo quitar de la cabeza. Estaba en una ciudad que parecía Barcelona, pero las calles cambiaban constantemente de dirección, como si fueran ríos fluyendo. La gente caminaba normalmente, pero yo sentía que algo no encajaba.

Me encontré con mi amiga Elena, a quien no veo desde hace años, ¡pero tenía la cara de mi profesora de matemáticas del instituto! Le pregunté qué estaba pasando y me respondió algo sobre "los patrones ocultos en el pavimento". Cuando miré hacia abajo, las baldosas formaban ecuaciones que se movían y transformaban.

De repente, empezó a llover hacia arriba. Sí, ¡las gotas subían desde el suelo hacia el cielo! Todos a mi alrededor abrieron paraguas transparentes y comenzaron a flotar. Yo entré en pánico porque no tenía paraguas y mis zapatos empezaron a derretirse como si fueran de cera.

Me desperté sudando y con el corazón acelerado. ¿Qué significará? Quizás debería dejar de comer queso antes de dormir, como siempre me advierte mi abuela. O tal vez sea una señal de que necesito unas vacaciones urgentemente.`;
    } else { // mixed
        return `La inteligencia artificial está transformando nuestra sociedad de maneras que apenas comenzamos a comprender. Ayer mismo, mientras leía sobre los últimos avances en modelos de lenguaje, me quedé pensando en cómo estos sistemas están cambiando nuestra forma de comunicarnos.

Los algoritmos de aprendizaje profundo han alcanzado capacidades impresionantes en los últimos años. Pueden generar textos coherentes, imágenes realistas y hasta música que resulta indistinguible de la creada por humanos. Sin embargo, ¿realmente comprenden lo que producen? Esta pregunta me ha quitado el sueño más de una noche.

Recuerdo cuando mi hijo de 7 años me preguntó si las computadoras pueden pensar. Le respondí que depende de lo que entendamos por "pensar", y su cara de confusión me hizo darme cuenta de lo complejo que es este tema incluso para los expertos. A veces me pregunto si estamos proyectando cualidades humanas en sistemas que funcionan de manera fundamentalmente diferente.

La semana pasada asistí a una conferencia donde presentaron un sistema capaz de escribir ensayos académicos completos. La demostración fue impecable, pero durante el café, un investigador veterano me confesó sus preocupaciones sobre el futuro de la educación. "¿Cómo evaluaremos el aprendizaje cuando cualquiera pueda generar un ensayo perfecto en segundos?", me preguntó con una mezcla de fascinación y temor.`;
    }
}
