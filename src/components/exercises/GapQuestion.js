import React from 'react';
import useSetAnswer from '../../functions/setAnswer';
import ExerciseContainer from '../ExerciseContainer';

const GapQuestion = () => {
	const [answer, setAnswer] = useSetAnswer();

	return (
		<ExerciseContainer classes='gap-question-container'>
			<p className='instruction'>Contá desde el 1 hasta el número que vos sepas en voz alta</p>
		</ExerciseContainer>
	);
};

export default GapQuestion;
