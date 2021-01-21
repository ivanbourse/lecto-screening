import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAnswer } from '../redux/slices/questions';

const useSetAnswer = answer => {
	const dispatch = useDispatch();

	const [startTime, setStartTime] = useState(performance.now());
	const [endTime, setEndTime] = useState(0);

	return () => {
		window.addEventListener(
			'keydown',
			event => {
				if (event.key === 'ArrowRight') {
					setEndTime(performance.now());
					dispatch(setAnswer({ correct: true, time: startTime - endTime, answer }));
				}
				window.removeEventListener('keydown', () => {});
			},
			{ once: true }
		);
	};
};

export default useSetAnswer;
