// 7 TIPOS

// El testeo no es mas random. Hacer un examen fijo.

import JSONTest from './flattened';

const randomBetweenNumbers = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const exercisesInfo = {
	count: {
		instructions: ['Hacé click en el número que sea correcto'],
	},
	'number-on-screen': {
		title: '¿Cuál es el número que está en pantalla?',
		instructions: [
			'Hacé click en el botón de abajo y decí el número en voz alta (el reconocimiento solo funciona en Chrome)',
		],
	},
	'prev-post': {
		title: '¿Cuales son el anterior y el posterior de este número?',
		instructions: ['Hacé click en los cuadrados y escribí el número que corresponda'],
	},
	'join-with-arrows': {
		title: 'Uní con flechas los dibujos que empiecen con el mismo sonido',
		instructions: ['Arrastrá el mouse haciendo click desde un dibujo hasta otro que empiece con el mismo sonido'],
	},
	'split-syllables': {
		title: 'Separá las siguientes palabras en sílabas',
		instructions: ['Escribí un guión (-) en donde se separan las sílabas'],
	},
	'write-letter': {
		title: 'Escribí la letra que escuchás',
		instructions: ['Apretá el botón de abajo para escuchar la letra', 'Escribí la letra que escuchás acá'],
	},
	'draw-word': {
		title: 'Dibujá la palabra que está en pantalla',
	},
};

export const generateTest = (exercisesPerType = 2) => {
	const finalTest = [];
	/* for (let i = 0; i < exercisesPerType; i++) {
		//* PRIMER EJERCICIO: GET COUNT
		finalTest.push(getCount.generateForTest());
		//* SEGUNDO EJERCICIO: NUMERO EN PANTALLA
		finalTest.push(numberOnScreen.generateForTest());
		//* TERCER EJERCICIO: NUMERO ANTERIOR Y POSTERIOR
		finalTest.push(prevAndPostNumbers.generateForTest());
		//* CUARTO EJERCICIO: UNIR CON FLECHAS
		finalTest.push(joinWithArrows.generateForTest());
		//* QUINTO EJERCICIO: SEPARAR EN SÍLABAS
		finalTest.push(splitSyllables.generateForTest());
		//* SEXTO EJERCICIO: ESCRIBIR LA LETRA
		finalTest.push(writeTheLetter.generateForTest());
	}
	// Randomizar el orden
	finalTest.sort((a, b) => 0.5 - Math.random()); */
};
