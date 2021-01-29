import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { afterAnimation } from '../redux/slices/questions';

const ExerciseContainer = props => {
	const animate = useSelector(state => state.questions.animate);
	const status = useSelector(state => state.questions.status);

	const dispatch = useDispatch();
	const controls = useAnimation();

	const isLoading = status === 'loading';

	useEffect(() => {
		const animation = async () => {
			await controls.start({ clipPath: 'circle(100%)' }, { ease: 'easeInOut', duration: 0.4 });
			animate === true && dispatch(afterAnimation());
			return await controls.start({ clipPath: 'circle(0%)' }, { ease: 'easeInOut', duration: 0.4 });
		};

		if (status === 'succeeded') {
			animation();
		}
	}, [animate, status]);

	return (
		<>
			<motion.div className='motion-animation' initial={{ clipPath: 'circle(100%)' }} animate={controls}>
				{isLoading && (
					<div className='loading-container'>
						<h1>¡Estamos preparando el examen!</h1>
						<motion.div
							className='loader'
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, easings: 'easeInOut' }}
						></motion.div>
					</div>
				)}
			</motion.div>
		</>
	);
};

export default ExerciseContainer;
