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

const randomSortWithoutConsecutiveEquals = (options, amount) => {
	let arr = options.sort(() => Math.random() - 0.5).slice(0, amount);
	if (arr.length === amount) return arr;

	let lastOption = arr[arr.length - 1];

	for (let i = 0; i <= amount - arr.length; i++) {
		let randomOption = options[randomValueBetweenTwoNumbers(0, options.length - 1)];
		while (randomOption === lastOption) randomOption = options[randomValueBetweenTwoNumbers(0, options.length - 1)];
		arr.push(randomOption);
		lastOption = randomOption;
	}

	return arr;
};

const getRandomOption = (a, b) => {
	return Math.random() > 0.5 ? a : b;
};

const randomGenerators = {
	'reaction-time': ({ min, max }) => {
		// generate random value for the position of the dot on screen
		// with paddings so that it doesn't appear on corners of the screen

		const positionX = randomValueBetweenTwoNumbers(0, 100);
		const positionY = randomValueBetweenTwoNumbers(0, 60);

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

const generateCustomOptions = {
	plus: amount => {
		let sums = [];

		const limit = 9;

		for (let i = 1; i < limit; i++) {
			for (let j = 1; i + j < limit; j++) {
				sums.push([i, j, i + j]);
			}
		}

		const randomSortedSums = randomSortWithoutConsecutiveEquals(sums, amount);

		return randomSortedSums.map(arr => ({ value: `${arr[0]} + ${arr[1]} = ?`, correct: arr[2] }));
	},
	minus: amount => {
		let substractions = [];

		for (let i = 9; i > 2; i--) {
			console.log(i);
			for (let j = 1; i - j > 0; j++) {
				substractions.push([i, j, i - j]);
			}
		}

		const randomSortedSubstractions = randomSortWithoutConsecutiveEquals(substractions, amount);

		return randomSortedSubstractions.map(arr => ({ value: `${arr[0]} - ${arr[1]} = ?`, correct: arr[2] }));
	},
	false: amount => {
		let arrays = [];

		for (let i = 1; i + 2 < 11; i++) {
			arrays.push([i, i + 1, i + 2]);
		}

		const randomSortedArrays = randomSortWithoutConsecutiveEquals(arrays, amount);
		return randomSortedArrays.map(arr => ({ correct: arr[2], values: arr }));
	},
	true: amount => {
		let arrays = [];

		for (let i = 10; i - 2 > 0; i--) {
			arrays.push([i, i - 1, i - 2]);
		}

		const randomSortedArrays = randomSortWithoutConsecutiveEquals(arrays, amount);
		return randomSortedArrays.map(arr => ({ correct: arr[2], values: arr }));
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

			if (exerciseInfo.customOptions) {
				const practiceValues = generateCustomOptions[exerciseInfo.uid](practicesPerType);
				for (let option of practiceValues) {
					testArray.push({ screenType: 'practice', ...exerciseInfo, ...option });
					testArray.push({ screenType: 'practice-feedback', ...exerciseInfo, ...option });
				}

				testArray.push({ screenType: 'practice-finish', ...exerciseInfo });

				const testValues = generateCustomOptions[exerciseInfo.uid](exercisesPerType);
				for (let option of testValues) {
					testArray.push({ screenType: 'exercise', ...exerciseInfo, ...option });
				}
			} else {
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
