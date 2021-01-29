import React from 'react';
import ExerciseContainer from '../ExerciseContainer';
import { useSelector } from 'react-redux';
import useSetAnswer from '../../functions/setAnswer';
import NextButton from '../NextButton';

const SplitSyllables = props => {
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	const [answer, setAnswer, setUserAnswer] = useSetAnswer();

	return (
		<ExerciseContainer classes='split-syllables-container'>
			<img src={exercise.image} className='image' alt='Imagen' />

			<div className='circles'>
				{Array(6)
					.fill(0)
					.map((item, i) => (
						<div className={`circle ${answer > i ? 'selected' : ''}`} onClick={() => setAnswer(i + 1)}></div>
					))}
			</div>

			<NextButton setUserAnswer={setUserAnswer} answered={answer > 0} />
		</ExerciseContainer>
	);
};

export default SplitSyllables;
