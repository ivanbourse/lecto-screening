import React from 'react';
import { motion } from 'framer-motion';

const GapQuestion = () => {
	return (
		<div>
			<motion.div
				className='say-the-letters-container test-exercise-container'
				exit={{ transform: 'translateX(-100vw)' }}
				animate={{ transform: 'translateX(0vw)' }}
				initial={{ transform: 'translateX(100vw)' }}
				transition={{ easing: 'linear' }}
			>
				<p className='instruction'>Contá desde el 1 hasta el número que vos sepas en voz alta</p>
			</motion.div>
		</div>
	);
};

export default GapQuestion;
