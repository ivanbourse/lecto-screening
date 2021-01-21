import React, { useState, useEffect } from 'react';
import { setAnswer } from '../../redux/slices/questions';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import ExerciseContainer from '../ExerciseContainer';

const CountItems = () => {
	const dispatch = useDispatch();

	const current = useSelector(state => state.questions.current);
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);
	console.log(exercise);

	const [startTime, setStartTime] = useState(0);
	const [endTime, setEndTime] = useState(0);

	const [selected, setSelected] = useState(null);

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
		<ExerciseContainer classes='count-items-container '>
			{/* <div className='images'>
				{Array(exercise.randomNumber)
					.fill(0)
					.map((item, i) => (
						<img className='count-image' src={exercise.image} alt='' />
					))}
			</div> */}
			<p className='instruction'>{exercise.instructions[0]}</p>
			<div className='numbers'>
				{Array(9)
					.fill(0)
					.map((item, i) => (
						<div key={i} className={`number ${selected === i ? 'selected' : ''}`}>
							{i + 1}
						</div>
					))}
			</div>
		</ExerciseContainer>
	);
};

export default CountItems;
