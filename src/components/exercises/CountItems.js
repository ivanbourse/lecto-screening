import React, { useState, useEffect } from 'react';
import { setAnswer } from '../../redux/slices/questions';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import ExerciseContainer from '../ExerciseContainer';

const CountItems = () => {
	const dispatch = useDispatch();

	const current = useSelector(state => state.questions.current);
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	const [startTime, setStartTime] = useState(0);
	const [selected, setSelected] = useState(null);

	const keydownEvent = (event) => {
		console.log(startTime);
		if (event.key === 'ArrowRight') {
			dispatch(setAnswer({ correct: true, time: Date.now() - startTime, answer: {} }));
		} else if (event.key === 'ArrowLeft') {
			dispatch(setAnswer({ correct: false, time: Date.now() - startTime, answer: {} }));
		}
	}

	useEffect(() => setStartTime(Date.now()), [current])

	useEffect(() => {
		setStartTime(Date.now())
		window.addEventListener('keydown', keydownEvent);
		return (() => {
			window.removeEventListener('keydown', keydownEvent);
		})
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
