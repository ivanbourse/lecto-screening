import React from 'react';
import { useSelector } from 'react-redux';
import useSetAnswer from '../../functions/setAnswer';
import ExerciseContainer from '../ExerciseContainer';

const SayTheLetters = () => {
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);
	const [, setAnswer] = useSetAnswer();

	const arrayToShow = exercise.exercise.letters || [exercise.exercise.number];

	return (
		<ExerciseContainer classes='say-the-letters-container'>
			<p className='instruction'>{exercise.instructions[0]}</p>
			<div className='letters'>
				{arrayToShow.map(item => (
					<div className='letter' onClick={() => setAnswer(item)} key={item}>
						{item}
					</div>
				))}
			</div>
		</ExerciseContainer>
	);
};

export default SayTheLetters;
