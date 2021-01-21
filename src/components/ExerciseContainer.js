import React from 'react';
import { motion } from 'framer-motion';

const ExerciseContainer = props => {
	return (
		<motion.div
			className={`test-exercise-container ${props.classes}`}
			exit={{ transform: 'translateX(-100vw)' }}
			animate={{ transform: 'translateX(0vw)' }}
			initial={{ transform: 'translateX(100vw)' }}
			transition={{ easing: 'linear' }}
		>
			{props.children}
		</motion.div>
	);
};

export default ExerciseContainer;
