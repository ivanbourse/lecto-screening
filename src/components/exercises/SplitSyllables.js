import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SplitSyllables = props => {
	const { info, setCurrentAnswer } = props;
	const exercise = props.exercise.exercise;

	const [modifiedWord, setModifiedWord] = useState(exercise.word);

	const isCorrect = () => {
		const userSplitted = modifiedWord.toLowerCase().split('-');

		const checkArrayEquality = (arr1, arr2) =>
			arr1.length === arr2.length &&
			arr1.every(function (this_i, i) {
				return this_i === arr2[i];
			});

		return checkArrayEquality(userSplitted, exercise.splitted);
	};

	useEffect(() => {
		const wordWasModified = modifiedWord.toLowerCase() !== exercise.word.toLowerCase();
		setCurrentAnswer({
			ableToContinue: wordWasModified,
			correct: isCorrect(),
			answer: modifiedWord.toLowerCase().split('-'),
		});
	}, [modifiedWord]);

	return (
		<motion.div
			className='split-syllables-container test-exercise-container'
			exit={{ transform: 'translateX(-100vw)' }}
			animate={{ transform: 'translateX(0vw)' }}
			initial={{ transform: 'translateX(100vw)' }}
			transition={{ easing: 'linear' }}
		>
			<p className='instruction'>{info.instructions[0]}</p>
			<img src={exercise.image} className='image' alt='Imagen' />
			<input
				autoComplete='off'
				className='word-to-split'
				defaultValue={exercise.word.toUpperCase()}
				onChange={e => setModifiedWord(e.target.value)}
			/>
		</motion.div>
	);
};

export default SplitSyllables;
