import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer, nextQuestion } from '../redux/slices/questions';

const useSetAnswer = () => {
	const dispatch = useDispatch();
	const current = useSelector(state => state.questions.current);
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	const [userAnswer, setUserAnswer] = useState({});
	const [startTime, setStartTime] = useState(Date.now());

	const correctsObject = {
		counting: selected => true,
		'gap-question': selected => selected === exercise.exercise.number,
		'multiple-choice': selected => exercise.exercise.answers[selected.i].correct === true,
		'prev-next': selected =>
			selected.previous === exercise.exercise.number - 1 && selected.posterior === exercise.exercise.number + 1,
		'letters-question': selected => false,
		matching: selected => true,
		syllables: selected => selected === exercise.exercise.syllables,
		'read-alloud': selected => selected === exercise.exercise.number,
	};

	const keydownEvent = event => {
		if (event.key === 'ArrowRight') {
			dispatch(setAnswer({ correct: true, time: Date.now() - startTime, answer: userAnswer }));
		} else if (event.key === 'ArrowLeft') {
			dispatch(setAnswer({ correct: false, time: Date.now() - startTime, answer: userAnswer }));
		}
	};

	useEffect(() => {
		if (exercise.autocorrect === false) {
			window.addEventListener('keydown', keydownEvent);
			return () => {
				window.removeEventListener('keydown', keydownEvent);
			};
		}
	}, []);

	useEffect(() => {
		setStartTime(Date.now());
	}, [current]);

	const setAnswerAuto = () => {
		//window.removeEventListener('keydown', keydownEvent);

		if (exercise.autocorrect === true) {
			const isCorrect = correctsObject[exercise.type](userAnswer);
			dispatch(setAnswer({ correct: isCorrect, time: Date.now() - startTime, answer: userAnswer }));
		}
		setUserAnswer({});
		dispatch(nextQuestion());
	};

	return [userAnswer, answer => setUserAnswer(answer), setAnswerAuto];
};

export default useSetAnswer;
