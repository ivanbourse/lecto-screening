import React from 'react';
import { motion } from 'framer-motion';

const JoinWithArrows = props => {
	const { info, setCurrentAnswer } = props;
	const exercise = props.exercise.exercise;

	return (
		<motion.div
			className='join-with-arrows-container test-exercise-container'
			exit={{ transform: 'translateX(-100vw)' }}
			animate={{ transform: 'translateX(0vw)' }}
			initial={{ transform: 'translateX(100vw)' }}
			transition={{ easing: 'linear' }}
		>
			<p className='instruction'>{info.instructions[0]}</p>
			<div className='images'>
				{exercise.pair.map(item =>
					item.map(item => (
						<img
							src={item.url}
							alt='Ilustración LectO Screening'
							className='image'
							onClick={() => setCurrentAnswer({ ableToContinue: true, answer: [true, true], correct: true })}
						/>
					))
				)}
			</div>
		</motion.div>
	);
};

export default JoinWithArrows;
