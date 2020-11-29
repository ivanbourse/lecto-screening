import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PrevPostNumber = props => {
	const { info, setCurrentAnswer } = props;
	const exercise = props.exercise.exercise;
	console.log(exercise);

	const [numbers, setNumbers] = useState({ before: null, after: null });

	useEffect(() => {
		if (numbers.before && numbers.after) {
			const correctPrevAndPost = { ...exercise };
			delete correctPrevAndPost.number;
			const correct = Object.entries(exercise).every(([key, value]) => numbers[key] === value);
			console.log({ correct, exercise, numbers });
			setCurrentAnswer({ ableToContinue: true, answer: numbers, correct });
		} else {
			console.log('nosepuede');
			setCurrentAnswer({ ableToContinue: false });
		}
	}, [numbers]);

	return (
		<motion.div
			className='prev-post-container test-exercise-container'
			exit={{ transform: 'translateX(-100vw)' }}
			animate={{ transform: 'translateX(0vw)' }}
			initial={{ transform: 'translateX(100vw)' }}
			transition={{ easing: 'linear' }}
		>
			<p className='instruction'>{info.instructions[0]}</p>
			<div className='numbers'>
				<div className='number-input'>
					<div className='number'>
						<input
							autoComplete='off'
							type='number'
							name='prev'
							id='prev'
							onChange={e => setNumbers(value => ({ ...value, before: +e.target.value }))}
						/>
					</div>
					<label htmlFor='prev' className='label'>
						Anterior
					</label>
				</div>
				<div className='number'>{exercise.number}</div>
				<div className='number-input'>
					<div className='number'>
						<input
							autoComplete='off'
							type='number'
							name='post'
							id='post'
							onChange={e => setNumbers(value => ({ ...value, after: +e.target.value }))}
						/>
					</div>
					<label htmlFor='post' className='label'>
						Posterior
					</label>
				</div>
			</div>
		</motion.div>
	);
};

export default PrevPostNumber;
