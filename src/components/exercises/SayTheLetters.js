import React, { useEffect, useState } from 'react';
import { setAnswer } from '../../redux/slices/questions';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

const SayTheLetters = () => {
	const dispatch = useDispatch();

	const current = useSelector(state => state.questions.current);
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);
	console.log(exercise);

	const [startTime, setStartTime] = useState(0);
	const [endTime, setEndTime] = useState(0);

	useEffect(() => {
		window.addEventListener('keydown', event => {
			console.log(event);
			if (event.key === 'ArrowRight') {
				setEndTime(performance.now());
				dispatch(setAnswer({ correct: true, time: startTime - endTime, answer: {} }));
			}
		});
	}, []);

	return (
		<div>
			<motion.div
				className='say-the-letters-container test-exercise-container'
				exit={{ transform: 'translateX(-100vw)' }}
				animate={{ transform: 'translateX(0vw)' }}
				initial={{ transform: 'translateX(100vw)' }}
				transition={{ easing: 'linear' }}
			>
				<p className='instruction'>{exercise.instructions[0]}</p>
				<div className='letters'>
					{exercise.exercise.letters.map(item => (
						<div className='letter'>{item}</div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default SayTheLetters;
