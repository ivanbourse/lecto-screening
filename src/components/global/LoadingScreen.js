import { AnimatePresence, motion } from 'framer-motion';

const LoadingScreen = ({ loading }) => {
	return (
		<AnimatePresence>
			{loading && (
				<motion.div className='motion-animation' initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
					<div className='loading-container'>
						<motion.div
							className='loader'
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, easings: 'easeInOut' }}
							exit={{ transition: 0 }}
						></motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default LoadingScreen;
