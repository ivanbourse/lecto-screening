import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer, nextQuestion } from '../redux/slices/questions';

const useSetAnswer = props => {
	const dispatch = useDispatch();
	const { current } = useSelector(state => state.questions);
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);
	const resultExercise = useSelector(state => state.dashboard.exercise);

	const [userAnswer, setUserAnswer] = useState({});
	const [startTime, setStartTime] = useState(Date.now());

	useEffect(() => {
		setStartTime(Date.now());
	}, [current]);

	const keydownEvent = async event => {
		if (event.key === 'ArrowRight') {
			await dispatch(nextQuestion({ correct: true, time: Date.now() - startTime, answer: userAnswer }));
		} else if (event.key === 'ArrowLeft') {
			await dispatch(nextQuestion({ correct: false, time: Date.now() - startTime, answer: userAnswer }));
		}
	};

	useEffect(() => {
		if (exercise.autocorrect === false && props?.registerKeydown) {
			window.addEventListener('keydown', keydownEvent);
			return () => {
				window.removeEventListener('keydown', keydownEvent);
			};
		}
	}, []);

	const submitAnswer = async answer => {
		if (props?.customTime === true) {
			await dispatch(nextQuestion({ time: answer.time, answer }));
		} else {
			await dispatch(nextQuestion({ time: Date.now() - startTime, answer: answer ?? userAnswer }));
		}
		setUserAnswer({});
	};

	return { exercise, userAnswer, setUserAnswer, submitAnswer };
};

export default useSetAnswer;
