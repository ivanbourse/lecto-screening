const defaultFunction = exercises => {
	let count = 0;
	exercises.forEach(({ answer }) => answer.correct.isCorrect && count++);
	return count;
};

export const correctCountMap = {
	'multiple-choice': defaultFunction,
	'letters-question': exercises => {
		let count = 0;

		const lastExercise = exercises[exercises.length - 1];
		lastExercise.answer.answer.forEach(({ correct }) => correct && count++);

		return count;
	},
	matching: exercises => {
		let count = 0;

		exercises.forEach(({ answer }) => answer.answer.forEach(({ correct }) => correct && count++));

		return count;
	},
	'contains-letter': defaultFunction,
	syllables: defaultFunction,
	'say-items': exercises => {
		return exercises[exercises.length - 1].answer.answer;
	},
	'match-words': defaultFunction,
	'nonexisting-words': exercises => {
		let count = 0;

		const lastExercise = exercises[exercises.length - 1];
		lastExercise.answer.answer.forEach(({ correct }) => correct && count++);

		return count;
	},
	'reaction-time': exercises => {
		let count = 0;

		// get average
		const average = exercises.reduce((acc, { answer }) => acc + answer.answer.time, 0) / exercises.length;
		count = average;

		return count;
	},
	'dots-comparison': defaultFunction,
	'match-points-number': defaultFunction,
	'symbolic-magnitude': defaultFunction,
	'numeric-line': defaultFunction,
	'simple-arithmetic': defaultFunction,
	counting: defaultFunction,
	'match-sample': defaultFunction,
	'match-sample-rotate': defaultFunction,
};
