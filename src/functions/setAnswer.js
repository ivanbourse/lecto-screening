import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '../redux/slices/questions';

let startTime = Date.now();

const useSetAnswer = () => {

	const dispatch = useDispatch();
	const current = useSelector(state => state.questions.current);
	const [userAnswer, setUserAnswer] = useState();

	const keydownEvent = event => {
		if (event.key === 'ArrowRight')
			dispatch(setAnswer({ correct: true, time: Date.now() - startTime, answer: userAnswer }));
		else if (event.key === 'ArrowLeft')
			dispatch(setAnswer({ correct: false, time: Date.now() - startTime, answer: userAnswer }));
	};

	useEffect(() => {startTime = Date.now(); console.log(Date.now())}, [current]);

	useEffect(() => {
		window.addEventListener('keydown', keydownEvent);
		return () => window.removeEventListener('keydown', keydownEvent);
	}, [userAnswer]);

	return answer => setUserAnswer(answer);
};

export default useSetAnswer;
