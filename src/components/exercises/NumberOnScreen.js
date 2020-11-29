import React from 'react';
import { motion } from 'framer-motion';

import microphone from '../../assets/microphone.svg';

const NumberOnScreen = props => {
	const { info, setCurrentAnswer } = props;
	const exercise = props.exercise.exercise;

	return (
		<motion.div
			className='number-on-screen-container test-exercise-container'
			exit={{ transform: 'translateX(-100vw)' }}
			animate={{ transform: 'translateX(0vw)' }}
			initial={{ transform: 'translateX(100vw)' }}
			transition={{ easing: 'linear' }}
		>
			<div className='number'>{exercise.randomNumber}</div>
			<p className='instruction'>{info.instructions[0]}</p>
			<div className='icon' onClick={() => setCurrentAnswer({ ableToContinue: true, answer: 1, correct: true })}>
				<img src={microphone} alt='Icono LectO Screening' />
			</div>
		</motion.div>
	);
};

export default NumberOnScreen;
