import React, { useState, useEffect } from 'react';
import ExerciseContainer from '../ExerciseContainer';
import { useSelector } from 'react-redux';

const SplitSyllables = props => {
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	const [modifiedWord, setModifiedWord] = useState(exercise.exercise.word);

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
		const wordWasModified = modifiedWord.toLowerCase() !== exercise.exercise.word.toLowerCase();
		/* setCurrentAnswer({
			ableToContinue: wordWasModified,
			correct: isCorrect(),
			answer: modifiedWord.toLowerCase().split('-'),
		}); */
	}, [modifiedWord]);

	return (
		<ExerciseContainer classes='split-syllables-container'>
			<p className='instruction'>{exercise.instructions[0]}</p>
			<img src={exercise.image} className='image' alt='Imagen' />
			<input
				autoComplete='off'
				className='word-to-split'
				value={exercise.exercise.word.toUpperCase()}
				onChange={e => setModifiedWord(e.target.value)}
			/>
		</ExerciseContainer>
	);
};

export default SplitSyllables;
