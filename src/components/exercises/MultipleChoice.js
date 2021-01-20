import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MultipleChoice = props => {
	const [selected, setSelected] = useState(null);
	const { info, setCurrentAnswer } = props;

	const selectOption = i => {
		setSelected(i);
		setCurrentAnswer({ ableToContinue: true, answer: i });
	};

	return (
		<div>
			<motion.div
				className='multiple-choice-container test-exercise-container'
				exit={{ transform: 'translateX(-100vw)' }}
				animate={{ transform: 'translateX(0vw)' }}
				initial={{ transform: 'translateX(100vw)' }}
				transition={{ easing: 'linear' }}
			>
				<p className='instruction'>Seleccioná la opción correcta</p>
				<div className='options'>
					{Array(4)
						.fill(0)
						.map((item, i) => (
							<div className={`option ${selected === i ? 'selected' : ''}`} onClick={() => selectOption(i)}>
								<p>Opción {i + 1}</p>
							</div>
						))}
				</div>
			</motion.div>
		</div>
	);
};

export default MultipleChoice;
