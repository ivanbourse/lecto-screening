const dyscalculiaCheckCorrectMap = {
	'reaction-time': () => ({ isCorrect: true, answer: true }),
	'dots-comparison': (exercise, answer) => ({ isCorrect: exercise.correct === answer, answer: exercise.correct }),
	'match-points-number': (exercise, answer) => ({ isCorrect: exercise.correct === answer, answer: exercise.correct }),
	'symbolic-magnitude': (exercise, answer) => ({ isCorrect: exercise.correct === answer, answer: exercise.correct }),
	'numeric-line': (exercise, answer) => {
		// since it will (almost) never be exactly the correct answer, we have a threshold
		// and check if the user answer is between the min and the max
		const threshold = 1;
		const minValue = exercise.correct - threshold;
		const maxValue = exercise.correct + threshold;

		return { isCorrect: answer >= minValue && answer <= maxValue, answer: exercise.correct };
	},
	'simple-arithmetic': (exercise, answer) => ({ isCorrect: exercise.correct === answer, answer: exercise.correct }),
	counting: (exercise, answer) => ({ isCorrect: exercise.correct === answer, answer: exercise.correct }),
	'match-sample': (exercise, answer) => ({ isCorrect: exercise.correct === answer.answer, answer: exercise.correct }),
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

export const checkIfIsCorrect = (testType, exercise, userAnswer) => {
	return checkCorrectMap[testType][exercise.type](exercise, userAnswer.answer);
};
