import React from 'react';
import { useSelector } from 'react-redux';
import useSetAnswer from '../../functions/setAnswer';
import ExerciseContainer from '../ExerciseContainer';
import NextButton from '../NextButton';

const SayTheLetters = () => {
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);
	const [, setAnswer, setUserAnswer] = useSetAnswer();

	const arrayToShow = exercise.exercise.letters || [exercise.exercise.number];

	return (
		<ExerciseContainer classes='say-the-letters-container'>
			<div className='letters'>
				{arrayToShow.map(item => (
					<div className='letter' onClick={() => setAnswer(item)} key={item}>
						{item}
					</div>
				))}
			</div>

			<NextButton setUserAnswer={setUserAnswer} answered={true} />
		</ExerciseContainer>
	);
};

export default SayTheLetters;
