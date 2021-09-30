export const randomValueBetweenTwoNumbers = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

export const randomBetweenMinMax = ({ min, max }) => {
	const number1 = randomValueBetweenTwoNumbers(min, max + 1);
	let number2 = number1;

	while (number1 === number2) {
		number2 = randomValueBetweenTwoNumbers(min, max + 1);
	}

	return { number1, number2 };
};

const getRandomOption = (a, b) => {
	return Math.random() > 0.5 ? a : b;
};

const randomGenerators = {
	'reaction-time': ({ min, max }) => {
		// generate random value for the position of the dot on screen
		// with paddings so that it doesn't appear on corners of the screen

		const positionX = randomValueBetweenTwoNumbers(0, 100);
		const positionY = randomValueBetweenTwoNumbers(0, 100);

		const position = [positionX + '%', positionY + '%'];

		const randomDelay = randomValueBetweenTwoNumbers(1000, 3000);

		return { correct: true, value: { position, randomDelay } };
	},
	'dots-comparison': ({ min, max }) => {
		const randomValues = randomBetweenMinMax({ min, max });
		const biggerValue = randomValues.number1 > randomValues.number2 ? randomValues.number1 : randomValues.number2;
		return { correct: biggerValue, value: randomValues };
	},
	'match-points-number': ({ min, max }) => {
		const sameNumbers = getRandomOption(true, false);
		if (sameNumbers) {
			const randomNumber = randomValueBetweenTwoNumbers(min, max + 1);
			const value = { number1: randomNumber, number2: randomNumber };
			return { correct: true, value };
		}
		const randomValues = randomBetweenMinMax({ min, max });
		return { correct: false, value: randomValues };
	},
	'symbolic-magnitude': ({ min, max }) => {
		const randomValues = randomBetweenMinMax({ min, max });
		const biggerValue = randomValues.number1 > randomValues.number2 ? randomValues.number1 : randomValues.number2;
		return { correct: biggerValue, value: randomValues };
	},
	'numeric-line': ({ min, max }) => {
		const value = randomValueBetweenTwoNumbers(min, max);
		return { correct: value, value };
	},
	'simple-arithmetic': ({ uid }) => {
		// possible values are 1, 2, 3 or 4 so the result is always a one-digit number
		const value1 = randomValueBetweenTwoNumbers(1, 5);
		const value2 = randomValueBetweenTwoNumbers(1, 5);

		const operationFunctions = {
			plus: (a, b) => a + b,
			minus: (a, b) => a - b,
		};

		const operationToText = {
			plus: '+',
			minus: '-',
		};

		if (uid === 'minus' && value2 > value1) {
			const sumText = `${value2} ${operationToText[uid]} ${value1} = ?`;
			const correct = operationFunctions[uid](value2, value1);

			return { value: sumText, correct };
		}

		const sumText = `${value1} ${operationToText[uid]} ${value2} = ?`;
		const correct = operationFunctions[uid](value1, value2);

		return { value: sumText, correct };
	},
	counting: ({ min, max, uid }) => {
		const randomNumber = randomValueBetweenTwoNumbers(min, max);

		let values = [];
		if (uid) {
			values = [randomNumber + 2, randomNumber + 1, randomNumber];
		} else {
			values = [randomNumber - 2, randomNumber - 1, randomNumber];
		}
		return { correct: randomNumber, values };
	},
	'match-sample': ({ min, max }) => {
		const isTheSame = getRandomOption(true, false);

		const randomNumber1 = randomValueBetweenTwoNumbers(min, max);
		let randomNumber2;
		if (isTheSame) {
			randomNumber2 = randomNumber1;
		} else {
			if (randomNumber1 === min) {
				randomNumber2 = randomNumber1 + 1;
			} else if (randomNumber1 === max) {
				randomNumber2 = randomNumber1 - 1;
			} else {
				const plusOne = getRandomOption(true, false);
				randomNumber2 = plusOne ? randomNumber1 + 1 : randomNumber1 - 1;
			}
		}

		return { correct: isTheSame, value: { number1: randomNumber1, number2: randomNumber2 } };
	},
	'match-sample-rotate': ({ min, max, minRotation, maxRotation }) => {
		const isTheSame = getRandomOption(true, false);

		const randomNumber1 = randomValueBetweenTwoNumbers(min, max);
		let randomNumber2;
		if (isTheSame) {
			randomNumber2 = randomNumber1;
		} else {
			if (randomNumber1 === min) {
				randomNumber2 = randomNumber1 + 1;
			} else if (randomNumber1 === max) {
				randomNumber2 = randomNumber1 - 1;
			} else {
				const plusOne = getRandomOption(true, false);
				randomNumber2 = plusOne ? randomNumber1 + 1 : randomNumber1 - 1;
			}
		}

		const rotation = randomValueBetweenTwoNumbers(minRotation, maxRotation);

		return { correct: isTheSame, value: { number1: randomNumber1, number2: randomNumber2, rotation } };
	},
};

export async function generateTest(testInfo) {
	const testArray = [];

	if (testInfo.isRandom) {
		const { exercises, exercisesPerType, practicesPerType } = testInfo;

		// para cada ejercicio que hay en el JSON (que contiene la info del ejercicio) vamos a agregar:
		// 1 item que es la pantalla de instrucciones
		// 4 items que son ejercicios de prueba
		// 10 items que son ejercicios de verdad, que son los que se mandan al server
		for (let exerciseInfo of exercises) {
			// agregar pantalla de instrucciones
			testArray.push({ screenType: 'instructions', ...exerciseInfo });

			// agregar ejercicios de prueba
			for (let i = 0; i < practicesPerType; i++) {
				const randomValue = randomGenerators[exerciseInfo.type](exerciseInfo);
				testArray.push({ screenType: 'practice', ...exerciseInfo, ...randomValue });
				testArray.push({ screenType: 'practice-feedback', ...exerciseInfo, ...randomValue });
			}

			testArray.push({ screenType: 'practice-finish', ...exerciseInfo });

			// agregar ejercicios de verdad
			for (let i = 0; i < exercisesPerType; i++) {
				const randomValue = randomGenerators[exerciseInfo.type](exerciseInfo);
				testArray.push({ screenType: 'exercise', ...exerciseInfo, ...randomValue });
			}

			testArray.push({ screenType: 'exercise-finish', ...exerciseInfo });
		}
	} else {
		const { exercises } = testInfo;

		for (let exerciseInfo of exercises) {
			const { exercises, ...info } = exerciseInfo;
			testArray.push({ screenType: 'instructions', ...info });

			exercises.forEach(realExercise => {
				if (realExercise.screenType === 'practice') {
					testArray.push({ screenType: 'practice', ...info, ...realExercise });
					testArray.push({ ...info, ...realExercise, screenType: 'practice-feedback' });
				} else {
					testArray.push({ ...realExercise, type: exerciseInfo.type });
				}
			});

			testArray.push({ screenType: 'exercise-finish', ...exerciseInfo });
		}
	}

	return testArray;
}
