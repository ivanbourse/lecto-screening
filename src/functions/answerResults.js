export const stateToWords = {
	risk: 'en riesgo',
	good: 'bueno',
	decent: 'decente'
}

export const textForTypeOfExercise = {
	'letters-question': {
		text: ({ name, answerResult }) => {
			const [letterNames, letterSounds] = answerResult.incorrect;

			const correctLetterNames = letterNames.answer.filter(letter => letter.correct === true).length;
			const correctLetterSounds = letterSounds.answer.filter(letter => letter.correct === true).length;

			return (
				<li>
					<h5>Prueba de conocimiento alfabético</h5>
					<p className='text'>
						El conocimiento del nombre de las letras y de la correspondencia grafema – fonema, es un excelente predictor
						del aprendizaje de la lectura. El sonido de las letras está relacionado con el procesamiento fonológico,
						mientras que el nombre de las letras correlaciona con el procesamiento ortográfico en la escritura.
					</p>
					<p className='text'>
						{name} logró nombrar {correctLetterNames} letras correctamente, indicando que su rendimiento es{' '}
						<b>{stateToWords[answerResult.state]}</b> en comparación con chicos de su edad cronológica. Asimismo, logró evocar{' '}
						{correctLetterSounds} sonidos correspondientes (nombrar cuales) mostrando un rendimiento{' '}
						<b>{stateToWords[answerResult.state]}</b>.
					</p>
				</li>
			);
		},
	},
	matching: {
		text: ({ name, answerResult }) => {
			return (
				<li>
					<h5>Prueba de conciencia fonológica</h5>
					<p className='text'>
						Esta prueba evalúa la habilidad para identificar las unidades más pequeñas del lenguaje oral, siendo
						fundamental para lograr una correcta adquisición de la lectoescritura. {name} logró identificar{' '}
						{answerResult.correct.length}/5 sonidos iniciales de las palabras presentadas, indicando que su rendimiento
						es <b>{stateToWords[answerResult.state]}</b> en comparación con chicos de su edad cronológica.
					</p>
				</li>
			);
		},
	},
	syllables: {
		text: ({ name, answerResult }) => {
			return (
				<li>
					<h5>Prueba de conciencia silábica</h5>
					<p className='text'>
						La conciencia silábica es la habilidad para identificar las sílabas que componen una palabra, es el primer
						nivel de conciencia fonológica que lo chicos deberían adquirir como buen predictor de la habilidad de
						lectoescritura.
					</p>
					<p className='text'>
						{name} logró separar {answerResult.correct.length}/5 palabras en silabas, indicando que su rendimiento es{' '}
						<b>{stateToWords[answerResult.state]}</b> en comparación con chicos de su edad cronológica.
					</p>
				</li>
			);
		},
	},
	'multiple-choice': {
		text: ({ name, answerResult }) => {
			return (
				<li>
					<h5>Prueba de vocabulario</h5>
					<p className='text'>
						El vocabulario se refiere al conjunto de palabras que se deben conocer para comunicarse de forma efectiva.
						Que un chico presente una buena capacidad de vocabulario expresivo y comprensivo, indicaría una buena
						comprensión lectora.
					</p>
					<p className='text'>
						{name} logró responder {answerResult.correct.length}/7 preguntas de forma correcta, indicando que su
						rendimiento es <b>{stateToWords[answerResult.state]}</b> en comparación con chicos de su edad cronológica.
					</p>
				</li>
			);
		},
	},
	'gap-question': {
		text: ({ name, answerResult }) => {
			return (
				<li>
					<h5>Prueba de conteo en voz alta</h5>
					<p className='text'>
						Esta prueba evalúa el conocimiento de la secuencia numérica y la ordinalidad de los números. Que un chico
						logre contar en voz alta correctamente es fundamental para una eficaz adquisición de las habilidades
						matemáticas.
					</p>
					<p className='text'>
						{name} logró contar eficazmente hasta el número {answerResult.correct.length}, indicando que su rendimiento
						es <b>{stateToWords[answerResult.state]}</b> en comparación con chicos de su edad cronológica.
					</p>
				</li>
			);
		},
	},
	counting: {
		text: ({ name, answerResult }) => {
			return (
				<li>
					<h5>Prueba de conteo termino a termino</h5>
					<p className='text'>
						Aprender a contar requiere de la adquisición simultanea del nombre de los números y el valor que cada uno de
						esos números tiene dentro de la recta numérica, siendo sustancial para el desarrollo de las habilidades
						matemáticas.
					</p>
					<p className='text'>
						{name} logró contar {answerResult.correct.length}/5 conjuntos de objetos correctamente, indicando que su
						rendimiento es <b>{stateToWords[answerResult.state]}</b> en comparación con chicos de su edad cronológica.
					</p>
				</li>
			);
		},
	},
	'letters-question-2': {
		text: ({ name, answerResult }) => {
			return (
				<li>
					<h5>Prueba de reconocimiento de número</h5>
					<p className='text'>
						Reconocer el nombre de los números e identificarlos en formato simbólico ha sido demostrado como buen
						predictor de la adquisición de las habilidades básicas en matemática.
					</p>
					<p className='text'>
						{name} logró identificar {answerResult.correct.length}/9 números correctamente, indicando que su rendimiento
						es <b>{stateToWords[answerResult.state]}</b> en comparación con chicos de su edad cronológica.
					</p>
				</li>
			);
		},
	},
	'multiple-choice-2': {
		text: ({ name, answerResult }) => {
			return (
				<li>
					<h5>Prueba de comparación numérica</h5>
					<p className='text'>
						La comparación numérica permite a los niños comparar distintas magnitudes y saber que los números simbólicos
						representan cantidades. Investigaciones han demostrado que dificultades en la adquisición de esta capacidad
						es un buen precursor de compromiso en el desarrollo de las habilidades matemáticas.
					</p>
					<p className='text'>
						{name} logró contar {answerResult.correct.length}/5 conjuntos de objetos correctamente, indicando que su
						rendimiento es <b>{stateToWords[answerResult.state]}</b> en comparación con chicos de su edad cronológica.
					</p>
				</li>
			);
		},
	},
	'prev-next': {
		text: ({ name, answerResult }) => {
			return (
				<li>
					<h5>Prueba de secuencia numérica</h5>
					<p className='text'>
						Se ha comprobado que el dominio de la línea numérica refuerza las habilidades de conteo y facilita el
						desarrollo de posibles habilidades aritméticas.
					</p>
					<p className='text'>
						{name} logró completar {answerResult.correct.length}/10 números correctamente, indicando que su rendimiento
						es <b>{stateToWords[answerResult.state]}</b> en comparación con chicos de su edad cronológica.
					</p>
				</li>
			);
		},
	},
	'gap-question-2': {
		text: ({ name, answerResult }) => {
			return (
				<li>
					<h5>Prueba de subitización</h5>
					<p className='text'>
						La subitización es la capacidad para determinar la cantidad de manera rápida y exacta pequeños conjuntos
						menores de cuatro elementos. Esta habilidad es fundamental en niños pequeños, mostrando repercusiones en la
						futura comprensión del número.
					</p>
					<p className='text'>
						{name} logró subitizar {answerResult.correct.length}/3 conjuntos de números correctamente, indicando que su
						rendimiento es <b>{stateToWords[answerResult.state]}</b> en comparación con chicos de su edad cronológica.
					</p>
				</li>
			);
		},
	},
	'multiple-choice-3': {
		text: ({ name, answerResult }) => {
			return (
				<li>
					<h5>Prueba de estimación de cantidad</h5>
					<p className='text'>
						La habilidad de estimación permite determinar cuántos elementos componen un conjunto de manera aproximada.
						Esta capacidad de la que disponen los niños para detectar el número de elementos que componen un conjunto ha
						demostrado ser un buen predictor del rendimiento en matemáticas.
					</p>
					<p className='text'>
						{name} logró estimar {answerResult.correct.length}/3 conjuntos de números correctamente, indicando que su
						rendimiento es <b>{stateToWords[answerResult.state]}</b> en comparación con chicos de su edad cronológica.
					</p>
				</li>
			);
		},
	},
};
