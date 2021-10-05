import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, setAnswer } from 'redux/slices/questions';

const useTest = props => {
	const dispatch = useDispatch();
	const { current } = useSelector(state => state.questions);
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);
	const resultExercise = useSelector(state => state.dashboard.exercise);

	const [userAnswer, setUserAnswer] = useState({});
	const [startTime, setStartTime] = useState(Date.now());

	useEffect(() => {
		setStartTime(Date.now());
	}, [current]);

	const submitAnswer = answer => {
		if (props?.customTime === true) {
			dispatch(nextQuestion({ time: answer.time, answer }));
		} else {
			dispatch(nextQuestion({ time: Date.now() - startTime, answer: answer ?? userAnswer }));
		}
		setUserAnswer({});
	};

	return { exercise: props?.isResult ? resultExercise : exercise, userAnswer, setUserAnswer, submitAnswer };
};

export default useTest;
