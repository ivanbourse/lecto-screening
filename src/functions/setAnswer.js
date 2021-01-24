import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '../redux/slices/questions';

const useSetAnswer = () => {
	const dispatch = useDispatch();
	const current = useSelector(state => state.questions.current);

	const [userAnswer, setUserAnswer] = useState();

	const [startTime, setStartTime] = useState(Date.now());

	const keydownEvent = event => {
		if (event.key === 'ArrowRight') {
			dispatch(setAnswer({ correct: true, time: Date.now() - startTime, answer: userAnswer }));
		} else if (event.key === 'ArrowLeft') {
			dispatch(setAnswer({ correct: false, time: Date.now() - startTime, answer: userAnswer }));
		}
	};

	useEffect(() => setStartTime(Date.now()), [current]);

	useEffect(() => {
		window.addEventListener('keydown', keydownEvent);
		return () => {
			window.removeEventListener('keydown', keydownEvent);
		};
	}, [userAnswer]);

	useEffect(() => {
		setStartTime(Date.now());
	}, [current]);

	const setAnswerAuto = () => {
		window.removeEventListener('keydown', keydownEvent);
		// TODO: SETEAR EL CORRECT PARA VER SI ESTÁ BIEN O MAL (ver el ejercicio y comparar la respuesta)
		dispatch(setAnswer({ correct: true, time: Date.now() - startTime, answer: userAnswer }));
	};

	return [userAnswer, answer => setUserAnswer(answer), setAnswerAuto];
};

export default useSetAnswer;
