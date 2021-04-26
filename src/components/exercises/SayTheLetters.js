import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSetAnswer from '../../functions/setAnswer';
import ExerciseContainer from '../ExerciseContainer';
import NextButton from '../NextButton';

const SayTheLetters = () => {
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);
	const [currAnswer, setAnswer, setUserAnswer] = useSetAnswer(false);

	const arrayToShow = exercise.exercise.letters || [exercise.exercise.number];
	const [answers, setAnswers] = useState([]);
	const currentItem = answers.length;

	const addAnswer = answer => {
		if (arrayToShow.length > answers.length) {
			setAnswers(prev => {
				setAnswer([...prev, answer]);
				return [...prev, answer];
			});
		}
	};

	const keydownEvent = event => {
		if (event.key === 'ArrowRight') {
			addAnswer({ correct: true });
		} else if (event.key === 'ArrowLeft') {
			addAnswer({ correct: false });
		}
	};

	const nextExercise = () => {
		setUserAnswer(answers);
		setAnswers([]);
	};

	useEffect(() => {
		if (currentItem <= arrayToShow.length) {
			window.removeEventListener('keydown', keydownEvent);
			window.addEventListener('keydown', keydownEvent);
		}
		return () => {
			window.removeEventListener('keydown', keydownEvent);
		};
	}, [answers]);

	return (
		<ExerciseContainer classes='say-the-letters-container'>
			<div className='letters'>
				{arrayToShow.map((item, index) => (
					<div className={`letter ${index < currentItem ? 'answered' : ''}`} key={item}>
						{item}
					</div>
				))}
			</div>

			<NextButton setUserAnswer={nextExercise} answered={true} />
		</ExerciseContainer>
	);
};

export default SayTheLetters;
