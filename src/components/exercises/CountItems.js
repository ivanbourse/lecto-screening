import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const CountItems = () => {
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	console.log(exercise);

	const [selected, setSelected] = useState(null);

	return (
		<motion.div
			className='count-items-container test-exercise-container'
			exit={{ transform: 'translateX(-100vw)' }}
			animate={{ transform: 'translateX(0vw)' }}
			initial={{ transform: 'translateX(100vw)' }}
			transition={{ easing: 'linear' }}
		>
			<div className='images'>
				{Array(exercise.randomNumber)
					.fill(0)
					.map((item, i) => (
						<img className='count-image' src={exercise.image} alt='' />
					))}
			</div>
			<p className='instruction'>{exercise}</p>
			<div className='numbers'>
				{Array(9)
					.fill(0)
					.map((item, i) => (
						<div
							key={i}
							className={`number ${selected === i ? 'selected' : ''}`}
							onClick={() => {
								setSelected(i);
							}}
						>
							{i + 1}
						</div>
					))}
			</div>
		</motion.div>
	);
};

export default CountItems;
