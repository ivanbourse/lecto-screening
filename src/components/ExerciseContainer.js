import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';

const ExerciseContainer = props => {
	const current = useSelector(state => state.questions.current);
	const exercises = useSelector(state => state.questions.questions);

	const controls = useAnimation();

	const [changed, setChanged] = useState(true);

	useEffect(() => {
		const animation = async () => {
			setChanged(false);
			await controls.start({ transform: 'translateX(-100vw)' }, { ease: 'linear' });
			await controls.start({ transform: 'translateX(100vw)' }, { ease: 'linear', duration: 0 });
			setChanged(true);
			return await controls.start({ transform: 'translateX(0vw)' }, { ease: 'linear' });
		};
		animation();
	}, [current]);

	return (
		<motion.div className={`test-exercise-container ${props.classes}`} animate={controls}>
			{props.children}
		</motion.div>
	);
};

export default ExerciseContainer;
