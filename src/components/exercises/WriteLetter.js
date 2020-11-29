import React, { useRef } from 'react';
import { motion } from 'framer-motion';

import sound from '../../assets/sound.svg';

const WriteLetter = props => {
	const { info, setCurrentAnswer } = props;
	const exercise = props.exercise.exercise;
	const audio = useRef();

	return (
		<motion.div
			className='write-letter-container test-exercise-container'
			exit={{ transform: 'translateX(-100vw)' }}
			animate={{ transform: 'translateX(0vw)' }}
			initial={{ transform: 'translateX(100vw)' }}
			transition={{ easing: 'linear' }}
		>
			<p className='instruction'>{info.instructions[0]}</p>
			<div className='icon' onClick={() => audio.current.play()}>
				<img src={sound} alt='Icono Sonido LectO Screening' />
			</div>
			<audio ref={audio} id='audio' src={exercise.audio}></audio>
			<p className='instruction'>{info.instructions[1]}</p>
			<div className='number'>
				<input
					autoComplete='off'
					type='text'
					name='post'
					id='post'
					maxLength='1'
					onChange={e => {
						setCurrentAnswer({
							ableToContinue: e.target.value !== '',
							answer: e.target.value,
							correct: e.target.value.toLowerCase() === exercise.letter.toLowerCase(),
						});
					}}
				/>
			</div>
		</motion.div>
	);
};

export default WriteLetter;
