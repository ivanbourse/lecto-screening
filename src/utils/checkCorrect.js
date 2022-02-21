const dyscalculiaCheckCorrectMap = {
	'reaction-time': () => ({ isCorrect: true, info: true }),
	'dots-comparison': (exercise, answer) => ({
		isCorrect: exercise.correct === answer.answer,
		info: { correctAnswer: exercise.correct, left: answer.number1, right: answer.number2, userAnswer: answer.answer },
	}),
	'match-points-number': (exercise, answer) => ({
		isCorrect: exercise.correct === answer.answer,
		info: { correctAnswer: exercise.correct, left: answer.number1, right: answer.number2, userAnswer: answer.answer },
	}),
	'symbolic-magnitude': (exercise, answer) => ({
		isCorrect: exercise.correct === answer.answer,
		info: { correctAnswer: exercise.correct, left: answer.number1, right: answer.number2, userAnswer: answer.answer },
	}),
	'numeric-line': (exercise, answer) => {
		// since it will (almost) never be exactly the correct answer, we have a threshold
		// and check if the user answer is between the min and the max
		const threshold = 1;
		const minValue = exercise.correct - threshold;
		const maxValue = exercise.correct + threshold;

		return { isCorrect: answer >= minValue && answer <= maxValue, info: { correctAnswer: exercise.correct } };
	},
	'simple-arithmetic': (exercise, answer) => ({
		isCorrect: exercise.correct === answer.answer,
		info: { correctAnswer: exercise.correct, left: answer.number1, right: answer.number2, userAnswer: answer.answer },
	}),
	counting: (exercise, answer) => ({ isCorrect: exercise.correct === answer, info: exercise.correct }),
	'match-sample': (exercise, answer) => ({
		isCorrect: exercise.correct === answer.answer.answer.answer,
		info: {
			correctAnswer: exercise.correct,
			first: answer.number1,
			second: answer.number2,
			userAnswer: answer.answer.answer,
		},
	}),
	'match-sample-rotate': (exercise, answer) => ({
		isCorrect: exercise.correct === answer.answer,
		info: { correctAnswer: exercise.correct, first: answer.number1, second: answer.number2, userAnswer: answer.answer },
	}),
};

const dyslexiaCheckCorrectMap = {
	'multiple-choice': (exercise, answer) => ({
		isCorrect: exercise.answers[answer.i].correct === true,
		answer: exercise.answers.filter(a => a.correct)[0],
	}),
	'letters-question': () => ({ isCorrect: true, answer: true }),
	matching: () => ({ isCorrect: true, answer: true }),
	syllables: (exercise, answer) => ({ isCorrect: exercise.syllables === answer, answer: exercise.syllables }),
	'contains-letter': (exercise, answer) => ({
		isCorrect: exercise.words[answer.i].correct === true,
		answer: exercise.words.filter(a => a.correct)[0],
	}),
	'say-items': () => ({ isCorrect: true, answer: true }),
	'match-words': (exercise, answer) => ({
		isCorrect: exercise.images[answer.i].correct === true,
		answer: exercise.images.filter(a => a.correct)[0],
	}),
	'nonexisting-words': () => ({ isCorrect: true, answer: true }),
};

const checkCorrectMap = {
	dyscalculia: dyscalculiaCheckCorrectMap,
	dyslexia: dyslexiaCheckCorrectMap,
};

export const getAnswerInfo = (testType, exercise, userAnswer) => {
	return checkCorrectMap[testType][exercise.type](exercise, userAnswer.answer);
};
