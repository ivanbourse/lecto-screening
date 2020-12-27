// 7 TIPOS

// El testeo no es mas random. Hacer un examen fijo.

const randomBetweenNumbers = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getCount = {
	exercises: [
		{
			id: 'stars',
			image:
				'https://www.mariowiki.com/images/thumb/8/8a/New_Super_Mario_Bros._U_Deluxe_Super_Star.png/1200px-New_Super_Mario_Bros._U_Deluxe_Super_Star.png',
			title: '¿Cuántas estrellas hay en pantalla?',
		},
		{
			id: 'stars',
			image:
				'https://www.mariowiki.com/images/thumb/8/8a/New_Super_Mario_Bros._U_Deluxe_Super_Star.png/1200px-New_Super_Mario_Bros._U_Deluxe_Super_Star.png',
			title: '¿Cuántas estrellas hay en pantalla?',
		},
	],
	generateForTest: () => {
		const exercisesCount = getCount.exercises.length - 1;
		const randomIndex = randomBetweenNumbers(1, exercisesCount);
		const randomItem = getCount.exercises[randomIndex];

		const randomNumberOfItems = randomBetweenNumbers(1, 9);

		const exercise = { ...randomItem, randomNumber: randomNumberOfItems };
		return { exerciseId: 'count', exercise };
	},
};

const numberOnScreen = {
	generateForTest: () => {
		const randomNumber = randomBetweenNumbers(1, 9);
		const exercise = { randomNumber };

		return { exerciseId: 'number-on-screen', exercise };
	},
};

const prevAndPostNumbers = {
	generateForTest: () => {
		const number = randomBetweenNumbers(4, 15);
		const before = number - 1;
		const after = number + 1;

		const exercise = { number, before, after };
		return { exerciseId: 'prev-post', exercise };
	},
};

const joinWithArrows = {
	items: [
		[
			{
				id: 'abeja',
				url:
					'https://images.vexels.com/media/users/3/162047/isolated/preview/fcfe168b4d2ca0b826fa6033e50894b7-abeja-ala-picadura-raya-avispa-plana-by-vexels.png',
			},
			{
				id: 'anillo',
				url:
					'https://images.vexels.com/media/users/3/157330/isolated/preview/5738bcf02568792eb201e948904bdfc7-anillo-de-diamante-vector-by-vexels.png',
			},
		],
		[
			{
				id: 'mariposa',
				url:
					'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/79de8be5-8677-4326-9fa0-1a4293a19f63/d5ukw4s-a64e9eda-1204-4532-8f60-b920a4b23eb5.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNzlkZThiZTUtODY3Ny00MzI2LTlmYTAtMWE0MjkzYTE5ZjYzXC9kNXVrdzRzLWE2NGU5ZWRhLTEyMDQtNDUzMi04ZjYwLWI5MjBhNGIyM2ViNS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.PUIqMpLjXumsvV7zwoKR1d6Y_PGakLHfWrxp427XrXo',
			},
			{
				id: 'manzana',
				url:
					'https://images.vexels.com/media/users/3/182371/isolated/preview/2f8c7e9f42c7781c3846b435475f92af-fruta-de-manzana-plana-by-vexels.png',
			},
		],
		[
			{
				id: 'pelota',
				url:
					'https://images.vexels.com/media/users/3/158408/isolated/preview/c605be7e04b1572a7af6fe3ee646510b-pelota-de-f-tbol-pent--gono-ilustraci--n-by-vexels.png',
			},
			{
				id: 'pera',
				url: 'https://www.kindpng.com/picc/m/77-773040_pera-peras-verdes-frutas-los-alimentos-saludable-hd.png',
			},
		],
		[
			{
				id: 'elefante',
				url:
					'https://images.vexels.com/media/users/3/140127/isolated/preview/63c85015331e4798842f47ffbe7189f9-dibujos-animados-de-elefantes-by-vexels.png',
			},
			{
				id: 'escalera',
				url:
					'https://static.wikia.nocookie.net/clubpenguin/images/1/18/Escalera_de_Madera_iconoo.png/revision/latest?cb=20150608001933&path-prefix=es',
			},
		],
	],
	generateForTest: () => {
		const pair = [];
		for (let i = 0; i < 2; i++) {
			const randomIndex = randomBetweenNumbers(0, joinWithArrows.items.length - 1);
			const randomItem = joinWithArrows.items[randomIndex];
			pair.push(randomItem);
		}
		return { exerciseId: 'join-with-arrows', exercise: { pair } };
	},
};

const splitSyllables = {
	exercises: [
		{
			id: 'vaca',
			word: 'vaca',
			image: 'https://www.clipartkey.com/mpngs/m/196-1968975_transparent-vaca-png-parts-of-cow-in-english.png',
			splitted: ['va', 'ca'],
		},
		{
			id: 'hombre',
			word: 'hombre',
			image:
				'https://images.vexels.com/media/users/3/206100/isolated/preview/a67544b402e29ef40797db1f6a205b7d-hombre-con-las-manos-en-el-personaje-de-bolsillo-by-vexels.png',
			splitted: ['hom', 'bre'],
		},
	],
	generateForTest: () => {
		const randomIndex = randomBetweenNumbers(0, splitSyllables.exercises.length - 1);
		const randomItem = splitSyllables.exercises[randomIndex];

		return { exerciseId: 'split-syllables', exercise: randomItem };
	},
};

const writeTheLetter = {
	exercises: [
		{
			id: 'A',
			letter: 'A',
			audio: 'http://sonidosmp3gratis.com/sounds/alphabet-a.mp3',
		},
		{
			id: 'B',
			letter: 'B',
			audio: 'http://sonidosmp3gratis.com/sounds/alphabet-b.mp3',
		},
		{
			id: 'C',
			letter: 'C',
			audio: 'http://sonidosmp3gratis.com/sounds/alphabet-c.mp3',
		},
	],
	generateForTest: () => {
		const randomIndex = randomBetweenNumbers(0, writeTheLetter.exercises.length - 1);
		const randomItem = writeTheLetter.exercises[randomIndex];

		return { exerciseId: 'write-letter', exercise: randomItem };
	},
};

const drawTheWord = {
	exercises: [
		{
			id: 'humano',
			word: 'Humano',
			//! preguntar qué más necesitaríamos
		},
		{
			id: 'vaca',
			word: 'Vaca',
			//! preguntar qué más necesitaríamos
		},
	],
	generateForTest: () => {
		const randomIndex = randomBetweenNumbers(0, drawTheWord.exercises.length - 1);
		const randomItem = drawTheWord.exercises[randomIndex];

		return { exerciseId: 'draw-word', exercise: randomItem };
	},
};

export const exercisesInfo = {
	count: {
		instructions: ['Hacé click en el número que sea correcto'],
	},
	'number-on-screen': {
		title: '¿Cuál es el número que está en pantalla?',
		instructions: ['Hacé click en el botón de abajo y decí el número en voz alta (el reconocimiento solo funciona en Chrome)'],
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

	for (let i = 0; i < exercisesPerType; i++) {
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
		//* SEPTIMO EJERCICIO: DIBUJAR LAS PALABRAS
		finalTest.push(drawTheWord.generateForTest());
	}
	// Randomizar el orden
	finalTest.sort((a, b) => 0.5 - Math.random());

	return finalTest;
};
