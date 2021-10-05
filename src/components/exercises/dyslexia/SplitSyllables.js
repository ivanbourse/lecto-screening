import React from 'react';
import ExerciseContainer from 'components/ExerciseContainer';
import { useSelector } from 'react-redux';
import useSetAnswer from 'functions/setAnswer';
import NextButton from 'components/NextButton';
import { getImage } from 'functions/getImage';

const SplitSyllables = props => {
	const { exercise, userAnswer, setUserAnswer, submitAnswer } = useSetAnswer();

	return (
		<ExerciseContainer classes='split-syllables-container'>
			<img src={getImage(exercise.word)} className='image' alt={`Imagen de ${exercise.word}`} />

			<div className='circles'>
				{Array(6)
					.fill(0)
					.map((item, i) => (
						<div className={`circle ${userAnswer > i ? 'selected' : ''}`} onClick={() => setUserAnswer(i + 1)}></div>
					))}
			</div>

			<NextButton setUserAnswer={submitAnswer} answered={userAnswer > 0} />
		</ExerciseContainer>
	);
};

export default SplitSyllables;
